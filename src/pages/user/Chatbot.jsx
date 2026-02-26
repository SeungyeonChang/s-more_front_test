import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMenu, FiShoppingBag, FiCalendar, FiUser } from 'react-icons/fi';
import '../../styles/Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: '안녕하세요! 캠핑장 AI 어시스턴트입니다. 무엇을 도와드릴까요?',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    { id: 1, icon: <FiCalendar />, text: '예약 문의', action: 'reservation' },
    { id: 2, icon: <FiShoppingBag />, text: '메뉴 주문', action: 'order' },
    { id: 3, icon: <FiMenu />, text: '시설 안내', action: 'facilities' },
    { id: 4, icon: <FiUser />, text: '관리자 연결', action: 'admin' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message = inputValue) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: getBotResponse(message),
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('예약') || lowerMessage.includes('reservation')) {
      return '예약을 도와드리겠습니다. 원하시는 날짜와 인원을 알려주시겠어요?\n\n예: "2월 15일, 4명"';
    } else if (lowerMessage.includes('메뉴') || lowerMessage.includes('주문')) {
      return '메뉴 주문을 원하시는군요! 다음 메뉴를 추천드립니다:\n\n1. 프리미엄 BBQ 세트 - 45,000원\n2. 캠핑 도시락 - 12,000원\n3. 생수 2L - 2,000원\n\n주문하시겠어요?';
    } else if (lowerMessage.includes('시설') || lowerMessage.includes('안내')) {
      return '저희 캠핑장 시설을 안내해드립니다:\n\n✓ 전기/주차 가능\n✓ 샤워실/화장실\n✓ BBQ 그릴 대여\n✓ 와이파이 제공\n✓ 야외극장\n\n더 자세한 정보가 필요하신가요?';
    } else if (lowerMessage.includes('날씨')) {
      return '현재 날씨는 맑음, 기온 15°C입니다.\n\n이번 주말 날씨는 좋을 것으로 예상됩니다. 캠핑하기 좋은 날씨네요! 🌞';
    } else if (lowerMessage.includes('취소') || lowerMessage.includes('환불')) {
      return '예약 취소 정책은 다음과 같습니다:\n\n• 3일 전까지: 100% 환불\n• 2일 전까지: 50% 환불\n• 1일 전부터: 환불 불가\n\n취소를 원하시면 예약번호를 알려주세요.';
    } else {
      return '죄송하지만 정확히 이해하지 못했습니다. 다시 한 번 말씀해 주시겠어요?\n\n다음 항목으로 도와드릴 수 있습니다:\n• 예약 문의\n• 메뉴 주문\n• 시설 안내\n• 관리자 연결';
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      reservation: '예약 문의',
      order: '메뉴 주문하고 싶어요',
      facilities: '시설 안내 부탁드려요',
      admin: '관리자와 연결해주세요'
    };

    handleSendMessage(actionMessages[action]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-page">
      <div className="container">
        <div className="chatbot-container">
          {/* Header */}
          <div className="chatbot-header">
            <div className="bot-avatar">🤖</div>
            <div className="bot-info">
              <h2>캠핑장 AI 어시스턴트</h2>
              <span className="status">● 온라인</span>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                {message.type === 'bot' && (
                  <div className="message-avatar">🤖</div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
                    {message.content}
                  </div>
                  <span className="message-time">{message.time}</span>
                </div>
                {message.type === 'user' && (
                  <div className="message-avatar user">👤</div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map(action => (
              <button
                key={action.id}
                className="quick-action-btn"
                onClick={() => handleQuickAction(action.action)}
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              rows={1}
            />
            <button
              className="send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
