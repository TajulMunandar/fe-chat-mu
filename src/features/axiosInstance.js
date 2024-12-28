import axios from "axios";
import { io } from 'socket.io-client'; // Ubah ini

// Konfigurasi Axios Instance
 const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/",
  withCredentials: true,
});


export default axiosInstance

// Inisialisasi Socket.IO di frontend
export const socket = io("http://localhost:5001", {
  withCredentials: true,
  transports: ['websocket'],  // Menggunakan WebSocket
});

// Kirim pesan ke backend
socket.emit('sendMessage', { message: 'Hello, World!', userId: 1 });

// Menerima pesan dari backend
socket.on('message', (data) => {
  console.log('Received message:', data);
});
