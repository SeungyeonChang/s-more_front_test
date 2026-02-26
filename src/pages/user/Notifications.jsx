import React, { useState } from 'react';
import { FiBell, FiCheck, FiTrash2, FiSettings, FiFilter } from 'react-icons/fi';
import '../../styles/Notifications.css';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reservation',
      title: '예약이 확정되었습니다',
      message: 'A구역 사이트 5번 예약이 확정되었습니다. (2026-02-15)',
      time: '1시간 전',
      read: false,
      icon: '📅'
    },
    {
      id: 2,
      type: 'order',
      title: '주문이 배송되었습니다',
      message: '프리미엄 BBQ 세트가 배송 완료되었습니다.',
      time: '3시간 전',
      read: false,
      icon: '📦'
    },
    {
      id: 3,
      type: 'system',
      title: '포인트가 적립되었습니다',
      message: '리뷰 작성으로 500P가 적립되었습니다.',
      time: '5시간 전',
      read: true,
      icon: '💰'
    },
    {
      id: 4,
      type: 'promotion',
      title: '이번 주말 특별 할인!',
      message: '겨울 캠핑 메뉴 20% 할인 이벤트가 진행중입니다.',
      time: '1일 전',
      read: true,
      icon: '🎉'
    },
    {
      id: 5,
      type: 'weather',
      title: '날씨 알림',
      message: '예약하신 날짜(2/15)에 맑은 날씨가 예상됩니다.',
      time: '2일 전',
      read: true,
      icon: '🌤️'
    },
    {
      id: 6,
      type: 'community',
      title: '새로운 댓글',
      message: '작성하신 후기에 새로운 댓글이 달렸습니다.',
      time: '3일 전',
      read: true,
      icon: '💬'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: '전체', icon: <FiBell /> },
    { value: 'reservation', label: '예약', icon: '📅' },
    { value: 'order', label: '주문', icon: '📦' },
    { value: 'system', label: '시스템', icon: '💰' },
    { value: 'promotion', label: '프로모션', icon: '🎉' }
  ];

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleDeleteAll = () => {
    if (window.confirm('모든 알림을 삭제하시겠습니까?')) {
      setNotifications([]);
    }
  };

  return (
    <div className="notifications-page">
      <div className="container">
        {/* Header */}
        <div className="notifications-header">
          <div className="header-left">
            <h1>🔔 알림</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}개 읽지 않음</span>
            )}
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={handleMarkAllAsRead}>
              <FiCheck />
              모두 읽음
            </button>
            <button className="btn btn-outline" onClick={handleDeleteAll}>
              <FiTrash2 />
              전체 삭제
            </button>
            <button className="btn btn-outline">
              <FiSettings />
              알림 설정
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="notification-filters">
          {filterOptions.map(option => (
            <button
              key={option.value}
              className={`filter-btn ${filter === option.value ? 'active' : ''}`}
              onClick={() => setFilter(option.value)}
            >
              <span className="filter-icon">{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <FiBell size={64} />
              <h3>알림이 없습니다</h3>
              <p>새로운 알림이 도착하면 여기에 표시됩니다.</p>
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-card ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-icon">{notification.icon}</div>
                <div className="notification-content">
                  <div className="notification-header-row">
                    <h3>{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p>{notification.message}</p>
                </div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="action-btn"
                      onClick={() => handleMarkAsRead(notification.id)}
                      title="읽음으로 표시"
                    >
                      <FiCheck />
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(notification.id)}
                    title="삭제"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
