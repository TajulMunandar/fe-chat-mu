import { useState, useEffect } from 'react';
import axiosInstance from '../../features/axiosInstance';
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Intent = () => {
  const [intent_name, setIntentName] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getIntent = async () => {
      const ss = sessionStorage.getItem('user');
      const loginStatus = !!ss;

      try {
        // Gunakan metode GET untuk mengambil data produk
        const response = await axiosInstance.get('/intent', {
          params: { status_login: loginStatus, sesi: ss }
        });
        setIntentName(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg || "ANDA HARUS LOGIN DULU");
        } else {
          setMsg("Terjadi kesalahan.");
        }
      }
    };

    getIntent();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting Intent with ID:", id);
    if (!id) {
      setMsg("Intent ID is not defined.");
      return;
    }
    try {
      await axiosInstance.delete(`/intent/${id}`);
      setIntentName(intent_name.filter(intent => intent.uuid !== id)); // Pastikan ID yang difilter sesuai
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
        <h4 className="mb-4 text-lg font-semibold text-green-600 ">Table intents</h4>
        <Link to="/dashboard/InputIntent" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-3'>
          <p>Add</p>
          <FaPlus />
        </Link>
        <div className="w-full overflow-hidden rounded-lg shadow-xs bg-green-100 border-black my-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap border">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b bg-green-700 ">
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">intent Name</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-800 divide-y">
                {intent_name.map((intent, index) => (
                  <tr key={intent.uuid || index}>
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm">{intent.intent_name}</td>
                    <td className="px-4 py-3">  
                      <div className="flex items-center space-x-4 text-sm">
                        <Link to={`/dashboard/EditIntent/${intent.uuid}`} 
                          className="flex items-center justify-between px-2 py-2 text-lg font-medium leading-5 text-green-700"
                          aria-label="Edit">
                          <IoPencil />
                        </Link>
                        <button
                          onClick={() => handleDelete(intent.uuid)}
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

export default Intent;
