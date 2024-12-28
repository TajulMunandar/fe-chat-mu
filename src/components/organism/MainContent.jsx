// import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
// import DashboardHome from '../components/DashboardHome';
import DashboardHome from "../DashboardHome";
import Usersk from "../../Pages/users/Usersk";
import InputUsers from "../../Pages/users/InputUsers";
import EditUsers from "../../Pages/users/EditUsers";
import History from "../History";
import Products from "../../Pages/products/Products";
import InputProduct from "../../Pages/products/InputProduct";
import EditProduct from "../../Pages/products/EditProduct";
import Setting from "../Setting";
import Chats from "../../Pages/chatsApp/Chats";
import ProtectedRoute from "../../Pages/ProtectedRoute";
import ChatBotInfo from "../../Pages/chatbotInfo/ChatBotInfo";
import EditChatbotInfo from "../../Pages/chatbotInfo/EditChatbotInfo";
import InputChatbotInfo from "../../Pages/chatbotInfo/InputChatbotInfo";
import ListChatApp from "../../Pages/chatsApp/ListChatApp";
import Intent from "../../Pages/intents/Intent";
import EditIntent from "../../Pages/intents/EditIntent";
import InputIntent from "../../Pages/intents/InputIntent";

// const MainContent = ({ user }) => (
const MainContent = () => (
  <main className="h-full overflow-y-auto bg-white">
    <div className="container px-6 mt-5 mx-auto grid">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route
          path="user"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Usersk />
            </ProtectedRoute>
          }
        />
        <Route
          path="InputUsers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InputUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="EditUsers/:userId"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="chatbot-info"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ChatBotInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="input-chatbot-info"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InputChatbotInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-chatbot-info/:chatbotId"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditChatbotInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="chat/:chatRoomId"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route
          path="ListChatApp"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ListChatApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="Intent"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Intent />
            </ProtectedRoute>
          }
        />
        <Route
          path="InputIntent"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InputIntent />
            </ProtectedRoute>
          }
        />
        <Route
          path="EditIntent"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditIntent />
            </ProtectedRoute>
          }
        />
        <Route path="User" element={<Usersk />} />
        <Route path="products" element={<Products />} />
        <Route path="InputProduct" element={<InputProduct />} />
        <Route path="EditProduct/:id" element={<EditProduct />} />
        <Route path="account" element={<Setting />} />
      </Routes>
      <Outlet />
    </div>
  </main>
);

export default MainContent;
