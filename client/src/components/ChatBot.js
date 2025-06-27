import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const bannerUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAXkuh6dRfnFQgTXbrNwj0iM4b4VKRZXCyYbxQRDLOzO1IDHpaE8CtUdzgvANJxxeawjD82FPiD9yMOL55li1GA7YyXivHoimV-p_BZoXG5an7LJJRplNBD_V3pLP4za_RZAU8R-WlNcWwmu-iRaG7-mzthyGugMZLDbu5kRy7yvHRmXIRmuXIHLr2BoWHKIk7U0SsvSmK_pxqSrk2d8Guj6mugSlYozcXjMI8-ZOOkt9uvBHnsWsfW38N5Muly7d7vqN7yp-Hggaz6";
const userAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuBO3L7nsjVjh4OH8eJ04Z-8hyhVn84rezTjQOHkvRFUlaHC5Os14LaGXFGo1wzTvXgjraxNpg7WuACKqoYi8kNW3VwuYchtx01IQAEUkI3_sQEpUQX0zWwQ7m_IUxEQJmllLSzmo79yorMxnlKpjUwKgavbvLJCvV7QSut3fF2HCbW3oBAD-otG3fhshVXX0DUQCT-KdFXjpk9zIdKZQIDx0aJT3wU9GciKNo9xCpcqjMXVKdPMh1a8NtA1F7RbLOflAQ3I6JRTd0NC";
const botAvatar = "https://lh3.googleusercontent.com/aida-public/AB6AXuAjKOna72RK2IkhaxvVyVa19nkcoEJlICDXVi_LWPC52qHGRkD50ytSVdMJn-ZYLNpe6QG0rDXuUbBfP904l3FS935FPmfNf8qbhLk_3Q4GKz9ZILSSrYoZqWD5CdiNU_X9--4f6h66pnftyLo1QyhWAhMYTEEBin8itOE09X1fncUcCtGM6N8jShE6j9OVE8ldbDirs6Y2rlPXxGpf12YMmd4oriITsAgC18Szk8jn70lOvQvSoYyZWB7f7MEdpjbrQgF2XwSZaXi9";

