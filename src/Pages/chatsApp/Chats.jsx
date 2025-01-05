import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const Chats = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const userId = userData.uuid;
  const { chatRoomId } = useParams();
  const [roomId, setChatRoomId2] = useState("");
  const [username, setUsername] = useState("");
  const chatEndRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  // Scroll ke bagian bawah chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Ambil pesan chat untuk pengguna tertentu
  const fetchChats = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/chat-details/${chatRoomId}`
      );
      const { name, chats } = response.data;
      setChatRoomId2(response.data.chats[0].chatRoom_id);
      setChats(chats || []); // Pastikan chats adalah array

      setUsername(name);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [chatRoomId]);

  useEffect(() => {
    socket.emit("join", userId);

    fetchChats();

    socket.on("newMessage", (message) => {
      console.log("Pesan baru diterima dari server:", message);
      setChats((prevChats) => [...prevChats, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("newMessage");
      socket.emit("leaveRoom", userId);
    };
  }, [fetchChats, userId]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Tangani perubahan input pesan
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const uuid = userData.uuid; // Ambil UUID dari session
        console.log("User ID di middleware verifyUser:", uuid);
        console.log("Room:", chatRoomId);

        if (!chatRoomId) {
          const roomResponse = await axios.post(
            "http://localhost:5001/chat-room", // Endpoint untuk membuat chat room
            { name: "Default Room", description: "Default description" }
          );
          const newRoom = roomResponse.data;
          setChatRoomId(newRoom.id); // Set chatRoomId setelah room baru dibuat
        }

        const newMessage = {
          chatRoomId,
          uuid,
          message,
          role: "admin", // Menambahkan peran admin di sini
        };

        // Emit pesan ke server
        socket.emit("sendMessage", newMessage);

        // Kirim pesan ke server untuk disimpan
        const response = await axios.post(
          "http://localhost:5001/chat-details",
          newMessage
        );
        
        fetchChats();

        // Tambahkan pesan ke daftar pesan yang ada
        setChats((prevChats) => [...prevChats, newMessage]);
        setMessage(""); // Clear input message
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="shadow-lg flex px-3 py-2 items-center text-[poppins] bg-green-800 text-white rounded-sm gap-2 border w-fit">
        <IoPerson className="text-4xl" />
        <div>
          <p className="font-bold"> {username || "Loading..."}</p>
        </div>
      </div>

      <div className="flex-grow mt-5 space-y-4 overflow-y-auto px-4 pb-20">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.user && chat.user.role === "admin"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <p
                className={`border shadow p-3 w-1/2 ${
                  chat.user && chat.user.role === "admin"
                    ? "bg-green-100"
                    : "bg-blue-100"
                } rounded-lg`}
              >
                <span className="text-sm text-slate-600 block">
                  {chat.user?.name
                    ? `${chat.user && chat.user.name} (${
                        chat.role || "Role tidak tersedia"
                      })`
                    : "Nama tidak tersedia"}
                </span>
                {chat.message || "Pesan kosong"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center">No chats available</p>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 md:left-[calc(16rem+1rem)] px-4 py-2 bg-white shadow flex gap-1 items-center border rounded focus-within:ring-2 focus-within:ring-green-500">
        <input
          className="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none h-11"
          type="text"
          value={message} // gunakan message untuk input
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            userData.role === "admin"
              ? "Ketik pesan untuk pengguna..."
              : "Ketik pesan..."
          }
        />
        <SendIcon
          className={`text-green-800 cursor-pointer ${
            message.trim() ? "" : "opacity-50 cursor-not-allowed"
          }`}
          onClick={message.trim() ? sendMessage : null}
        />
      </div>
    </div>
  );
};

export default Chats;
