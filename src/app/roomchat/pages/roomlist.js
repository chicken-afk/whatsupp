"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveRoomEmail, setActiveRoomId, resetState } from "@/app/store/roomSlice";
import { useRoomList } from "@/app/context/RoomlistContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingButton from "@/app/components/loadingButton";

const Roomlist = () => {
    const { roomList } = useRoomList();
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const activeRoomId = useSelector((state) => state.room.ActiveRoomId);
    useEffect(() => {
    }, []);

    const handleOnClickRoom = (id) => {
        dispatch(setActiveRoomId(id));
        dispatch(setActiveRoomEmail(roomList.find((room) => room.id === id).name));
    };

    const handleLogout = () => {
        Cookies.remove("email");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        dispatch(resetState());
        router.push("/");
    }

    return (
        <div className="bg-white p-4 text-gray-900 dark:bg-gray-800 dark:text-white divide-y divide-light-blue-400">
            <ul className="my-2 divide-y divide-light-blue-400">
                {roomList.map((room) => (
                    <li
                        key={room.id}
                        onClick={() => handleOnClickRoom(room.id)}
                        className={`flex items-center justify-between p-1 rounded hover:bg-green-500 cursor-pointer ${activeRoomId === room.id ? "bg-green-500 text-white" : ""
                            }`}
                    >
                        <span className="text-base">{room.name}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center w-full">
                {isLoading ? (
                    <LoadingButton className="text-white" />
                ) : (
                    <button onClick={handleLogout} className="text-pink-600 underline px-4 py-1 rounded-lg">
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Roomlist;
