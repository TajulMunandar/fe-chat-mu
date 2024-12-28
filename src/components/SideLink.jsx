// import React from 'react';
import { FaUserFriends, FaHome, FaProductHunt, FaCog, FaHistory,FaRobot } from 'react-icons/fa';
import { SiMake } from "react-icons/si";
import { Link } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";
// Peta ikon
const iconMap = {
    FaUserFriends, FaHome, FaProductHunt, FaCog, FaHistory, IoIosSend, FaRobot, SiMake
};

const SideLink = ({ Title, Icon, LinkTo }) => {
    const SelectedIcon = iconMap[Icon]; // Pilih ikon dari peta

    return (
        <li className="relative ps-5 py-3 font-[poppins]" >
            <Link to={LinkTo} className="focus:bg-white active:bg-white focus:text-green-600 p-2 rounded-ss-lg inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-slate-300 ">
                {SelectedIcon && <SelectedIcon className='text-xl' />}
                <span className="ml-4">{Title}</span>
            </Link>
        </li>
    );
};

export default SideLink;
