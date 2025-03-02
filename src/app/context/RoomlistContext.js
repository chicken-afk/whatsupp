"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { apiGet } from "@/app/api/apiClient"; // Sesuaikan dengan path utils API
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setActiveRoomId, setActiveRoomEmail } from "../store/roomSlice";
import Cookies from "js-cookie";

const RoomListContext = createContext();

export const RoomListProvider = ({ children }) => {
    const [roomList, setRoomList] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const emailLogin = Cookies.get("email");

    // Check if emailLogin exists
    if (!emailLogin) {
        router.push("/");
        return null;
    }

    // Fungsi untuk mapping data dari API, kecuali emailLogin
    const mapRoomlist = (data) => {
        return data.map((room) => ({
            id: room.room_id,
            name: room.users
                .filter(user => user.email !== emailLogin)
                .map(user => user.email)
                .join(", "),
        }));
    };

    // Fetch data dari API lalu map dengan mapRoomlist
    const fetchRoomlist = async () => {
        const response = await apiGet("roomchats", {});
        if (response) {
            const { statusCode, responseBody } = response;
            console.log("fetch roomlist", statusCode, responseBody);
            if (statusCode === 200) {
                const rooms = mapRoomlist(responseBody.data); // Mapping data sebelum disimpan
                if (rooms.length > 0) {
                    dispatch(setActiveRoomId(rooms[0].id));
                    dispatch(setActiveRoomEmail(rooms[0].name));
                }
                setRoomList(rooms);
            } else if (statusCode == 401) {
                Cookies.remove("token");
                router.push("/");
            }
            else {
                setRoomList([]);
            }
        }
    };

    useEffect(() => {
        fetchRoomlist();
    }, []);

    return (
        <RoomListContext.Provider value={{ roomList, fetchRoomlist }}>
            {children}
        </RoomListContext.Provider>
    );
};

export const useRoomList = () => useContext(RoomListContext);
