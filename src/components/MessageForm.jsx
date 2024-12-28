import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import imageChatbot from '../assets/chatbot.png';
import LogoChatbot from '../Pages/atoms/logoChatbot';
import './styles.css';
import { Link } from 'react-router-dom';
import { FaHeadphonesAlt } from "react-icons/fa";
const MessageForm = () => {
  const [messages, setMessages] = useState([]);
  const [intents, setIntents] = useState([]); // Daftar intents
  const [questions, setQuestions] = useState([]); // Daftar pertanyaan
  const [selectedIntent, setSelectedIntent] = useState(null); // Intent yang dipilih
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Pertanyaan yang dipilih
  const [isLoadingIntents, setIsLoadingIntents] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [error, setError] = useState(null); // Untuk menangani error
  const messagesEndRef = useRef(null);
  const [isBotImageVisible, setIsBotImageVisible] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(true);
  const [showQuestionText, setShowQuestionText] = useState(false);
  const questionsEndRef = useRef(null);

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setIsBouncing(!isBouncing);
    }, 8000);

    return () => {
      clearInterval(bounceInterval);
    };
  }, [isBouncing]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    scrollToBottom(); // Pastikan scroll ke bawah setiap kali daftar pertanyaan di-render
  }, [questions]); // Ketika daftar pertanyaan berubah
  
  // Fetch intents saat pertama kali komponen di-mount
  useEffect(() => {
    setIsLoadingIntents(true);
    fetch('http://localhost:5001/intents')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal memuat intents.');
        }
        return response.json();
      })
      .then((data) => setIntents(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error('Error fetching intents:', error);
        setError('Gagal memuat intents. Silakan coba lagi.');
        setIntents([]);
      })
      .finally(() => setIsLoadingIntents(false));
  }, []);
  

  // Fetch questions saat intent dipilih
  useEffect(() => {
    if (selectedIntent) {
      setIsLoadingQuestions(true);
      fetch(`http://localhost:5001/questions/${selectedIntent}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Gagal memuat pertanyaan.');
          }
          return response.json();
        })
        .then((data) => setQuestions(Array.isArray(data) ? data : []))
        .catch((error) => {
          console.error('Error fetching questions:', error);
          setError('Gagal memuat pertanyaan. Silakan coba lagi.');
          setQuestions([]);
        })
        .finally(() => setIsLoadingQuestions(false));
    }
  }, [selectedIntent]);
  

  const handleSendMessage = async (event) => {
    event.preventDefault();
    let messageText = event.target.message.value.trim();
    if (!messageText) return;

    if (isBotImageVisible) {
      setIsBotImageVisible(false);
    }

    setMessages((messages) => [...messages, { text: messageText, sender: 'user' }]);

    try {
      const response = await fetch('http://localhost:5001/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();
      const responseText = data.answer || 'Maaf, saya tidak mengerti pertanyaanmu.';

      setTimeout(() => {
        setMessages((messages) => [...messages, { text: responseText, sender: 'bot' }]);
        scrollToBottom();
      }, 1000);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }

    event.target.reset();
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    if (isBotImageVisible) {
      setTimeout(() => {
        setShowQuestionText(true);
      }, 3000);
    } else {
      setShowQuestionText(false);
    }
  }, [isBotImageVisible]);

  const handleIntentClick = (intent) => {
    setSelectedIntent(intent);
    setQuestions([]); // Reset questions saat intent berubah
    setSelectedQuestion(null);
    setIsBotImageVisible(false);
  };
  useEffect(() => {
    if (questionsEndRef.current) {
      questionsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questions]); // Setiap kali daftar pertanyaan berubah
  
  const handleQuestionClick = (question) => {
    // setSelectedQuestion(question);
  
    // Masukkan pertanyaan pengguna ke dalam pesan
    setMessages((messages) => [
      ...messages,
      { text: question.question, sender: 'user' },
      { text: question.answer, sender: 'bot' },
    ]);
  };
  
  const handleBackToIntent = () => {
    setSelectedIntent(null); // Kembali ke daftar intent
    setSelectedQuestion(null); // Reset pertanyaan yang dipilih
    setQuestions([]); // Reset daftar pertanyaan
  };

  return (
    <div className='fixed bottom-20 right-0 mb-4 mr-4 w-full max-w-[95%] md:max-w-[400px] rounded-lg bg-white shadow-lg'>
      <section className={`transition-all ${isChatbotOpen ? 'block' : 'hidden'}`}>
        <div className="min-h-[450px] flex flex-col justify-between ">
          <div>
            <div className='bg-green-700 p-2 py-5 rounded-t-lg'>
              <div className='flex justify-between items-center'>
                <span className='text-white font-medium font-[poppins]'>Umuslim Bot</span>
                <Link to="/Hubungi-Admin" className='py-1 px-2 flex gap-1 items-center bg-white rounded-full font-[poppins] text-xs font-bold'>
                <FaHeadphonesAlt /> 
                 <p>Tanya Admin</p>
                </Link>
              </div>
            </div>
            {isBotImageVisible && (
              <div className="relative flex justify-center items-center flex-col">
                <img src={imageChatbot} alt="Logo Chatbot" className='w-44 mb-5 max-w-full h-auto'/>
                {showQuestionText && (
                  <p className="text-center text-sm p-5 mb-4">
                    Ada yang bisa kami bantu? Tanyakan saja dan kami akan membalas chat kamu!
                  </p>
                )}
              </div>
            )}

            {error && <p className="text-red-500 p-4">{error}</p>}

           {/* Chat Container */}
            <div className="chat-container flex-grow max-h-[450px] overflow-y-auto">
              {/* Menampilkan Pesan Chat */}
              <div className='space-y-2 p-2 md:max-h-80 max-h-80 md:text-xs overflow-y-auto flex-grow flex flex-col'>
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 ${msg.sender === 'user' ? 'bg-gray-300 text-black self-end w-1/2 ml-36 rounded-l-md rounded-br-md' : 'bg-[#006633] text-white self-start w-1/2 rounded-r-md rounded-bl-md'} `}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
                <div ref={questionsEndRef} /> 
              </div> 
              
              {/* Daftar Intent */}
              {selectedIntent === null && (
                <div className="flex gap-1 flex-wrap px-2 backdrop-blur-lg bg-white/50 pt-1">
                  {isLoadingIntents ? (
                    <p>Memuat intents...</p>
                  ) : intents.length > 0 ? (
                    [...new Set(intents)].map((intent, index) => (
                      <button
                        key={index}
                        className="px-3 border rounded-full mb-3 bg-gray-100"
                        onClick={() => handleIntentClick(intent)}
                      >
                        {intent}
                      </button>
                    ))
                  ) : (
                    <p>Tidak ada intents tersedia.</p>
                  )}
                </div>
              )}

                    {selectedIntent && !selectedQuestion && (
                    <div className='px-3 py-2 text-sm '>
                      {isLoadingQuestions ? (
                        <p className="">...</p>
                      ) : questions.length > 0 ? (
                        questions.map((question, index) => (
                          <button
                            key={index}
                            className="fade-in px-3 border rounded-lg py-1 bg-gray-100 mb-2 block text-left"
                            onClick={() => handleQuestionClick(question)}
                          >
                            {question.question}
                          </button>
                        ))
                      ) : (
                        <p className="fade-in">Tidak ada pertanyaan untuk intent ini.</p>
                      )}
                      <div className="">
                        <button
                          className="text-blue-500"
                          onClick={handleBackToIntent}
                        >
                          Kembali
                        </button>
                      </div>
                    </div>
                  )}


              {/* Kembali ke Intent */}


                          
            </div>

          </div>

          <form onSubmit={handleSendMessage} className='flex items-center bg-white rounded-b-lg shadow mt-auto'>
            <TextField
              name="message"
              fullWidth
              variant="outlined"
              placeholder='Masukkan Kata Kunci Contoh: "Pendaftaran"'
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" style={{ color: '#006633' }} aria-label="kirim pesan">
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </div>
      </section>

      <div className={`fixed bottom-5 right-5 transition group hover:scale-110 ${isBouncing ? 'bounce-animation animate__animated animate__bounce' : ''}`}>
        <Tooltip title="Ada Pertanyaan?" placement="left-start">
          <IconButton onClick={toggleChatbot}>
            {isChatbotOpen ? (
              <CloseIcon style={{ color: '#FF5733'}} className='transition'/>
            ) : (
              <LogoChatbot style={{ color: '#006633' }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default MessageForm;
