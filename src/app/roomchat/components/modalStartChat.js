import { apiPost } from "@/app/api/apiClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRoomList } from "@/app/context/RoomlistContext";
import { useDispatch } from 'react-redux';
import { setActiveRoomEmail, setActiveRoomId } from "@/app/store/roomSlice";

const ModalStartChat = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const { fetchRoomlist } = useRoomList();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [emailAlert, setEmailAlert] = useState("");

    const validateEmailFormat = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    useEffect(() => {
        if (email !== "") {
            if (validateEmailFormat(email)) {
                setEmailAlert("");
            } else {
                setEmailAlert("Email not in valid format");
            }
        }
    }, [email]);

    const handleStartChat = async () => {
        if (!validateEmailFormat(email)) {
            // Do something here
            setEmailAlert("Email not in valid format");
            return;
        }
        // Do something here
        try {
            // Do something here
            const response = await apiPost("create-roomchat", {
                email: email
            });
            if (response) {
                const { statusCode, responseBody } = response;
                console.log("status code", statusCode);
                console.log("response body", responseBody);
                if (statusCode === 401) {
                    handleClose();
                    console.log("Unauthorized");
                    router.push("/");
                } else if (statusCode === 400 || statusCode === 422 || statusCode === 404) {
                    // Do something here
                    setEmailAlert(responseBody.message);
                    return
                } else {
                    const data = responseBody.data;
                    const { id, room_id, room_name } = data;
                    dispatch(setActiveRoomId(room_id));
                    dispatch(setActiveRoomEmail(email));
                    fetchRoomlist();
                    handleClose();
                }
            }
        }
        catch (err) {
            console.error("Post error:", err);
            alert("Internal Server Error");
        }
    };

    return (
        <>
            {show ? (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Start Chatting</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                                            Input your friend email
                                        </label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black" required />
                                        {emailAlert !== "" && <p className="text-red-500 text-xs">{emailAlert}</p>}
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleClose} className="mx-1 text-white bg-gray-200 hover:bg-gray-800 font-medium rounded-lg text-sm px-2 py-1">Cancel</button>
                                <button onClick={handleStartChat} className="mx-1 text-white bg-green-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-2 py-1">Start Chatting</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ModalStartChat;