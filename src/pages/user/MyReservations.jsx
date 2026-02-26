import React, { useState } from 'react';
import { FiCheckCircle, FiCalendar, FiMapPin } from 'react-icons/fi';
import '../../styles/MyReservations.css';

const MyReservations = () => {
  const reservations = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    site: { 
      name: `A구역 - 사이트${i+1}`, 
      description: `사이트${i+1} 상세 설명`, 
      location: { address: `경기도 가평군 캠핑장 ${i+1}` } 
    },
    checkIn: `2026-02-${10 + i}`,
    checkOut: `2026-02-${11 + i}`,
    guests: Math.floor(Math.random() * 4) + 1,
    hasPet: i % 2 === 0,
    status: ['confirmed','completed','cancelled'][i % 3],
    price: 50000 + i * 5000,
    customerInfo: { 
      name: `고객${i+1}`, 
      phone: `010-1111-22${i+1}`, 
      email: `test${i+1}@example.com` 
    },
    paymentMethod: ['card','kakao','transfer'][i % 3],
    timestamp: `2026-02-0${i+1}T10:00:00`,
    orderData: i % 2 === 0 ? [] : [{ name: '바베큐 세트', quantity: 1, price: 30000, image: 'https://via.placeholder.com/60' }]
  }));

  const [selectedReservation, setSelectedReservation] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return isNaN(date.getTime())
      ? isoString
      : date.toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = new Date(checkOut) - new Date(checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="my-reservations-page">
      <div className="reservations-header">
        <h1>전체 예약 내역</h1>
      </div>

      <div className="reservations-list">
        {reservations.map(reservation => (
          <div key={reservation.id} className="reservation-card" onClick={() => setSelectedReservation(reservation)}>
            <img src="https://via.placeholder.com/100" alt={reservation.site.name} className="reservation-image" />
            <div className="reservation-info">
              <div className="reservation-header">
                <h3>{reservation.site.name}</h3>
                <span className={`status-badge status-${reservation.status}`}>{reservation.status}</span>
              </div>
              <div className="reservation-dates">
                <span>체크인: {formatDate(reservation.checkIn)}</span>
                <span>체크아웃: {formatDate(reservation.checkOut)}</span>
              </div>
              <div className="reservation-footer">
                <span className="price">{reservation.price.toLocaleString()}원</span>
                <button className="btn-detail">상세보기</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReservation && (
        <div className="modal-overlay" onClick={() => setSelectedReservation(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-animation">
              <div className="checkmark-circle">
                <FiCheckCircle className="checkmark" />
              </div>
            </div>

            <h1>🎉 예약 상세 정보</h1>

            <div className="booking-number-card">
              <span className="label">예약 번호</span>
              <span className="booking-number">CAMP{Date.now().toString().slice(-8)}</span>
            </div>

            <div className="reservation-info-card">
              <h2>📋 예약 정보</h2>
              <div className="site-summary">
                <h3>{selectedReservation.site.name}</h3>
                <p className="site-description">{selectedReservation.site.description}</p>
              </div>
              <div className="booking-details-grid">
                <div className="detail-card">
                  <FiCalendar className="icon" />
                  <div className="detail-content">
                    <span className="label">체크인</span>
                    <strong>{formatDate(selectedReservation.checkIn)}</strong>
                    <span className="time">14:00</span>
                  </div>
                </div>
                <div className="detail-card">
                  <FiCalendar className="icon" />
                  <div className="detail-content">
                    <span className="label">체크아웃</span>
                    <strong>{formatDate(selectedReservation.checkOut)}</strong>
                    <span className="time">12:00</span>
                  </div>
                </div>
                <div className="detail-card">
                  <div className="icon-text">🏕️</div>
                  <div className="detail-content">
                    <span className="label">숙박 기간</span>
                    <strong>{calculateNights(selectedReservation.checkIn, selectedReservation.checkOut)}박 {calculateNights(selectedReservation.checkIn, selectedReservation.checkOut) + 1}일</strong>
                  </div>
                </div>
                <div className="detail-card">
                  <div className="icon-text">👥</div>
                  <div className="detail-content">
                    <span className="label">인원</span>
                    <strong>{selectedReservation.guests}명</strong>
                  </div>
                </div>
              </div>

              {selectedReservation.hasPet && <div className="pet-info"><span>🐕 반려동물 동반</span></div>}

              <div className="customer-details">
                <h4>예약자 정보</h4>
                <div className="info-grid">
                  <div className="info-item"><span className="label">이름</span><span className="value">{selectedReservation.customerInfo.name}</span></div>
                  <div className="info-item"><span className="label">연락처</span><span className="value">{selectedReservation.customerInfo.phone}</span></div>
                  <div className="info-item"><span className="label">이메일</span><span className="value">{selectedReservation.customerInfo.email}</span></div>
                </div>
              </div>

              {selectedReservation.site.location && (
                <div className="location-info">
                  <FiMapPin />
                  <span>{selectedReservation.site.location.address}</span>
                </div>
              )}
            </div>

            {selectedReservation.orderData && selectedReservation.orderData.length > 0 && (
              <div className="order-info-card">
                <h2>🛒 주문 내역</h2>
                <div className="order-items">
                  {selectedReservation.orderData.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>{item.quantity}개 × {item.price.toLocaleString()}원</p>
                      </div>
                      <span className="item-total">{(item.price * item.quantity).toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn-close" onClick={() => setSelectedReservation(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReservations;