// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiMessageCircle } from 'react-icons/fi';
// import './ChatbotButton.css';

// const ChatbotButton = () => {
//   const navigate = useNavigate();
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const buttonRef = useRef(null);
//   const dragStart = useRef({ x: 0, y: 0 });
//   const offset = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const savedPosition = localStorage.getItem('chatbotPosition');
//     if (savedPosition) {
//       const pos = JSON.parse(savedPosition);
//       setPosition(pos);
//       offset.current = pos;
//     }
//   }, []);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     dragStart.current = {
//       x: e.clientX - offset.current.x,
//       y: e.clientY - offset.current.y
//     };
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;

//     const newX = e.clientX - dragStart.current.x;
//     const newY = e.clientY - dragStart.current.y;

//     const maxX = window.innerWidth - 60;
//     const maxY = window.innerHeight - 60;

//     offset.current = {
//       x: Math.max(0, Math.min(newX, maxX)),
//       y: Math.max(0, Math.min(newY, maxY))
//     };

//     setPosition(offset.current);
//   };

//   const handleMouseUp = () => {
//     if (isDragging) {
//       setIsDragging(false);
//       localStorage.setItem('chatbotPosition', JSON.stringify(offset.current));
//     }
//   };

//   const handleClick = () => {
//     if (!isDragging) {
//       navigate('/chatbot');
//     }
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   return (
//     <button
//       ref={buttonRef}
//       className={`chatbot-button ${isDragging ? 'dragging' : ''}`}
//       style={{
//         transform: `translate(${position.x}px, ${position.y}px)`
//       }}
//       onMouseDown={handleMouseDown}
//       onClick={handleClick}
//     >
//       <FiMessageCircle />
//       <span className="chatbot-tooltip">문의하기</span>
//     </button>
//   );
// };

// export default ChatbotButton;

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import './ChatbotButton.css';

const ChatbotButton = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '안녕하세요! 🏕️\n캠핑장 AI 어시스턴트입니다.\n무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const buttonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const moveThreshold = 5;

  // 초기 위치 설정
  useEffect(() => {
    const savedPosition = localStorage.getItem('chatbotPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    } else {
      // 기본 위치: 오른쪽 하단 (화면 안쪽으로)
      const defaultX = window.innerWidth - 90;
      const defaultY = window.innerHeight - 90;
      setPosition({ x: defaultX, y: defaultY });
    }
  }, []);

  // 메시지 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickReplies = [
    { id: 1, text: '사이트 예약', icon: '⛺' },
    { id: 2, text: '메뉴 주문', icon: '🍔' },
    { id: 3, text: '날씨 확인', icon: '☀️' },
    { id: 4, text: '가격 문의', icon: '💰' }
  ];

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('예약') || lowerMessage.includes('사이트')) {
      return '사이트 예약을 도와드릴게요! ⛺\n\n현재 이용 가능한 사이트:\n• A구역 프리미엄: 3개\n• B구역 일반: 5개\n• C구역 글램핑: 2개\n\n예약하시겠어요?';
    } else if (lowerMessage.includes('메뉴') || lowerMessage.includes('음식')) {
      return '메뉴 주문을 도와드릴게요! 🍔\n\n인기 메뉴:\n• 도시락 (₩12,000)\n• 삼겹살 세트 (₩25,000)\n• 라면 (₩5,000)';
    } else if (lowerMessage.includes('날씨')) {
      return '현재 날씨 정보예요! ☀️\n\n• 온도: 22°C\n• 날씨: 맑음\n• 습도: 45%\n\n캠핑하기 좋은 날씨네요!';
    } else if (lowerMessage.includes('가격') || lowerMessage.includes('요금')) {
      return '사이트 요금 안내드려요! 💰\n\n• A구역: ₩50,000/박\n• B구역: ₩35,000/박\n• C구역: ₩80,000/박\n\n주말은 20% 추가됩니다.';
    } else if (lowerMessage.includes('안녕') || lowerMessage.includes('hi')) {
      return '안녕하세요! 😊\n캠핑장에 오신 것을 환영합니다!\n무엇을 도와드릴까요?';
    } else {
      return '죄송해요, 잘 이해하지 못했어요. 😅\n\n아래 버튼을 눌러주시거나\n다시 질문해주세요!';
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: reply.text,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(reply.text),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);

    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
      startX: e.clientX,
      startY: e.clientY
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = Math.abs(e.clientX - dragStart.current.startX);
    const deltaY = Math.abs(e.clientY - dragStart.current.startY);

    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      setHasMoved(true);
    }

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;

    const boundedX = Math.max(0, Math.min(newX, maxX));
    const boundedY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (hasMoved) {
        localStorage.setItem('chatbotPosition', JSON.stringify(position));
      }
    }
  };

  const handleClick = () => {
    if (!hasMoved) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  useEffect(() => {
    const handleResize = () => {
      if (position) {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        setPosition(prev => ({
          x: Math.min(prev.x, maxX),
          y: Math.min(prev.y, maxY)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  if (!position) return null;

  return (
    <>
      {/* Chatbot Button */}
      <button
        ref={buttonRef}
        className={`chatbot-button ${isDragging ? 'dragging' : ''} ${isOpen ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
        {!isOpen && <span className="chatbot-tooltip">문의하기</span>}
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <h3>AI 어시스턴트</h3>
                <span className="online-status">온라인</span>
              </div>
            </div>
            <button className="close-chatbot" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.type}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  <div className="message-time">{formatTime(msg.timestamp)}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply) => (
              <button
                key={reply.id}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(reply)}
              >
                <span>{reply.icon}</span>
                {reply.text}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
