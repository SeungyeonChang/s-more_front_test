// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiCheckCircle, FiCalendar, FiMapPin, FiMail, FiDownload } from 'react-icons/fi';
// import '../../styles/BookingComplete.css';

// const BookingComplete = () => {
//   const location = useLocation();
//   const data = location.state || {};
  
//   const bookingNumber = `CAMP${Date.now().toString().slice(-8)}`;

//   return (
//     <div className="booking-complete-page">
//       <div className="container">
//         <div className="complete-card">
//           <div className="success-icon">
//             <FiCheckCircle />
//           </div>
          
//           <h1>
//             {data.type === 'order' ? '주문이 완료되었습니다!' : '예약이 완료되었습니다!'}
//           </h1>
//           <p className="subtitle">
//             {data.type === 'order' 
//               ? '주문하신 상품을 준비하겠습니다.' 
//               : '즐거운 캠핑 되세요!'}
//           </p>

//           <div className="booking-number">
//             <span>예약번호</span>
//             <strong>{bookingNumber}</strong>
//           </div>

//           {/* Reservation Details */}
//           {data.reservationData?.site && (
//             <div className="details-section">
//               <h2><FiCalendar /> 예약 정보</h2>
//               <div className="detail-grid">
//                 <div className="detail-item">
//                   <span className="label">사이트</span>
//                   <span className="value">{data.reservationData.site.name}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="label">체크인</span>
//                   <span className="value">
//                     {data.reservationData.checkIn?.toLocaleDateString('ko-KR')} 14:00
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="label">체크아웃</span>
//                   <span className="value">
//                     {data.reservationData.checkOut?.toLocaleDateString('ko-KR')} 12:00
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="label">인원</span>
//                   <span className="value">{data.reservationData.guests}명</span>
//                 </div>
//                 <div className="detail-item">
//                   <span className="label">결제 금액</span>
//                   <span className="value price">{data.totalAmount?.toLocaleString()}원</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Order Details */}
//           {data.orderData && data.orderData.length > 0 && (
//             <div className="details-section">
//               <h2>📦 주문 상품</h2>
//               <div className="order-items">
//                 {data.orderData.map(item => (
//                   <div key={item.id} className="order-item">
//                     <img src={item.image} alt={item.name} />
//                     <div className="order-item-info">
//                       <h4>{item.name}</h4>
//                       <p>{item.quantity}개 × {item.price.toLocaleString()}원</p>
//                     </div>
//                     <span className="order-item-total">
//                       {(item.price * item.quantity).toLocaleString()}원
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Checklist */}
//           <div className="checklist-section">
//             <h2>📋 준비물 체크리스트</h2>
//             <div className="checklist">
//               <label>
//                 <input type="checkbox" />
//                 <span>텐트 및 침낭</span>
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 <span>취사도구</span>
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 <span>개인 위생용품</span>
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 <span>여벌 옷</span>
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 <span>손전등/랜턴</span>
//               </label>
//               <label>
//                 <input type="checkbox" />
//                 <span>구급약</span>
//               </label>
//             </div>
//           </div>

//           {/* Info Cards */}
//           <div className="info-cards">
//             <div className="info-card">
//               <FiMail />
//               <h3>예약 확인 메일</h3>
//               <p>예약 확인 메일이 발송되었습니다.</p>
//             </div>
//             <div className="info-card">
//               <FiMapPin />
//               <h3>찾아오시는 길</h3>
//               <p>강원도 홍천군 내면 광원리 123</p>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="action-buttons">
//             <button className="btn btn-outline">
//               <FiDownload />
//               예약 확인서 다운로드
//             </button>
//             <Link to="/mypage" className="btn btn-primary">
//               예약 내역 보기
//             </Link>
//             <Link to="/" className="btn btn-secondary">
//               홈으로 가기
//             </Link>
//           </div>

//           {/* Notice */}
//           <div className="notice-box">
//             <h4>⚠️ 유의사항</h4>
//             <ul>
//               <li>체크인 시간: 14:00 / 체크아웃 시간: 12:00</li>
//               <li>무료 취소는 3일 전까지 가능합니다.</li>
//               <li>정숙 시간(22:00~07:00)을 지켜주세요.</li>
//               <li>쓰레기는 지정된 장소에 분리수거 해주세요.</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingComplete;


import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiMapPin, FiMail, FiDownload, FiHome, FiFileText } from 'react-icons/fi';
import '../../styles/BookingComplete.css';

const BookingComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};
  const bookingNumber = `CAMP${Date.now().toString().slice(-8)}`;

  // ✅ 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      });
    } catch (error) {
      return dateString;
    }
  };

  // ✅ 시간 포맷 함수
  const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return isoString;
    }
  };

  // ✅ 박수 계산
  const calculateNights = () => {
    if (!data.reservationData?.checkIn || !data.reservationData?.checkOut) return 0;
    try {
      const checkIn = new Date(data.reservationData.checkIn);
      const checkOut = new Date(data.reservationData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
      return 0;
    }
  };

  const nights = calculateNights();

  // ✅ 예약 정보 없으면 리다이렉트
  if (!data.reservationData && !data.orderData) {
    return (
      <div className="booking-complete-page">
        <div className="container">
          <div className="error-container">
            <h2>❌ 예약 정보가 없습니다</h2>
            <p>잘못된 접근입니다.</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              홈으로 이동
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-complete-page">
      <div className="container">
        <div className="complete-card">
          {/* 성공 애니메이션 */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <FiCheckCircle className="checkmark" />
            </div>
          </div>

          <h1>🎉 예약이 완료되었습니다!</h1>
          <p className="complete-subtitle">
            {data.type === 'order' ? '주문하신 상품을 준비하겠습니다.' : '즐거운 캠핑 되세요!'}
          </p>

          {/* 예약 번호 */}
          <div className="booking-number-card">
            <span className="label">예약 번호</span>
            <span className="booking-number">{bookingNumber}</span>
          </div>

          {/* 예약 정보 (캠핑장 예약인 경우) */}
          {data.reservationData && (
            <div className="reservation-info-card">
              <h2>📋 예약 정보</h2>
              
              <div className="site-summary">
                <h3>{data.reservationData.site?.name || '캠핑장'}</h3>
                <p className="site-description">
                  {data.reservationData.site?.description || ''}
                </p>
              </div>

              <div className="booking-details-grid">
                <div className="detail-card">
                  <FiCalendar className="icon" />
                  <div className="detail-content">
                    <span className="label">체크인</span>
                    <strong>{formatDate(data.reservationData.checkIn)}</strong>
                    <span className="time">14:00</span>
                  </div>
                </div>

                <div className="detail-card">
                  <FiCalendar className="icon" />
                  <div className="detail-content">
                    <span className="label">체크아웃</span>
                    <strong>{formatDate(data.reservationData.checkOut)}</strong>
                    <span className="time">12:00</span>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="icon-text">🏕️</div>
                  <div className="detail-content">
                    <span className="label">숙박 기간</span>
                    <strong>{nights}박 {nights + 1}일</strong>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="icon-text">👥</div>
                  <div className="detail-content">
                    <span className="label">인원</span>
                    <strong>{data.reservationData.guests || 2}명</strong>
                  </div>
                </div>
              </div>

              {data.reservationData.hasPet && (
                <div className="pet-info">
                  <span>🐕 반려동물 동반</span>
                </div>
              )}

              <div className="customer-details">
                <h4>예약자 정보</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">이름</span>
                    <span className="value">{data.reservationData.customerInfo?.name || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">연락처</span>
                    <span className="value">{data.reservationData.customerInfo?.phone || '-'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">이메일</span>
                    <span className="value">{data.reservationData.customerInfo?.email || '-'}</span>
                  </div>
                </div>
              </div>

              {data.reservationData.site?.location && (
                <div className="location-info">
                  <FiMapPin />
                  <span>{data.reservationData.site.location.address}</span>
                </div>
              )}
            </div>
          )}

          {/* 주문 정보 (메뉴 주문인 경우) */}
          {data.orderData && data.orderData.length > 0 && (
            <div className="order-info-card">
              <h2>🛒 주문 내역</h2>
              <div className="order-items">
                {data.orderData.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.quantity}개 × {item.price?.toLocaleString()}원</p>
                    </div>
                    <span className="item-total">
                      {(item.price * item.quantity)?.toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 결제 정보 */}
          <div className="payment-summary-card">
            <h2>💳 결제 정보</h2>
            
            <div className="payment-details">
              <div className="payment-row">
                <span>결제 수단</span>
                <span className="payment-method-badge">
                  {data.paymentMethod === 'card' && '💳 신용/체크카드'}
                  {data.paymentMethod === 'kakao' && '💛 카카오페이'}
                  {data.paymentMethod === 'toss' && '💙 토스'}
                  {data.paymentMethod === 'transfer' && '🏦 계좌이체'}
                </span>
              </div>
              <div className="payment-row">
                <span>결제 일시</span>
                <span>{formatDateTime(data.timestamp)}</span>
              </div>
              <div className="payment-divider"></div>
              <div className="payment-row total">
                <strong>총 결제 금액</strong>
                <strong className="total-amount">
                  {(data.totalAmount || 0).toLocaleString()}원
                </strong>
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="notice-card">
            <FiMail className="notice-icon" />
            <div className="notice-content">
              <p><strong>예약 확인 메일이 발송되었습니다.</strong></p>
              <p>예약 상세 내역은 마이페이지에서 확인하실 수 있습니다.</p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="action-buttons">
            <button className="btn btn-outline" onClick={() => window.print()}>
              <FiDownload />
              예약 확인서 출력
            </button>
            <Link to="/mypage" className="btn btn-secondary">
              <FiFileText />
              예약 내역 보기
            </Link>
            <Link to="/" className="btn btn-primary">
              <FiHome />
              홈으로
            </Link>
          </div>

          {/* 추가 안내 */}
          <div className="additional-info">
            <h4>📌 안내 사항</h4>
            <ul>
              <li>예약 취소는 체크인 3일 전까지 가능합니다</li>
              <li>체크인 시 신분증을 지참해주세요</li>
              <li>정숙 시간(22:00~07:00)을 준수해주세요</li>
              <li>쓰레기는 반드시 분리수거 해주세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingComplete;
