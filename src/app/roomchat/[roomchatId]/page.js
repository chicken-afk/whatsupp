"use client";
import { useParams } from 'next/navigation';

const RoomDetail = () => {
    const { roomchatId } = useParams();
    console.log(roomchatId);

    return (
        <div className="flex text-right bg-gray-600 text-white p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Room Detail</h3>
        </div>
    );
};

export default RoomDetail;

