import { useState, useEffect } from 'react';
import axiosInstance from '../../features/axiosInstance';
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Usersk = () => {
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const ss = sessionStorage.getItem('user');
      const loginStatus = !!ss;

      try {
        // Gunakan metode GET untuk mengambil data
        const response = await axiosInstance.get('/users', {
          params: { status_login: loginStatus, sesi: ss }
        });
        setUsers(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg || "ANDA HARUS LOGIN DULU");
        } else {
          setMsg("Terjadi kesalahan.");
        }
      }
    };

    getUsers();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting user with ID:", id); // Log ID untuk debugging
    if (!id) {
      setMsg("User ID is not defined.");
      return;
    }
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter(user => user.uuid !== id)); // Pastikan ID yang difilter sesuai
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi kesalahan.");
      }
    }
  };
  
  

  return (
    <>
      <div>
        <h4 className="mb-4 text-lg font-semibold text-green-600 ">Table Users</h4>
        <Link to="/dashboard/InputUsers" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-3'>
          <p>Add</p>
          <FaPlus />
        </Link>
        <div className="w-full overflow-hidden rounded-lg shadow-xs bg-green-100 border-black my-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b bg-green-700 ">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-800 divide-y ">
              {users.map((user, index) => (
                  <tr key={user.uuid || index}> 
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className='bg-green-800 px-2 py-1 text-white rounded-full text-sm'>{user.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <Link to={`/dashboard/EditUsers/${user.uuid}`} 
                          className="flex items-center justify-between px-2 py-2 text-lg font-medium leading-5 text-yellow-400"
                          aria-label="Edit">
                          <IoPencil />
                        </Link>
                        <button
                          onClick={() => handleDelete(user.uuid)} // Ubah 'user.id' menjadi 'user.uuid' jika itu yang digunakan
                          className="flex items-center justify-between px-2 py-2 text-lg font-medium leading-5 text-red-700"
                          aria-label="Delete">
                          <IoTrashOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {msg && <p className="text-red-500 text-sm">{msg}</p>}
      </div>
    </>
  );
};

export default Usersk;