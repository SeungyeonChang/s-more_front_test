// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../contexts/CartContext';
// import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
// import '../../styles/Cart.css';

// const Cart = () => {
//   const { cartItems, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert('장바구니가 비어있습니다.');
//       return;
//     }
//     alert('주문이 완료되었습니다!');
//     // clearCart();
//     navigate('/menues/book');
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="cart-page">
//         <div className="container">
//           <div className="empty-cart">
//             <FiShoppingCart size={80} />
//             <h2>장바구니가 비어있습니다</h2>
//             <p>메뉴를 둘러보고 맛있는 음식을 주문해보세요!</p>
//             <button className="btn btn-primary" onClick={() => navigate('/menu')}>
//               메뉴 보러가기
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="container">
//         <div className="cart-header">
//           <h1>장바구니</h1>
//           <button className="btn btn-outline" onClick={clearCart}>
//             <FiTrash2 />
//             전체 삭제
//           </button>
//         </div>

//         <div className="cart-content">
//           <div className="cart-items">
//             {cartItems.map(item => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.image} alt={item.name} />
//                 <div className="item-info">
//                   <h3>{item.name}</h3>
//                   <p>{item.description}</p>
//                   <span className="item-price">
//                     ₩{item.price.toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="item-controls">
//                   <div className="quantity-control">
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>
//                   <div className="item-total">
//                     ₩{(item.price * item.quantity).toLocaleString()}
//                   </div>
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeFromCart(item.id)}
//                   >
//                     <FiTrash2 />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h2>주문 요약</h2>
//             <div className="summary-row">
//               <span>상품 금액</span>
//               <span>₩{totalAmount.toLocaleString()}</span>
//             </div>
//             <div className="summary-row">
//               <span>배송비</span>
//               <span>무료</span>
//             </div>
//             <div className="summary-total">
//               <span>총 결제 금액</span>
//               <strong>₩{totalAmount.toLocaleString()}</strong>
//             </div>
//             <button className="btn btn-primary btn-block" onClick={handleCheckout}>
//               주문하기
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import PointReward from '../../components/common/PointReward';
import '../../styles/Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const [userGrade] = React.useState('일반'); // AuthContext에서 가져오기

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    navigate('/menues/book');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart-container">
            <div className="empty-cart-icon">
              <FiShoppingCart size={120} />
            </div>
            <h2>장바구니가 비어있습니다</h2>
            <p>맛있는 메뉴를 장바구니에 담아보세요!</p>
            <button className="btn btn-primary btn-large" onClick={() => navigate('/menu')}>
              메뉴 둘러보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <div className="cart-header-left">
            <button className="btn-back" onClick={() => navigate('/menu')}>
              <FiArrowLeft />
            </button>
            <h1>장바구니</h1>
          </div>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            <FiTrash2 />
            전체 삭제
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h3>주문 상품 ({cartItems.length})</h3>
            </div>
            
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-description">{item.description}</p>
                  <div className="cart-item-price-info">
                    <span className="unit-price">{item.price.toLocaleString()}원</span>
                    <span className="separator">×</span>
                    <span className="quantity">{item.quantity}</span>
                  </div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-control-group">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  
                  <div className="item-total-price">
                    {(item.price * item.quantity).toLocaleString()}원
                  </div>
                  
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash2 />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3>결제 정보</h3>
              
              <div className="summary-row">
                <span>상품 금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
              <div className="summary-row">
                <span>배송비</span>
                <span className="free">무료</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>총 결제 금액</span>
                <strong>{totalAmount.toLocaleString()}원</strong>
              </div>

              <PointReward totalPrice={totalAmount} userGrade={userGrade} />

              <button 
                className="btn btn-primary btn-block btn-large btn-checkout"
                onClick={handleCheckout}
              >
                {totalAmount.toLocaleString()}원 주문하기
              </button>
            </div>

            <div className="info-card">
              <h4>💡 주문 안내</h4>
              <ul>
                <li>배송은 캠핑장 체크인 시간에 맞춰 진행됩니다</li>
                <li>냉장/냉동 제품은 아이스박스에 담아 배송됩니다</li>
                <li>결제 후 1시간 이내 취소 가능합니다</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
