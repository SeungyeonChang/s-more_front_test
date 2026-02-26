import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiArrowLeft, FiCreditCard, FiLock } from 'react-icons/fi';
import { SiKakaotalk } from 'react-icons/si';
import PointReward from '../../components/common/PointReward';
import '../../styles/MenuBooking.css';

const MenuBooking = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [userGrade] = useState('일반');
  const [paymentMethod, setPaymentMethod] = useState('card');
  // const [orderId] = useState(`ORDER_${Date.now()}`);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // if (cartItems.length === 0) {
    //   alert('장바구니가 비어있습니다.');
    //   navigate('/cart');
    // }
  }, [cartItems, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);

    // 결제 처리 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderData = {
      // id: orderId,
      items: [...cartItems],
      totalAmount,
      userGrade,
      expectedPoints: Math.floor(totalAmount * (userGrade === 'vip' ? 0.10 : 0.05)),
      paymentMethod,
      timestamp: new Date().toISOString(),
      status: 'preparing'
    };
    
    localStorage.setItem('latestOrder', JSON.stringify(orderData));
    clearCart();
    setIsProcessing(false);
    navigate('/menues/payment/complete');
    // navigate('/menues/payment/complete', { state: { orderId } });
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-header-top">
          <button className="btn-back" onClick={() => navigate('/cart')}>
            <FiArrowLeft />
            뒤로가기
          </button>
          <div className="secure-badge">
            <FiLock />
            <span>안전한 결제</span>
          </div>
        </div>

        <div className="payment-header">
          <h1>결제하기</h1>
          {/* <p className="order-number">주문번호: {orderId}</p> */}
        </div>

        <div className="payment-content">
          <div className="payment-left">
            <div className="order-summary-card">
              <h2>주문 내역</h2>
              <div className="order-items-list">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item-row">
                    <div className="order-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.quantity}개</p>
                    </div>
                    <div className="order-item-price">
                      {(item.price * item.quantity).toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-summary-total">
                <div className="summary-row">
                  <span>상품 금액</span>
                  <span>{totalAmount.toLocaleString()}원</span>
                </div>
                <div className="summary-row">
                  <span>배송비</span>
                  <span className="free">무료</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row final">
                  <span>최종 결제 금액</span>
                  <strong>{totalAmount.toLocaleString()}원</strong>
                </div>
              </div>

              <PointReward totalPrice={totalAmount} userGrade={userGrade} />
            </div>
          </div>

          <div className="payment-right">
            <div className="payment-method-card">
              <h2>결제 수단</h2>
              <div className="payment-method-tabs">
                <button 
                  className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FiCreditCard />
                  <span>신용/체크카드</span>
                </button>
                <button 
                  className={`method-tab ${paymentMethod === 'kakao' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('kakao')}
                >
                  <SiKakaotalk />
                  <span>카카오페이</span>
                </button>
                <button 
                  className={`method-tab ${paymentMethod === 'toss' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('toss')}
                >
                  💙
                  <span>토스</span>
                </button>
              </div>

              <div className="payment-form-container">
                {paymentMethod === 'card' && (
                  <div className="card-payment-form">
                    <div className="form-group">
                      <label>카드 번호</label>
                      <input 
                        type="text" 
                        placeholder="1234-5678-9012-3456" 
                        maxLength="19"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>유효기간</label>
                        <input type="text" placeholder="MM/YY" maxLength="5" />
                      </div>
                      <div className="form-group">
                        <label>CVC</label>
                        <input type="password" placeholder="***" maxLength="3" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>카드 소유자명</label>
                      <input type="text" placeholder="홍길동" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'kakao' && (
                  <div className="simple-payment-info">
                    <div className="kakao-logo">
                      <SiKakaotalk size={64} />
                    </div>
                    <h3>카카오페이</h3>
                    <p>결제하기 버튼을 클릭하면<br/>카카오페이 앱으로 이동합니다</p>
                  </div>
                )}

                {paymentMethod === 'toss' && (
                  <div className="simple-payment-info">
                    <div className="toss-logo">
                      💙
                    </div>
                    <h3>토스페이</h3>
                    <p>결제하기 버튼을 클릭하면<br/>토스 앱으로 이동합니다</p>
                  </div>
                )}
              </div>

              <button 
                className="btn btn-primary btn-block btn-large btn-payment"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="processing">
                    <span className="spinner"></span>
                    결제 처리중...
                  </span>
                ) : (
                  `${totalAmount.toLocaleString()}원 결제하기`
                )}
              </button>

              <div className="payment-notice">
                <p>🔒 안전한 결제를 위해 SSL 보안이 적용되었습니다</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBooking;