const quickReplies = [
  { text: '😊 I feel happy!', emoji: '😊' },
  { text: '😔 I feel sad', emoji: '😔' },
  { text: '😰 I feel anxious', emoji: '😰' },
  { text: '😃 Tell me something positive!', emoji: '😃' },
  { text: '🔥 I feel burned out', emoji: '🔥' },
];

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  async function getBotResponse(message) {
    // Connect to your backend (Rasa or /chat endpoint)
    const response = await axios.post('http://127.0.0.1:5000/chat', { message });
    return response.data.reply;
  }

  const handleSend = async (msg) => {
    const userMsg = typeof msg === 'string' ? msg : message;
    if (userMsg.trim() === '') return;
    setIsTyping(true);
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setMessage('');
    const botReply = await getBotResponse(userMsg);
    setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  function renderRichText(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={i}>{part.replace(/\*\*/g, '')}</strong>;
      }
      return part;
    });
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Main Chat Area Only */}
      <main className="flex-1 flex flex-col mx-auto">
        {/* Navbar */}
        <header className="flex items-center justify-between border-b border-white px-6 py-3 bg-[#000]">
          <div className="flex items-center gap-4 text-white">
            <div className="w-5 h-5">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">MoodSense</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <button className="text-white text-sm font-medium" onClick={() => navigate('/')}>Home</button>
            <button className="text-white text-sm font-medium" onClick={() => navigate('/journal')}>Journal Entry</button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 ml-4" style={{ backgroundImage: `url('${userAvatar}')` }}></div>
          </div>
        </header>
        {/* Main Content */}
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5 bg-[#1a1a1a] w-full h-full" style={{ backgroundColor: '#1a1a1a' }}>
          <div className="flex flex-col max-w-[960px] w-full bg-[#1a1a1a]" style={{ backgroundColor: '#1a1a1a' }}>
            {/* Banner */}
            <div className="w-full relative flex flex-col justify-end overflow-hidden rounded-xl min-h-80" style={{ minHeight: '20rem', maxHeight: '340px', height: '340px' }}>
              <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover rounded-xl" style={{ minHeight: '20rem', maxHeight: '340px', height: '340px' }} />
              <div className="absolute inset-0 bg-[#1a1a1a] opacity-60 rounded-xl"></div>
            </div>
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome to MoodSense</h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Start your journey to better mental health with our AI psychologist. Share your thoughts and feelings in a safe and confidential space.
            </p>
            {/* Chat Area */}
            <div className="flex flex-col gap-0 w-full">
              {messages.length > 0 ? messages.map((msg, idx) => (
                <div key={idx} className={`flex items-end gap-3 p-4 ${msg.sender === 'bot' ? '' : 'justify-end'}`}>
                  {msg.sender === 'bot' && (
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style={{ backgroundImage: `url('${botAvatar}')` }}></div>
                  )}
                  {msg.sender === 'user' && (
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0 order-2 md:order-none" style={{ backgroundImage: `url('${userAvatar}')` }}></div>
                  )}
                  <div className={`flex flex-1 flex-col gap-1 items-${msg.sender === 'bot' ? 'start' : 'end'}`}> 
                    {msg.sender === 'bot' && (
                      <p className="text-[#adadad] text-[13px] font-normal leading-normal max-w-[360px]">MoodSense AI</p>
                    )}
                    <p className={`text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 border border-white ${msg.sender === 'bot' ? 'bg-[#363636] text-white' : 'bg-[#000] text-white'}`}>{renderRichText(msg.text || "")}</p>
                  </div>
                </div>
              )) : (
                <div className="text-gray-400 italic p-4 text-center">No messages yet. Start chatting!</div>
              )}
              {isTyping && (
                <div className="flex items-end gap-3 p-4">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style={{ backgroundImage: `url('${botAvatar}')` }}></div>
                  <div className="flex flex-1 flex-col gap-1 items-start">
                    <p className="text-[#adadad] text-[13px] font-normal leading-normal max-w-[360px]">MoodSense AI</p>
                    <p className="text-base font-normal leading-normal flex max-w-[360px] rounded-xl px-4 py-3 bg-[#363636] text-white">
                      <span className="dot-flashing"></span>
                      <span className="ml-2">Bot is typing...</span>
                    </p>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            {/* Quick Reply Buttons */}
            <div className="flex flex-wrap gap-2 mb-2 px-4">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  className="bg-[#232323] hover:bg-[#363636] text-white px-3 py-1 rounded-full transition flex items-center gap-1 text-sm font-semibold"
                  onClick={() => handleSend(qr.text)}
                >
                  <span>{qr.emoji}</span> {qr.text.replace(/^[^ ]+ /, '')}
                </button>
              ))}
            </div>
            {/* Input Area */}
            <div className="flex items-center px-4 py-3 gap-3">
              <label className="flex flex-col min-w-40 h-12 flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <input
                    placeholder="Type your message..."
                    style={{ color: '#000' }}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-black focus:outline-0 focus:ring-0 border border-white bg-[#000] focus:border-white h-full placeholder:text-[#adadad] px-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  />
                  <div className="flex border-none bg-[#363636] items-center justify-center pr-4 rounded-r-xl border-l-0 !pr-2">
                    <div className="flex items-center gap-4 justify-end">
                      <div className="flex items-center gap-1">
                        <button className="flex items-center justify-center p-1.5" type="button">
                          <div className="text-[#adadad]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                              <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z" />
                            </svg>
                          </div>
                        </button>
                      </div>
                      <button
                        className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-black text-white text-sm font-medium leading-normal hidden md:block"
                        onClick={() => handleSend()}
                        disabled={isTyping || !message.trim()}
                        type="button"
                      >
                        <span className="truncate">Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </main>
      {/* Typing indicator animation CSS */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #388e3c;
          color: #388e3c;
          animation: dotFlashing 1s infinite linear alternate;
        }
        @keyframes dotFlashing {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

// This ChatBot component provides a simple interface for users to interact with the MoodSense application. It includes a text area for input and a button to send messages. The component uses React's state management to handle user input and provides basic functionality to simulate sending messages.
// The component is styled with Tailwind CSS, ensuring a modern and responsive design. It features a header, a text area for user input, and a button to send messages. This interactive element enhances user engagement and provides a platform for users to express their thoughts and feelings, contributing to the overall mental wellness experience of the MoodSense application.