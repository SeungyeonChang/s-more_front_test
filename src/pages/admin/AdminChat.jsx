import React, { useState } from 'react';
import { FiSearch, FiSend, FiPaperclip, FiMoreVertical, FiUsers } from 'react-icons/fi';
import '../../styles/AdminChat.css';

const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      user: '김캠핑',
      avatar: 'K',
      lastMessage: '예약 변경이 가능한가요?',
      time: '5분 전',
      unread: 2,
      status: 'online'
    },
    {
      id: 2,
      user: '이자연',
      avatar: 'L',
      lastMessage: '감사합니다!',
      time: '1시간 전',
      unread: 0,
      status: 'offline'
    },
    {
      id: 3,
      user: '박야외',
      avatar: 'P',
      lastMessage: '체크인 시간 문의드립니다',
      time: '2시간 전',
      unread: 1,
      status: 'online'
    },
    {
      id: 4,
      user: '최캠핑',
      avatar: 'C',
      lastMessage: '환불 처리 언제 되나요?',
      time: '3시간 전',
      unread: 3,
      status: 'offline'
    },
    {
      id: 5,
      user: '정텐트',
      avatar: 'J',
      lastMessage: '좋은 시설 감사합니다',
      time: '어제',
      unread: 0,
      status: 'offline'
    }
  ];

  const messages = selectedUser ? [
    {
      id: 1,
      sender: 'user',
      content: '안녕하세요, 예약 변경이 가능한가요?',
      time: '14:30'
    },
    {
      id: 2,
      sender: 'admin',
      content: '안녕하세요! 예약번호를 알려주시면 확인해드리겠습니다.',
      time: '14:31'
    },
    {
      id: 3,
      sender: 'user',
      content: 'RES-001입니다. 체크인 날짜를 2월 20일로 변경하고 싶습니다.',
      time: '14:32'
    },
    {
      id: 4,
      sender: 'admin',
      content: '확인했습니다. 2월 20일 가능합니다. 변경 처리해드릴까요?',
      time: '14:33'
    },
    {
      id: 5,
      sender: 'user',
      content: '네, 부탁드립니다!',
      time: '14:35'
    }
  ] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log('Sending message:', message);
    setMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-chat">
      <div className="chat-layout">
        {/* Sidebar - Conversations List */}
        <aside className="chat-sidebar">
          <div className="sidebar-header">
            <h2>💬 고객 채팅</h2>
            <button className="btn btn-outline btn-sm">
              <FiUsers />
              전체
            </button>
          </div>

          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="대화 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="conversations-list">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                className={`conversation-item ${selectedUser?.id === conv.id ? 'active' : ''}`}
                onClick={() => setSelectedUser(conv)}
              >
                <div className="user-avatar-wrapper">
                  <div className="user-avatar">{conv.avatar}</div>
                  <span className={`status-dot ${conv.status}`}></span>
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <strong>{conv.user}</strong>
                    <span className="time">{conv.time}</span>
                  </div>
                  <div className="last-message">
                    <span>{conv.lastMessage}</span>
                    {conv.unread > 0 && (
                      <span className="unread-badge">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="chat-main">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="user-avatar-wrapper">
                    <div className="user-avatar large">{selectedUser.avatar}</div>
                    <span className={`status-dot ${selectedUser.status}`}></span>
                  </div>
                  <div>
                    <h3>{selectedUser.user}</h3>
                    <span className="status-text">
                      {selectedUser.status === 'online' ? '온라인' : '오프라인'}
                    </span>
                  </div>
                </div>
                <button className="icon-btn">
                  <FiMoreVertical />
                </button>
              </div>

              {/* Messages */}
              <div className="messages-container">
                {messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender}`}>
                    <div className="message-content">
                      <p>{msg.content}</p>
                      <span className="message-time">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="chat-input">
                <button type="button" className="icon-btn">
                  <FiPaperclip />
                </button>
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  <FiSend />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <FiUsers size={64} />
              <h3>대화를 선택하세요</h3>
              <p>왼쪽 목록에서 고객을 선택하여 채팅을 시작하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
