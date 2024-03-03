import { io } from 'socket.io-client';
// use for connection of backend with frontend 
const server = io("http://localhost:4000");


export default server;