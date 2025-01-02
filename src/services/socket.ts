import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Replace <SERVER_IP> with the backend IP or localhost
let socket: Socket;

export const initSocket = () => {
    socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
        console.log('WebSocket connected with ID:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });

    return socket;
};

export const getSocket = () => socket;
