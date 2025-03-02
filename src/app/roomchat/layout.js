import { RoomListProvider } from "../context/RoomlistContext";

export default function RootLayout({
    children,
}) {
    return (
        <RoomListProvider>
            <div className="mx-auto rounded-lg">
                {children}
            </div>
        </RoomListProvider>
    )
}

