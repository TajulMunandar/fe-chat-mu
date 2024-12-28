// import React from 'react';
import SideLink from '../SideLink';

// const SideMenu = ({ user, closeSideMenu }) => (
const SideMenu = ({ user}) => (
  <div className="py-4 text-gray-200">
    <a className="ml-6 text-lg font-bold " href="#">
      AlMuslim
    </a>
    <ul className="mt-6">
      {user.role === 'admin' &&<SideLink Title="Dashboard" LinkTo="/dashboard" Icon="FaHome" />}
    </ul>
    <ul >
      {user.role === 'admin' && <SideLink Title="User" LinkTo="/dashboard/user" Icon="FaUserFriends" />}
      {user.role === 'admin' && <SideLink Title="Intents" LinkTo="/dashboard/Intent" Icon="SiMake" />}
      {user.role === 'admin' &&<SideLink Title="Chatbot" LinkTo="/dashboard/chatbot-info" Icon="FaRobot" />}
      {/* <SideLink Title="Intents" LinkTo="/dashboard/Intent" Icon="SiMake" /> */}
      <SideLink Title="ListChatApp" LinkTo="/dashboard/ListChatApp" Icon="IoIosSend" />
      {/* <SideLink Title="Product" LinkTo="/dashboard/products" Icon="FaProductHunt" /> */}
      <SideLink Title="Profile" LinkTo="/dashboard/account" Icon="FaCog" />
    </ul>
  </div>
);

export default SideMenu;