// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import PointReward from '../../components/common/PointReward';
// // import '../../styles/MenuPaymentComplete.css';

// const MenuPaymentComplete = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const latestOrder = localStorage.getItem('latestOrder');
//     if (latestOrder) {
//       setOrder(JSON.parse(latestOrder));
//     } else {
//       navigate('/cart');
//     }
//   }, [navigate]);

//   if (!order) return <div>로딩중...</div>;

//   const goToStatus = () => {
//     navigate('/order-status', { state: { orderId: order.id } });
//   };

//   return (
//     <div className="payment-complete-page">
//       <div className="container">
//         <div className="complete-header">
//           <div className="success-icon">✓</div>
//           <h1>결제 완료!</h1>
//           <p>주문이 성공적으로 접수되었습니다.</p>
//           <p className="order-id">주문번호: {order.id}</p>
//         </div>

//         <div className="complete-summary">
//           <div className="summary-item">
//             <span>결제 금액</span>
//             <strong>{order.totalAmount.toLocaleString()}원</strong>
//           </div>
//           <PointReward 
//             totalPrice={order.totalAmount} 
//             userGrade={order.userGrade}
//           />
//         </div>

//         <div className="complete-actions">
//           <button className="btn btn-primary btn-large" onClick={goToStatus}>
//             주문상태 확인하기
//           </button>
//           <button className="btn btn-secondary" onClick={() => navigate('/menu')}>
//             메뉴 주문하기
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuPaymentComplete;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiFileText } from 'react-icons/fi';
import PointReward from '../../components/common/PointReward';
import '../../styles/MenuPaymentComplete.css';

const MenuPaymentComplete = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderId] = useState(`ORDER_${Date.now()}`)

  useEffect(() => {
    const latestOrder = localStorage.getItem('latestOrder');
    if (latestOrder) {
      setOrder(JSON.parse(latestOrder));
    } else {
      navigate('/cart');
    }
  }, [navigate]);

  if (!order) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>주문 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="payment-complete-page">
      <div className="container">
        <div className="complete-card">
          <div className="success-animation">
            <div className="checkmark-circle">
              <FiCheckCircle className="checkmark" />
            </div>
          </div>

          <h1>결제가 완료되었습니다!</h1>
          <p className="complete-subtitle">주문이 성공적으로 접수되었습니다</p>

          <div className="order-info-card">
            <div className="order-info-header">
              <h3>주문 정보</h3>
              <span className="order-id">#{orderId}</span>
            </div>
            
            <div className="order-info-body">
              <div className="info-row">
                <span className="label">주문 일시</span>
                <span className="value">
                  {new Date(order.timestamp).toLocaleString('ko-KR')}
                </span>
              </div>
              <div className="info-row">
                <span className="label">결제 금액</span>
                <span className="value price">{order.totalAmount.toLocaleString()}원</span>
              </div>
              <div className="info-row">
                <span className="label">결제 수단</span>
                <span className="value">
                  {order.paymentMethod === 'card' && '신용/체크카드'}
                  {order.paymentMethod === 'kakao' && '카카오페이'}
                  {order.paymentMethod === 'toss' && '토스'}
                </span>
              </div>
              <div className="info-row">
                <span className="label">주문 상태</span>
                <span className="value">
                  <span className="status-badge preparing">상품 준비중</span>
                </span>
              </div>
            </div>
          </div>

          <PointReward 
            totalPrice={order.totalAmount} 
            userGrade={order.userGrade}
          />

          <div className="order-items-summary">
            <h4>주문 상품 ({order.items.length})</h4>
            <div className="items-list-compact">
              {order.items.map(item => (
                <div key={item.id} className="item-compact">
                  <img src={item.image} alt={item.name} />
                  <div className="item-compact-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">수량: {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    {(item.price * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="btn btn-outline-primary btn-large"
              onClick={() => navigate('/mypage/orders')}
            >
              <FiFileText />
              주문내역 보기
            </button>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => navigate('/')}
            >
              <FiHome />
              홈으로
            </button>
          </div>

          <div className="complete-notice">
            <p>📧 주문 확인 메일이 발송되었습니다</p>
            <p>🚚 배송은 체크인 시간에 맞춰 진행됩니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPaymentComplete;
