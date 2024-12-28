// import React from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';

const ButtonLogout = ({ onLogout }) => (
  <button onClick={onLogout} className="flex text-white rounded-md font-semibold px-3 py-1 gap-3 items-center bg-green-700">
    <h4>Logout</h4>
    <FaArrowRightFromBracket />
  </button>
);

export default ButtonLogout;
