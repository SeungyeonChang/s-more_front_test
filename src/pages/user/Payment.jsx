// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from '../../contexts/CartContext';
// import { FiCreditCard, FiDollarSign, FiSmartphone, FiCheck } from 'react-icons/fi';
// import '../../styles/Payment.css';

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems, totalAmount, clearCart } = useCart();
  
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     cardNumber: '',
//     expiry: '',
//     cvc: '',
//     installment: '0'
//   });

//   // 예약 정보 (SiteDetail에서 전달)
//   const reservationData = location.state;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handlePayment = () => {
//     if (!agreeTerms) {
//       alert('결제 약관에 동의해주세요.');
//       return;
//     }

//     if (!formData.name || !formData.phone || !formData.email) {
//       alert('모든 정보를 입력해주세요.');
//       return;
//     }

//     // 결제 처리 로직
//     setTimeout(() => {
//       clearCart();
//       navigate('/booking-complete', {
//         state: {
//           type: cartItems.length > 0 ? 'order' : 'reservation',
//           reservationData,
//           orderData: cartItems,
//           totalAmount: cartItems.length > 0 ? totalAmount : reservationData?.site?.price,
//           paymentMethod
//         }
//       });
//     }, 1000);
//   };

//   const calculateTotal = () => {
//     if (cartItems.length > 0) {
//       return totalAmount;
//     }
//     if (reservationData?.site) {
//       const nights = Math.ceil(
//         (reservationData.checkOut - reservationData.checkIn) / (1000 * 60 * 60 * 24)
//       );
//       return reservationData.site.price * nights;
//     }
//     return 0;
//   };

//   return (
//     <div className="payment-page">
//       <div className="container">
//         <h1>결제하기</h1>
        
//         <div className="payment-container">
//           {/* Payment Form */}
//           <div className="payment-form">
//             {/* Customer Info */}
//             <section className="payment-section">
//               <h2>주문자 정보</h2>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>이름</label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="이름을 입력하세요"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>전화번호</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="010-0000-0000"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group full-width">
//                   <label>이메일</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="email@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Payment Method */}
//             <section className="payment-section">
//               <h2>결제 수단</h2>
//               <div className="payment-methods">
//                 <button
//                   className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
//                   onClick={() => setPaymentMethod('card')}
//                 >
//                   <FiCreditCard />
//                   <span>신용/체크카드</span>
//                 </button>
//                 <button
//                   className={`payment-method-btn ${paymentMethod === 'transfer' ? 'active' : ''}`}
//                   onClick={() => setPaymentMethod('transfer')}
//                 >
//                   <FiDollarSign />
//                   <span>계좌이체</span>
//                 </button>
//                 <button
//                   className={`payment-method-btn ${paymentMethod === 'simple' ? 'active' : ''}`}
//                   onClick={() => setPaymentMethod('simple')}
//                 >
//                   <FiSmartphone />
//                   <span>간편결제</span>
//                 </button>
//               </div>

