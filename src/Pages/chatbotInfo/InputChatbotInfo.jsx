import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const InputChatbotInfo = () => {
  const [keywords, setKeywords] = useState('');
  const [answer, setAnswer] = useState('');
  const [intent, setIntent] = useState('');
  const [question, setQuestion] = useState('');
  const [msg, setMsg] = useState('');
  const [tempKeywords, setTempKeywords] = useState([]);
  const [intentList, setIntentList] = useState([]); // State untuk daftar intent
  const navigate = useNavigate();

  // Mengambil daftar intent dari backend
  useEffect(() => {
    const fetchIntents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/intent'); // Endpoint untuk mendapatkan intents
        setIntentList(response.data); // Mengatur daftar intent
      } catch (error) {
        console.error('Failed to fetch intents:', error);
      }
    };
    fetchIntents();
  }, []);

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (keywords.trim() !== '') {
      setTempKeywords([...tempKeywords, keywords.trim()]);
      setKeywords('');
    }
  };

  const handleRemoveKeyword = (index) => {
    setTempKeywords(tempKeywords.filter((_, i) => i !== index));
  };

  const saveChatbot = async (e) => {
    e.preventDefault();

    if (tempKeywords.length === 0) {
        setMsg("Please add at least one keyword.");
        return;
    }

    if (question.trim() === '') {
        setMsg("Question cannot be empty.");
        return;
    }

    if (intent.trim() === '') {
        setMsg("Intent must be selected.");
        return;
    }

    if (answer.trim() === '') {
        setMsg("Answer cannot be empty.");
        return;
    }

    try {
        const keywordString = tempKeywords.join(', ');
        await axios.post('http://localhost:5001/chatbotrules', {
            keywords: keywordString,
            answer: answer,
            intent_name: intent, // Mengirimkan intent_name, bukan ID
            question: question,
        });
        navigate('/dashboard/chatbot-info');
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
};


  return (
    <>
      <h4 className="mb-4 text-lg font-semibold text-green-700">Add Chatbot Info</h4>
      <Link to="/dashboard/chatbot-info" className='bg-green-700 px-2 w-16 font-bold text-white py-1 rounded text-xs my-3 flex items-center gap-2'>
        <FaArrowLeftLong />
        <p>Back</p>
      </Link>
      {msg && <p className="text-red-500 text-sm">{msg}</p>}

      <form onSubmit={saveChatbot}>
        <div className="px-4 py-3 mb-8 font-[poppins] bg-white border-2 rounded-lg shadow-md">

          {/* Keywords */}
          <div className="flex flex-wrap space-x-2 border-2 p-2 rounded-lg text-xs mb-3">
          {tempKeywords.map((keyword) => (
            <div key={keyword} className="border-2 p-1 rounded-md inline-block w-auto bg-slate-100 flex items-center space-x-1">
              <RxCross2 className="w-4 h-4 flex-shrink-0 cursor-pointer" onClick={() => handleRemoveKeyword(keyword)} />
              <p className="leading-none m-0">{keyword}</p>
            </div>
          ))}

          </div>

          {/* Input untuk Keywords */}
          <label className="block text-sm">
            <span className="text-green-700">Keywords</span>
            <div className="flex items-center mt-1 space-x-3">
              <input
                className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
                placeholder="Enter Keyword"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <button className="bg-green-800 px-2 text-white py-1 rounded text-base" onClick={handleAddKeyword}>
                Add
              </button>
            </div>
          </label>

          {/* Input untuk Intent */}
          <label className="block text-sm">
            <span className="text-green-700">Intent</span>
            <div className="flex items-center mt-1 space-x-3">
           <select
    className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
    value={intent}
    onChange={(e) => setIntent(e.target.value)}
>
    <option value="">Select Intent</option>
    {intentList.map((item) => (
        <option key={item.id || item.intent_name} value={item.id}>
            {item.intent_name}
        </option>
    ))}
</select>


            </div>
          </label>

          {/* Input untuk Question */}
          <label className="block text-sm">
            <span className="text-green-700">Questions</span>
            <div className="flex items-center mt-1 space-x-3">
              <input
                className="block w-full rounded-lg text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
                placeholder="Enter Questions"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
          </label>

          {/* Input untuk Answer */}
          <label className="block text-sm my-3">
            <span className="text-gray-700 dark:text-gray-400">Answer</span>
            <textarea
              className="block w-full rounded-lg mt-1 h-44 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
              placeholder="Enter Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </label>

          {/* Save Button */}
          <button type="submit" className="bg-green-800 px-5 text-white py-1 float-right rounded text-base my-5">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default InputChatbotInfo;
