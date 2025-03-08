import { RoomListProvider } from "../context/RoomlistContext";

export default function RootLayout({
    children,
}) {
    return (
        <RoomListProvider>
            <div className="mx-auto rounded-lg h-[100dvh]">
                {children}
            </div>
        </RoomListProvider>
    )
}