//               {paymentMethod === 'card' && (
//                 <div className="card-form">
//                   <div className="form-group">
//                     <label>카드번호</label>
//                     <input
//                       type="text"
//                       name="cardNumber"
//                       placeholder="0000-0000-0000-0000"
//                       maxLength="19"
//                       value={formData.cardNumber}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label>유효기간</label>
//                       <input
//                         type="text"
//                         name="expiry"
//                         placeholder="MM/YY"
//                         maxLength="5"
//                         value={formData.expiry}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>CVC</label>
//                       <input
//                         type="text"
//                         name="cvc"
//                         placeholder="000"
//                         maxLength="3"
//                         value={formData.cvc}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group">
//                     <label>할부</label>
//                     <select name="installment" value={formData.installment} onChange={handleChange}>
//                       <option value="0">일시불</option>
//                       <option value="2">2개월</option>
//                       <option value="3">3개월</option>
//                       <option value="6">6개월</option>
//                       <option value="12">12개월</option>
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {paymentMethod === 'transfer' && (
//                 <div className="transfer-info">
//                   <p>입금 계좌: 국민은행 123-456-789012</p>
//                   <p>예금주: (주)캠핑장</p>
//                   <p className="notice">* 입금 확인 후 예약이 확정됩니다.</p>
//                 </div>
//               )}

//               {paymentMethod === 'simple' && (
//                 <div className="simple-payment-options">
//                   <button className="simple-btn kakao">카카오페이</button>
//                   <button className="simple-btn naver">네이버페이</button>
//                   <button className="simple-btn toss">토스</button>
//                 </div>
//               )}
//             </section>

//             {/* Agreement */}
//             <section className="payment-section">
//               <div className="agreement">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={agreeTerms}
//                     onChange={(e) => setAgreeTerms(e.target.checked)}
//                   />
//                   <span>결제 진행을 위한 개인정보 제공 및 결제대행 서비스 이용약관에 동의합니다.</span>
//                 </label>
//               </div>
//               <button 
//                 className="btn btn-primary btn-block btn-lg"
//                 onClick={handlePayment}
//               >
//                 {calculateTotal().toLocaleString()}원 결제하기
//               </button>
//             </section>
//           </div>

//           {/* Order Summary */}
//           <aside className="order-summary">
//             <h2>주문 내역</h2>
            
//             {/* Reservation Info */}
//             {reservationData?.site && (
//               <div className="summary-section">
//                 <h3>예약 정보</h3>
//                 <div className="summary-item">
//                   <span>사이트</span>
//                   <span>{reservationData.site.name}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>체크인</span>
//                   <span>{reservationData.checkIn?.toLocaleDateString('ko-KR')}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>체크아웃</span>
//                   <span>{reservationData.checkOut?.toLocaleDateString('ko-KR')}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>숙박</span>
//                   <span>
//                     {Math.ceil((reservationData.checkOut - reservationData.checkIn) / (1000 * 60 * 60 * 24))}박
//                   </span>
//                 </div>
//                 <div className="summary-item">
//                   <span>인원</span>
//                   <span>{reservationData.guests}명</span>
//                 </div>
//               </div>
//             )}

//             {/* Cart Items */}
//             {cartItems.length > 0 && (
//               <div className="summary-section">
//                 <h3>주문 상품</h3>
//                 {cartItems.map(item => (
//                   <div key={item.id} className="summary-item">
//                     <div>
//                       <div>{item.name}</div>
//                       <div className="item-quantity">{item.quantity}개</div>
//                     </div>
//                     <span>{(item.price * item.quantity).toLocaleString()}원</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Price Breakdown */}
//             <div className="summary-section">
//               <h3>결제 금액</h3>
//               <div className="summary-item">
//                 <span>상품 금액</span>
//                 <span>{calculateTotal().toLocaleString()}원</span>
//               </div>
//               <div className="summary-item">
//                 <span>할인</span>
//                 <span className="discount">-0원</span>
//               </div>
//               <div className="summary-total">
//                 <span>총 결제 금액</span>
//                 <span className="total-amount">{calculateTotal().toLocaleString()}원</span>
//               </div>
//             </div>

//             {/* Benefits */}
//             <div className="benefits">
//               <div className="benefit-item">
//                 <FiCheck />
//                 <span>안전한 결제 시스템</span>
//               </div>
//               <div className="benefit-item">
//                 <FiCheck />
//                 <span>무료 취소 (3일 전)</span>
//               </div>
//               <div className="benefit-item">
//                 <FiCheck />
//                 <span>포인트 적립 가능</span>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiDollarSign, FiSmartphone, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { SiKakaotalk } from 'react-icons/si';
import '../../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    installment: '0'
  });

  // ✅ 예약 정보 안전하게 처리
  const reservationData = location.state || {};

  // ✅ 날짜 변환 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      // 문자열을 Date 객체로 변환
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // 변환 실패시 원본 반환
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  // ✅ 박수 계산
  const calculateNights = () => {
    if (!reservationData.checkIn || !reservationData.checkOut) return 0;
    try {
      const checkIn = new Date(reservationData.checkIn);
      const checkOut = new Date(reservationData.checkOut);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (error) {
      return 0;
    }
  };

  const nights = calculateNights();

  // ✅ 총 금액 계산
  const calculateTotal = () => {
    if (!reservationData.priceInfo) return 0;
    return reservationData.priceInfo.total || 0;
  };

  const totalAmount = calculateTotal();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!agreeTerms) {
      alert('결제 약관에 동의해주세요.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiry || !formData.cvc) {
        alert('카드 정보를 모두 입력해주세요.');
        return;
      }
    }

    setIsProcessing(true);

    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    const paymentData = {
      type: 'reservation',
      reservationData,
      totalAmount,
      paymentMethod,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('latestPayment', JSON.stringify(paymentData));

    setIsProcessing(false);
    navigate('/booking-complete', { state: paymentData });
  };

  // ✅ 예약 정보 없으면 리다이렉트
  if (!reservationData.site) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="error-container">
            <h2>❌ 예약 정보가 없습니다</h2>
            <p>캠핑장을 선택하고 예약해주세요.</p>
            <button className="btn btn-primary" onClick={() => navigate('/booking')}>
              캠핑장 둘러보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-header-top">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            뒤로가기
          </button>
        </div>

        <div className="payment-header">
          <h1>결제하기</h1>
          <p>안전하고 편리한 결제를 진행하세요</p>
        </div>

        <div className="payment-content">
          {/* 왼쪽: 예약 정보 */}
          <div className="payment-left">
            <div className="reservation-summary">
              <h2>🏕️ 예약 정보</h2>
              
              <div className="site-info-card">
                <h3>{reservationData.site.name}</h3>
                <p className="site-description">{reservationData.site.description}</p>
                
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">체크인</span>
                    <span className="value">{formatDate(reservationData.checkIn)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">체크아웃</span>
                    <span className="value">{formatDate(reservationData.checkOut)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">숙박 기간</span>
                    <span className="value">{nights}박 {nights + 1}일</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">인원</span>
                    <span className="value">{reservationData.guests}명</span>
                  </div>
                  {reservationData.hasPet && (
                    <div className="detail-row">
                      <span className="label">반려동물</span>
                      <span className="value">🐕 동반</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="customer-info-card">
                <h3>👤 예약자 정보</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="label">이름</span>
                    <span className="value">{reservationData.customerInfo?.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">연락처</span>
                    <span className="value">{reservationData.customerInfo?.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">이메일</span>
                    <span className="value">{reservationData.customerInfo?.email || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="price-breakdown">
                <h3>💰 결제 금액</h3>
                <div className="price-row">
                  <span>기본 요금 ({nights}박)</span>
                  <span>{reservationData.priceInfo?.basePrice?.toLocaleString()}원</span>
                </div>
                {reservationData.priceInfo?.extraPersonPrice > 0 && (
                  <div className="price-row extra">
                    <span>추가 인원</span>
                    <span>+{reservationData.priceInfo.extraPersonPrice.toLocaleString()}원</span>
                  </div>
                )}
                {reservationData.priceInfo?.petPrice > 0 && (
                  <div className="price-row pet">
                    <span>반려동물</span>
                    <span>+{reservationData.priceInfo.petPrice.toLocaleString()}원</span>
                  </div>
                )}
                <div className="price-divider"></div>
                <div className="price-row total">
                  <strong>총 결제 금액</strong>
                  <strong>{totalAmount.toLocaleString()}원</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 결제 수단 */}
          <div className="payment-right">
            <div className="payment-method-card">
              <h2>결제 수단 선택</h2>
              
              <div className="payment-methods">
                <button
                  className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FiCreditCard />
                  <span>신용/체크카드</span>
                </button>
                <button
                  className={`method-btn ${paymentMethod === 'kakao' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('kakao')}
                >
                  <SiKakaotalk />
                  <span>카카오페이</span>
                </button>
                <button
                  className={`method-btn ${paymentMethod === 'toss' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('toss')}
                >
                  💙
                  <span>토스</span>
                </button>
                <button
                  className={`method-btn ${paymentMethod === 'transfer' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <FiDollarSign />
                  <span>계좌이체</span>
                </button>
              </div>

              {/* 결제 폼 */}
              <div className="payment-form">
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>카드 번호</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234-5678-9012-3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        maxLength="19"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>유효기간</label>
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          maxLength="5"
                        />
                      </div>
                      <div className="form-group">
                        <label>CVC</label>
                        <input
                          type="password"
                          name="cvc"
                          placeholder="***"
                          value={formData.cvc}
                          onChange={handleChange}
                          maxLength="3"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>할부</label>
                      <select
                        name="installment"
                        value={formData.installment}
                        onChange={handleChange}
                      >
                        <option value="0">일시불</option>
                        <option value="3">3개월</option>
                        <option value="6">6개월</option>
                        <option value="12">12개월</option>
                      </select>
                    </div>
                  </div>
                )}

                {paymentMethod === 'kakao' && (
                  <div className="simple-payment-info">
                    <SiKakaotalk size={80} color="#FEE500" />
                    <h3>카카오페이</h3>
                    <p>결제 버튼을 누르면<br/>카카오페이 앱으로 이동합니다</p>
                  </div>
                )}

                {paymentMethod === 'toss' && (
                  <div className="simple-payment-info">
                    <div className="toss-logo">💙</div>
                    <h3>토스</h3>
                    <p>결제 버튼을 누르면<br/>토스 앱으로 이동합니다</p>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="transfer-info">
                    <h3>계좌 정보</h3>
                    <div className="account-info">
                      <p><strong>은행:</strong> 국민은행</p>
                      <p><strong>계좌번호:</strong> 123-456-789012</p>
                      <p><strong>예금주:</strong> (주)캠핑장</p>
                    </div>
                    <p className="transfer-notice">
                      * 입금 확인 후 예약이 확정됩니다
                    </p>
                  </div>
                )}
              </div>

              {/* 약관 동의 */}
              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>결제 약관 및 개인정보 처리방침에 동의합니다</span>
                </label>
              </div>

              {/* 결제 버튼 */}
              <button
                className="payment-btn"
                onClick={handlePayment}
                disabled={!agreeTerms || isProcessing}
              >
                {isProcessing ? (
                  <span className="processing">
                    <span className="spinner"></span>
                    결제 처리중...
                  </span>
                ) : (
                  <>
                    <FiCheck />
                    {totalAmount.toLocaleString()}원 결제하기
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
