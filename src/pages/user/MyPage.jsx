import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUser, FiCalendar, FiShoppingBag, FiHeart, 
  FiMessageSquare, FiGift, FiCreditCard, FiStar,
  FiSettings, FiChevronRight
} from 'react-icons/fi';
import '../../styles/MyPage.css';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('reservations');

  const user = {
    name: '김캠핑',
    email: 'camping@example.com',
    phone: '010-1234-5678',
    memberSince: '2025-01-15',
    points: 15000,
    coupons: 3,
    level: 'VIP'
  };

  const reservations = [
    {
      id: 1,
      site: 'A구역 - 산 전망',
      checkIn: '2026-02-15',
      checkOut: '2026-02-16',
      status: 'confirmed',
      price: 50000,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      site: 'B구역 - 계곡 전망',
      checkIn: '2026-01-20',
      checkOut: '2026-01-21',
      status: 'completed',
      price: 60000,
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 3,
      site: 'C구역 - 숲 속',
      checkIn: '2026-01-05',
      checkOut: '2026-01-06',
      status: 'cancelled',
      price: 45000,
      image: 'https://via.placeholder.com/100'
    }
  ];

  const orders = [
    {
      id: 1,
      items: ['프리미엄 BBQ 세트', '생수 2L x 2'],
      date: '2026-01-20',
      status: 'delivered',
      total: 49000
    },
    {
      id: 2,
      items: ['캠핑 도시락', '마시멜로우 세트'],
      date: '2026-01-05',
      status: 'delivered',
      total: 20000
    }
  ];

  const statusBadge = (status) => {
    const badges = {
      confirmed: { text: '예약확정', class: 'status-confirmed' },
      completed: { text: '이용완료', class: 'status-completed' },
      cancelled: { text: '취소됨', class: 'status-cancelled' },
      delivered: { text: '배송완료', class: 'status-delivered' },
      pending: { text: '처리중', class: 'status-pending' }
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="mypage">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser size={48} />
          </div>
          <div className="profile-info">
            <div className="profile-name">
              <h1>{user.name}</h1>
              <span className="level-badge">{user.level}</span>
            </div>
            <p className="profile-email">{user.email}</p>
            <p className="member-since">가입일: {user.memberSince}</p>
          </div>
          <Link to="/mypage/settings" className="btn btn-outline">
            <FiSettings />
            설정
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon points">
              <FiCreditCard />
            </div>
            <div className="stat-info">
              <span className="stat-label">포인트</span>
              <span className="stat-value">{user.points.toLocaleString()}P</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon coupons">
              <FiGift />
            </div>
            <div className="stat-info">
              <span className="stat-label">쿠폰</span>
              <span className="stat-value">{user.coupons}개</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon reviews">
              <FiStar />
            </div>
            <div className="stat-info">
              <span className="stat-label">작성한 리뷰</span>
              <span className="stat-value">5개</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon wishlist">
              <FiHeart />
            </div>
            <div className="stat-info">
              <span className="stat-label">찜</span>
              <span className="stat-value">8개</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="quick-links">
          <Link to="/mypage/activity" className="quick-link">
            <FiMessageSquare />
            <span>활동 내역</span>
            <FiChevronRight />
          </Link>
          <Link to="/support" className="quick-link">
            <FiMessageSquare />
            <span>고객센터</span>
            <FiChevronRight />
          </Link>
        </div>

        {/* Main Content */}
        <div className="mypage-content">
          {/* Tabs */}
          <div className="tabs">
            <button 
              className={activeTab === 'reservations' ? 'active' : ''}
              onClick={() => setActiveTab('reservations')}
            >
              <FiCalendar />
              예약 내역
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''}
              onClick={() => setActiveTab('orders')}
            >
              <FiShoppingBag />
              주문 내역
            </button>
          </div>

          {/* Reservations Tab */}
          {activeTab === 'reservations' && (
            <div className="tab-content">
              <div className="content-header">
                <div className="title-area">
                  <h2>예약 내역</h2>
                  <span className="count">{reservations.length}건</span>
                </div>

                <Link to="/mypage/reservations" className="view-all-link">
                  전체보기
                </Link>
              </div>
              
              <div className="reservations-list">
                {reservations.slice(0, 3).map(reservation => {
                  const badge = statusBadge(reservation.status);
                  return (
                    <div key={reservation.id} className="reservation-card">
                      <img src={reservation.image} alt={reservation.site} />
                      <div className="reservation-info">
                        <div className="reservation-header">
                          <h3>{reservation.site}</h3>
                          <span className={`status-badge ${badge.class}`}>
                            {badge.text}
                          </span>
                        </div>
                        <div className="reservation-dates">
                          <span>체크인: {reservation.checkIn}</span>
                          <span>체크아웃: {reservation.checkOut}</span>
                        </div>
                        <div className="reservation-footer">
                          <span className="price">{reservation.price.toLocaleString()}원</span>
                          <div className="reservation-actions">
                            {reservation.status === 'confirmed' && (
                              <>
                                <button className="btn btn-sm btn-outline">예약 변경</button>
                                <button className="btn btn-sm btn-danger">예약 취소</button>
                              </>
                            )}
                            {reservation.status === 'completed' && (
                              <button className="btn btn-sm btn-primary">리뷰 작성</button>
                            )}
                            <button className="btn btn-sm btn-outline">상세보기</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="tab-content">
              <div className="content-header">
                <h2>주문 내역</h2>
                <span className="count">{orders.length}건</span>
              </div>
              
              <div className="orders-list">
                {orders.map(order => {
                  const badge = statusBadge(order.status);
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <span className="order-date">{order.date}</span>
                          <span className={`status-badge ${badge.class}`}>
                            {badge.text}
                          </span>
                        </div>
                        <span className="order-total">{order.total.toLocaleString()}원</span>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            • {item}
                          </div>
                        ))}
                      </div>
                      <div className="order-actions">
                        <button className="btn btn-sm btn-outline">상세보기</button>
                        <button className="btn btn-sm btn-primary">재주문</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
