
"use client";

import Chat from './pages/chat';
import Roomlist from './pages/roomlist';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import ModalStartChat from './components/modalStartChat';
import Cookies from 'js-cookie';


const Room = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentEmailLogin = Cookies.get("email");

    const [showModalStartChat, setShowModalStartChat] = useState(false);

    const handleOpenModalStartChat = () => {
        setShowModalStartChat(true);
    }

    return (
        <div className="flex h-screen bg-white text-gray-800">
            <div className="w-1/4 shadow-lg">
                <div className="flex justify-between items-center p-4 border-b border-blue-200">
                    <div>
                        <h1 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-400 font-extrabold">Whatsupp</h1>
                        <p className="text-xs text-muted">{currentEmailLogin}</p>
                    </div>
                    <button onClick={handleOpenModalStartChat} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">+</button>
                </div>
                <Roomlist />
            </div>
            <div className="w-3/4">
                <Chat />
            </div>
            <ModalStartChat show={showModalStartChat} handleClose={() => setShowModalStartChat(false)} />
        </div>
    );
};

export default Room;