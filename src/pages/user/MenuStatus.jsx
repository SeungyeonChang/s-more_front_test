import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/MenuStatus.css';

const MenuStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('preparing');

  const statusStages = [
    { id: 'preparing', label: '상품 준비중', icon: '🍳' },
    { id: 'shipping', label: '배송 시작', icon: '🚚' },
    { id: 'delivered', label: '배송 완료', icon: '✅' }
  ];

  useEffect(() => {
    const latestOrder = localStorage.getItem('latestOrder');
    if (latestOrder) {
      const orderData = JSON.parse(latestOrder);
      setOrder(orderData);
      setCurrentStatus(orderData.status || 'preparing');
    } else {
      navigate('/menu');
    }
  }, [navigate]);

  const updateStatus = (newStatus) => {
    setCurrentStatus(newStatus);
    if (order) {
      order.status = newStatus;
      localStorage.setItem('latestOrder', JSON.stringify(order));
    }
  };

  if (!order) return <div>로딩중...</div>;

  return (
    <div className="order-status-page">
      <div className="container">
        <div className="status-header">
          <h1>주문상태 확인</h1>
          <p>주문번호: {order.id}</p>
        </div>

        <div className="status-timeline">
          {statusStages.map((stage, index) => (
            <div 
              key={stage.id} 
              className={`status-stage ${currentStatus === stage.id ? 'active' : ''} ${currentStatus === stage.id && index < statusStages.length - 1 ? 'completed' : ''}`}
            >
              <div className="status-icon">{stage.icon}</div>
              <div className="status-label">{stage.label}</div>
              {index < statusStages.length - 1 && (
                <div className={`status-line ${currentStatus !== 'preparing' ? 'completed' : ''}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="status-actions">
          {currentStatus === 'preparing' && (
            <button 
              className="btn btn-primary" 
              onClick={() => updateStatus('shipping')}
            >
              배송 시작
            </button>
          )}
          {currentStatus === 'shipping' && (
            <button 
              className="btn btn-primary" 
              onClick={() => updateStatus('delivered')}
            >
              배송 완료
            </button>
          )}
          {currentStatus === 'delivered' && (
            <button className="btn btn-success" disabled>
              완료
            </button>
          )}
        </div>

        <div className="status-details">
          <h3>주문 상세</h3>
          <div className="order-items">
            {order.items.map(item => (
              <div key={item.id} className="status-item">
                <span>{item.name} x{item.quantity}</span>
                <span>{(item.price * item.quantity).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div className="total-row">
            <span>총 결제금액</span>
            <strong>{order.totalAmount.toLocaleString()}원</strong>
          </div>
          <div className="points-row">
            <span>적립포인트</span>
            <strong>{order.expectedPoints.toLocaleString()}P</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuStatus;
