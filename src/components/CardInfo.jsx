// import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectUser } from '../features/authSlice';
import axiosInstance from '../features/axiosInstance';
import { FaRobot } from "react-icons/fa6";
const CardInfo = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
      const fetchTotalUsers = async () => {
          try {
              const response = await axiosInstance.get('/users/total');
              console.log("Respons dari server:", response.data);
  
              // Tangani jika respons adalah null
              if (!response.data || response.data.total === undefined) {
                  console.warn("Respons server null atau total tidak ada. Menggunakan fallback nilai.");
                  setTotalUsers(0); // Nilai fallback
                  return;
              }
  
              // Jika respons valid, tetapkan total pengguna
              setTotalUsers(response.data.total);
          } catch (error) {
              console.error("Gagal mengambil total pengguna:", error.message);
              setTotalUsers(0); // Nilai fallback
          }
      };
  
      fetchTotalUsers();
  }, []); // Tambahkan dependency array di sini
    
    const user = useSelector(selectUser);
    // console.log("User data:", user);
    return (
      <>
          {/* <!-- Cards --> */}
          <h1 className='text-2xl text-slate-700 mb-5'>Welcome, {user ? user.name : 'Guest'}</h1>
              <div className="grid gap-6 mb-8 md:grid-cols-1 xl:grid-cols-2">
                {/* <!-- Card --> */}
                <div
                  className="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                  <div
                    className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <div>
                    <p
                      className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Users
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{totalUsers}</p>
                  </div>
                </div>
                {/* <!-- Card --> */}
                <div className="flex items-center p-4  rounded-lg shadow-xs bg-[#DEEF93]">
                  <div
                    className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                    <FaRobot />
                  </div>
                  <div>
                    <p
                      className="mb-2 text-sm font-medium text-gray-600 ">
                      Total Chatbot Info
                    </p>
                    <p
                      className="text-lg font-semibold text-gray-700 ">
                      000
                    </p>
                  </div>
                </div>
                {/* <!-- Card --> */}
              
                {/* <!-- Card --> */}
                
              </div>   
      </>
      )
  }

  export default CardInfo