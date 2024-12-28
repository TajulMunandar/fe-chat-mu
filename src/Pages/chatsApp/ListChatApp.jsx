import { useState, useEffect } from "react";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsChatFill } from "react-icons/bs";
const ListChatApp = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  // Fetch chat data
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5001/chat-rooms"); // Pastikan endpoint API sesuai
        console.log("Data yang diterima:", response.data);
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    chats.forEach((chat) => {
      console.log("Chat details:", chat.chat_details.user); // Menampilkan chat_details dari setiap chat
    });
  }, [chats]);

  return (
    <div className="flex item-center gap-5 flex-row  flex-wrap">
      {chats.map((chatUser) => (
        <div
          key={chatUser.uuid}
          className="shadow-lg flex justify-start px-5 py-1 items-start text-[poppins] rounded-md gap-2 border md:w-fit w-full"
        >
          <span className="border p-2 rounded-full">
            <IoPerson className="text-4xl text-slate-800" />
          </span>
          <div>
            <p className="font-bold">{chatUser.userName || "Unknown User"}</p>
            <span
              className="text-sm text-white rounded-md mt-1 hover:bg-green-600 transition cursor-pointer flex items-center gap-2 bg-green-800 p-1 px-2"
              onClick={() => navigate(`/dashboard/chat/${chatUser.uuid}`)} // Navigasi ke halaman chat
            >
              Chat
              <BsChatFill />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListChatApp;
