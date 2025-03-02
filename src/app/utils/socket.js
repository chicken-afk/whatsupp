export const connectSocket = (roomId, loginToken) => {
    return new WebSocket(`ws://103.139.193.55:80/ws?roomId=${roomId}&authorization=${loginToken}`);
};
