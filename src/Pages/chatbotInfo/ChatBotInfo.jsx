import { useState, useEffect } from 'react';
import axiosInstance from '../../features/axiosInstance';
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
const ChatBotInfo = () => {
  const [chatbotRules, setChatbotRules] = useState([]);
  const [defaultResponse, setDefaultResponse] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getChatbotRules = async () => {
      const ss = sessionStorage.getItem('user');
      const loginStatus = !!ss;

      try {
        const response = await axiosInstance.get('/chatbotrules', {
          params: { status_login: loginStatus, sesi: ss }
        });
        setChatbotRules(response.data);
      } catch (error) {
        setMsg(error.response ? error.response.data.msg || "ANDA HARUS LOGIN DULU" : "Terjadi kesalahan.");
      }
    };

    const getDefaultResponse = async () => {
      try {
        const response = await axiosInstance.get('/defaultresponses'); // Ambil satu default response
        console.log("Default Response:", response.data);
        if (response.data) {
          setDefaultResponse(response.data.response); // Set default response ke state
        }
      } catch (error) {
        console.error("Error fetching default response:", error);
      }
    };

    getChatbotRules();
    getDefaultResponse();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setMsg("Chatbot Rule ID is not defined.");
      return;
    }
    try {
      await axiosInstance.delete(`/chatbotrules/${id}`);
      setChatbotRules(chatbotRules.filter(rule => rule.uuid !== id));
    } catch (error) {
      setMsg(error.response ? error.response.data.msg : "Terjadi kesalahan.");
    }
  };

  // Mengirim request update default response
  // const handleUpdateDefaultResponse = async () => {
  //   try {
  //     const response = await axiosInstance.patch(`/defaultresponse`, { response: defaultResponse });
  //     console.log('Updated response:', response);
  //     setShowModal(false); // Tutup modal setelah sukses mengupdate
  //   } catch (error) {
  //     console.error('Error updating default response:', error);
  //   }
  // };


  const handleUpdateDefaultResponse = async () => {
    try {
      const response = await axiosInstance.patch(`/defaultresponse`, { response: defaultResponse });
      console.log('Updated response:', response);
      setShowModal(false);
      setMsg("Default response updated successfully.");
    } catch (error) {
      console.error('Error updating default response:', error);
      setMsg("Terjadi kesalahan saat mengupdate default response.");
    }
  };
  return (
    <>
      <div>
        <h4 className="mb-4 text-lg font-semibold text-green-600">Chatbot Info</h4>
        <div className='flex justify-between'>
          <Link to="/dashboard/input-chatbot-info" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-3'>
            <p>Add</p>
            <FaPlus />
          </Link>
          <button
            className="bg-green-800 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}>
            Default Answer
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs bg-green-100 border-black my-5">
  <div className="w-full overflow-x-auto">
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-white uppercase border-b bg-green-700">
          <th className="px-4 py-3">No</th>
          <th className="px-4 py-3">Keyword</th>
          <th className="px-4 py-3">Intent</th>
          <th className="px-4 py-3">Questions</th>
          <th className="px-4 py-3">Answers</th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="text-slate-800 divide-y">
        {chatbotRules.map((rule, index) => (
          <tr key={rule.uuid || index}>
            <td className="px-4 py-3 text-sm">{index + 1}</td>
            
            {/* Keyword section with truncate and tooltip */}
            <td className="px-4 py-3 text-sm">
              <div className="relative group">
                <span className="truncate max-w-20 inline-block">{rule.keywords}</span>
                <div className="absolute hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap bottom-full mb-2">
                  {rule.keywords}
                </div>
              </div>
            </td>
            {/* Keyword section with truncate and tooltip */}
            <td className="px-4 py-3 text-sm">
              <div className="relative group">
              <span className="truncate max-w-xs inline-block">
                {rule.intent?.intent_name || 'No Intent'}
              </span>
              </div>
            </td>
            {/* Keyword section with truncate and tooltip */}
            <td className="px-4 py-3 text-sm">
              <div className="relative group">
                <span className="max-w-xs inline-block">{rule.question || 'N/A'}</span>
              </div>
            </td>

            {/* Answer section with truncate and tooltip */}
            <td className="px-4 py-3 text-sm">
              <div className="relative group">
                <span className="truncate max-w-32 inline-block">{rule.answer}</span>
                
              </div>
            </td>

            <td className="px-4 py-3">
              <div className="flex items-center space-x-4 text-sm">
                <Link to={`/dashboard/edit-chatbot-info/${rule.uuid}`}
                  className="flex items-center justify-between px-2 py-2 text-lg font-medium leading-5 text-yellow-400"
                  aria-label="Edit">
                  <IoPencil />
                </Link>
                <button
                  onClick={() => handleDelete(rule.uuid)}
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



{/* ******** Modal Default Response */}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Default Answer</h3>
                    {/* Tampilkan pesan jika ada */}
                    {msg && <div className="alert alert-info">{msg}</div>}
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Input Default Responses
                  </p>
                  <input
                    type="text"
                    className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
                    placeholder="Default response"
                    value={defaultResponse || ''}
                    onChange={(e) => setDefaultResponse(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdateDefaultResponse} // Pastikan defaultResponse dikirim
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default ChatBotInfo;
