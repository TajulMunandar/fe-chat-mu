import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Tambahkan ini jika menggunakan React Router
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice"; // Path sesuai dengan slice Redux
const socket = io("http://localhost:5001"); // Sesuaikan ini dengan alamat backend

const Main = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate(); // Untuk navigasi setelah logout
  const dispatch = useDispatch();
  // Fungsi logout
  const logout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/"); // Jika berhasil, arahkan ke halaman login
      } else {
        console.error("Logout gagal:", resultAction.payload); // Tampilkan error jika ada
      }
    } catch (error) {
      console.error("Error during logout:", error); // Tangani error lainnya
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      const incomingMessage = { ...data, senderId: data.senderId || "admin" };
      setChatMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    // Pastikan untuk membersihkan event listener saat komponen di-unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Auto-scroll ketika pesan baru ditambahkan
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Ambil pesan dari server ketika komponen dimuat
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const response = await axios.get("http://localhost:5001/chat-rooms");
        const userChatRooms = response.data;
        console.log(userChatRooms);

        if (userChatRooms.length > 0) {
          const firstRoom = userChatRooms[0];
          setChatRoomId(firstRoom.id); // Set chat room aktif
          fetchMessages(firstRoom.uuid);
        }
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRoom();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fetchMessages = async (roomId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/chat-details/${roomId}`
      );
      console.log("Fetched chat messages:", response.data.chats); // Cek struktur response
      setChatMessages(response.data.chats || []); // Asumsikan chat ada dalam response.data.chats
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (chatRoomId) {
      console.log("Updated Chat Room ID:", chatRoomId);
    }
  }, [chatRoomId]);

  const createChatRoom = async () => {
    try {
      const roomResponse = await axios.post(
        "http://localhost:5001/chat-room", // Endpoint untuk membuat chat room
        { name: "Default Room", description: "Default description" }
      );
      console.log("Created new room with ID:", roomResponse.data.room.id);
      return roomResponse.data.room.id; // Return the new room ID
    } catch (error) {
      console.error("Error creating chat room:", error);
      throw error; // Throw error to be handled in sendMessage
    }
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const uuid = userData.uuid;
        console.log("User ID di middleware verifyUser:", uuid);
        console.log("Chatroom:", chatRoomId);

        let roomId = chatRoomId;

        // If chatRoomId is not set, create a new chat room
        if (!roomId) {
          roomId = await createChatRoom(); // Call the createChatRoom function
          setChatRoomId(roomId); // Set the roomId after it has been created
        }

        const newMessage = {
          chatRoomId: roomId, // Use the roomId (either from state or created)
          uuid,
          message,
        };

        // Emit the message to the server
        socket.emit("sendMessage", newMessage);

        // Send chat message details to the backend
        const response = await axios.post(
          "http://localhost:5001/chat-details",
          newMessage
        );

        // Add the message to the chatMessages state
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(""); // Clear the message input
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Fungsi untuk menangani enter press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <section className="min-h-screen w-full bg-gray-100 -mt-1 border px-5 font-[poppins]">
      <div className="fixed top-0 right-0 left-0 z-50 grid gap-6 md:grid-cols-6 grid-cols-1 border-b-2 py-5 px-10 bg-green-800">
        <div className="col-span-4">
          <div className="flex gap-5">
            <p className="font-semibold text-white">Universitas Almuslim</p>
          </div>
        </div>
        <div className="col-span-2 flex justify-end items-center">
          <button
            onClick={logout}
            className="text-white font-semibold hover:text-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-20 pb-16 text-sm">
        <div ref={chatContainerRef} className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {chatMessages.map((msg, index) =>
              msg.user && msg.user.role !== "user" ? (
                <div key={index} className="flex justify-start mb-5">
                  <p className="border shadow p-3 w-1/2 bg-white rounded-lg">
                    {msg.message}
                  </p>
                </div>
              ) : (
                <div key={index} className="flex justify-end mb-5">
                  <p className="border shadow p-3 w-1/2 bg-green-100 rounded-lg">
                    {msg.message}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center pb-5 px-5">
        <div className="w-full md:w-2/3">
          <div className="flex justify-center bg-green-50 text-slate-800 px-3 gap-1 items-center w-full shadow border rounded-lg focus-within:outline focus-within:outline-2 focus-within:outline-green-600">
            <input
              type="text"
              className="h-14 text-sm outline-none block w-full p-2.5 bg-transparent placeholder:text-slate-700"
              placeholder="Tanyakan Pertanyaan anda"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendIcon
              className={`text-green-800 cursor-pointer ${
                message.trim() ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={message.trim() ? sendMessage : null}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
