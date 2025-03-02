"use client";

import { apiGet } from '@/app/api/apiClient';
import Cookies from 'js-cookie';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import LoadingButton from '@/app/components/loadingButton';
import { connectSocket } from "@/app/utils/socket";
import { useRouter } from 'next/navigation';

const Chat = ({ }) => {
    const roomState = useSelector((state) => state.room);
    const ActiveRoomEmail = roomState.ActiveRoomEmail
    const ActiveRoomId = roomState.ActiveRoomId
    const [isLoading, setIsLoading] = useState(false);
    const [socket, setSocket] = useState(null);
    const [sendMessageData, setSendMessageData] = useState("");
    const [joined, setJoined] = useState(false);
    const [messageData, setMessageData] = useState([]);
    const router = useRouter();

    const currentEmailLogin = Cookies.get("email");

    const fetchChatHistory = async () => {
        setIsLoading(true);
        // Do something here
        console.log("fetching chat history");
        const response = await apiGet(`/chat-histories/${ActiveRoomId}`);
        if (response) {
            const { statusCode, responseBody } = response;
            console.log("status code", statusCode);
            console.log("response body", responseBody);
            if (statusCode === 401) {
                console.log("Unauthorized");
                Cookies.remove("token");
            } else if (statusCode === 400 || statusCode === 422 || statusCode === 404) {
                // Do something here
            } else {
                const data = responseBody.data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                setMessageData(data);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (ActiveRoomId !== null) {
            console.log("use state triggered : ", ActiveRoomId);
            if (socket) socket.close();
            const token = Cookies.get("token");
            if (token === undefined) {
                alert("Your session has expired, please login again");
                router.push("/");
            }
            joinRoom(ActiveRoomId, Cookies.get("token"));
            fetchChatHistory();
        }
    }, [ActiveRoomId]);

    useEffect(() => {
        return () => {
            if (socket) socket.close();
        };
    }, [socket]);

    useEffect(() => {
        console.log("messageData changed", messageData);
    }, [messageData]);

    const joinRoom = (roomId, loginToken) => {
        const newSocket = connectSocket(roomId, loginToken);

        newSocket.onopen = () => {
            console.log("Connected to WebSocket");
        };

        newSocket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);
                console.log("Message received:", msg);
                const newMessage = {
                    email: msg.email,
                    message: msg.message,
                    created_at: new Date().toISOString()
                };
                setMessageData((prevMessages) => [...prevMessages, newMessage]);
            } catch (error) {
                console.error("Invalid JSON received:", event.data);
            }
        };

        newSocket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };

        newSocket.onclose = () => {
            console.log("Disconnected from WebSocket");
        };

        setSocket(newSocket);
        setJoined(true);
    };

    const handleSendMessage = () => {
        const payloadMessage = {
            "authorization": Cookies.get("token"),
            "message": sendMessageData
        };

        const stringMessage = JSON.stringify(payloadMessage);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(stringMessage);
            setSendMessageData("");
        } else {
            alert("You are not connected to any room!");
        }
    };

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageData]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className='flex flex-col h-full'>
            {isLoading ? (
                <>
                    <div className="text-right bg-green-400 text-white p-4">
                        <h3 className="font-semibold text-white dark:text-white text-sm">{ActiveRoomEmail}</h3>
                    </div>
                    <div className='flex-grow flex items-center justify-center bg-gray-200'>
                        <LoadingButton className='text-black' />
                    </div>
                </>
            ) : (
                <>
                    <div className="text-right bg-green-400 text-white p-4">
                        <h3 className="font-semibold text-white dark:text-white text-sm">{ActiveRoomEmail}</h3>
                    </div>
                    <div className='bg-indigo-100 flex-grow px-20 py-10 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-200'>
                        {messageData.map((message) => (
                            <div className={`flex items-start mb-4 gap-2.5 ${message.email === currentEmailLogin ? 'justify-end' : ''}`} key={message.created_at}>
                                <div className="flex flex-col gap-1 w-full max-w-[420px]">
                                    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${message.email === currentEmailLogin ? 'justify-end' : ''}`}>
                                        {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.email} </span> */}
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{new Date(message.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: false })} {new Date(message.created_at).toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
                                    </div>
                                    <div className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-200 ${message.email === currentEmailLogin ? 'bg-green-200 text-black rounded-l-lg rounded-br-lg' : 'rounded-r-lg rounded-bl-lg bg-white text-black'}`}>
                                        <p className="text-sm font-normal"> {message.message}</p>
                                    </div>
                                    <div className={`flex items-center space-x-2 rtl:space-x-reverse ${message.email === currentEmailLogin ? 'justify-end' : ''}`}>
                                        {/* <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.email} </span> */}
                                        <span className={`text-xs font-normal text-gray-500 dark:text-gray-400`}>Delivered</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='flex items-center p-2 shadow-lg'>
                        <input value={sendMessageData} onChange={(e) => setSendMessageData(e.target.value)} onKeyPress={handleKeyPress} type="text" className='flex-grow p-2 border-indigo-400 rounded bg-gray-100 text-black' placeholder='Type your message...' />
                        <button onClick={handleSendMessage} className='ml-2 p-2 bg-green-500 shadow-lg text-white rounded'>Send</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Chat;