import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../features/axiosInstance';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
const EditChatbotInfo = () => {
  const { chatbotId } = useParams();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    keywords: '',
    answer: '',
    question: '',
    intent:''
  });

  const [tempKeywords, setTempKeywords] = useState([]);
  const [intentList, setIntentList] = useState([]);

  useEffect(() => {
    const fetchIntents = async () => {
      try {
        const response = await axiosInstance.get('/intent'); // Sesuaikan dengan endpoint backend
        setIntentList(response.data);
      } catch (error) {
        console.error('Failed to fetch intents', error);
      }
    };
    fetchIntents();
  }, []);
    
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/chatbotrulesById/${chatbotId}`);
        const keywordsArray = response.data.keywords ? response.data.keywords.split(',').map(keyword => keyword.trim()) : [];
        
        // Hanya set data jika belum diubah (misalnya komponen pertama kali di-load)
        setUserData((prevData) => ({
          ...prevData,
          keywords: response.data.keywords || prevData.keywords,
          answer: response.data.answer || prevData.answer,
          intent: response.data.intent || prevData.intent,
          question: response.data.question || prevData.question,
        }));
        setTempKeywords(keywordsArray);
      } catch (error) {
        console.error('Failed to fetch chatbotinfo data', error);
      }
    };
  
    if (chatbotId) {
      fetchUserData();
    }
  }, [chatbotId]); // Pastikan ini hanya tergantung pada chatbotId
  

  const handleChange = (e) => {
    console.log('Change detected:', e.target.name, e.target.value); // Debugging
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddKeyword = (e) => {
    e.preventDefault();
  
    // Validasi input keyword
    const newKeyword = userData.keywords.trim();
    if (newKeyword === '') {
      alert('Keyword cannot be empty'); // Validasi jika kosong
      return;
    }
    if (tempKeywords.includes(newKeyword)) {
      alert('Duplicate keyword found'); // Validasi jika sudah ada di list
      return;
    }
  
    // Tambahkan ke daftar tempKeywords jika valid
    setTempKeywords([...tempKeywords, newKeyword]);
    setUserData({ ...userData, keywords: '' }); // Reset input field
  };
  

  const handleRemoveKeyword = async (index) => {
    // const keywordToRemove = tempKeywords[index];
    
    // Update the tempKeywords state locally
    const updatedKeywords = tempKeywords.filter((_, i) => i !== index);
    setTempKeywords(updatedKeywords);
  
    // Update the keywords in the database
    try {
      const keywordString = updatedKeywords.join(', ');
      await axiosInstance.patch(`/chatbotrules/${chatbotId}`, {
        keywords: keywordString,
        answer: userData.answer, // include answer in case it's required by backend
        intent: userData.intent, // include answer in case it's required by backend
        question: userData.question, // include answer in case it's required by backend
      });
      alert('Keyword removed successfully!');
    } catch (error) {
      console.error('Failed to update keywords', error.response?.data || error.message);
      alert('Failed to remove keyword');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Hapus duplikasi lokal
    const uniqueKeywords = [...new Set(tempKeywords.map((k) => k.trim()))];
  
    try {
      const keywordString = uniqueKeywords.join(', '); // Gabungkan keywords tanpa duplikasi
      console.log('Submitting keywords:', keywordString);
  
      const response = await axiosInstance.patch(`/chatbotrules/${chatbotId}`, {
        keywords: keywordString, // Kirim data bebas duplikasi
        answer: userData.answer,
        intent_name: userData.intent, // Ubah menjadi intent_id
        question: userData.question,
      });
      

      console.log('Payload submitted:', {
        keywords: keywordString,
        answer: userData.answer,
        intent_name: userData.intent,
        question: userData.question,
    });
    
  
      alert(response.data.msg || 'Chatbot updated successfully!');
      navigate('/dashboard/chatbot-info');
    } catch (error) {
      console.error('Failed to update chatbot', error.response?.data || error.message);
      alert(error.response?.data?.msg || 'Failed to update chatbot');
    }
  };
  
  

  return (
    <>
      <h4 className="mb-4 text-lg font-semibold text-gray-600">Edit Chatbot-info</h4>
      <Link to="/dashboard/chatbot-info" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-2'>
      <FaArrowLeftLong />
            <p>Back</p>
      </Link>
      <div className="px-4 py-3 mb-8 border-2 font-[poppins] rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap space-x-2 border-2 p-2 rounded-lg text-xs mb-3">
          {tempKeywords.map((keyword, index) => (
            <div
              key={index}
              className="border-2 p-1 rounded-md inline-block w-auto bg-slate-100 flex items-center space-x-1">
              <RxCross2
                className="w-4 h-4 flex-shrink-0 cursor-pointer"
                onClick={() => handleRemoveKeyword(index)} />
              <p className="leading-none m-0">{keyword}</p>
            </div>
          ))}
        </div>


          <label className="block text-sm">
            <span className="text-gray-700">Keywords</span>
            <div className="flex items-center mt-1 space-x-3">
              <input
                name="keywords"
                value={userData.keywords}
                onChange={handleChange}
                className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
                placeholder="Add keyword"
              />
              <button className="bg-green-800 px-2 text-white py-1 rounded text-base" onClick={handleAddKeyword}>
                Add
              </button>
            </div>
          </label>


{/* Input untuk intent */}
    <label className="block text-sm">
      <span className="text-green-700">Intent</span>
      <div className="flex items-center mt-1 space-x-3">
      <select
  name="intent"
  id=""
  className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
  value={userData.intent || ''}
  onChange={handleChange}
>
  <option value="">Select Intent</option>
  {intentList.length > 0 ? (
  intentList.map((item, index) => (
    <option key={item.id || index} value={item.intent_name}>
      {item.intent_name}  
    </option>

  ))
) : (
  <option disabled>No intents available</option>
)}

</select>

      </div>
    </label>


          {/* Input untuk Soal */}
          <label className="block text-sm">
            <span className="text-green-700">Questions</span>
            <div className="flex items-center mt-1 space-x-3">
              <input
                className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
                placeholder="Enter Questions"
                value={userData.question}
                onChange={handleChange}
                name='question'
              />
            </div>
          </label>

          <label className="block text-sm my-3">
            <span className="text-gray-700">Answer</span>
            <textarea
              name="answer"
              value={userData.answer}
              onChange={handleChange}
              className="block w-full h-44 rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Edit answer"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-green-800 px-5 text-white py-1 float-right rounded text-base my-5">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditChatbotInfo;
