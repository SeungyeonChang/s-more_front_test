// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { useCart } from '../../contexts/CartContext';
// import { FiMenu, FiX, FiShoppingCart, FiUser, FiBell } from 'react-icons/fi';
// import './Header.css';

// const Header = () => {
//   const { isAuthenticated, user, logout } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setMenuOpen(false);
//   };

//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link to="/" className="logo">
//           <span className="logo-icon">🏕️</span>
//           <span className="logo-text">캠핑장</span>
//         </Link>

//         <nav className={`nav ${menuOpen ? 'active' : ''}`}>
//           <Link to="/sites" onClick={() => setMenuOpen(false)}>예약</Link>
//           <Link to="/menu" onClick={() => setMenuOpen(false)}>메뉴</Link>
//           <Link to="/ai-hub" onClick={() => setMenuOpen(false)}>AI 추천</Link>
//           <Link to="/movies" onClick={() => setMenuOpen(false)}>영화</Link>
//           <Link to="/game" onClick={() => setMenuOpen(false)}>게임</Link>
//           <Link to="/community" onClick={() => setMenuOpen(false)}>커뮤니티</Link>
//         </nav>

//         <div className="header-actions">
//           <Link to="/notifications" className="icon-btn">
//             <FiBell />
//             <span className="badge">3</span>
//           </Link>
          
//           <Link to="/menu" className="icon-btn cart-btn">
//             <FiShoppingCart />
//             {cartItems.length > 0 && (
//               <span className="badge">{cartItems.length}</span>
//             )}
//           </Link>

//           {isAuthenticated ? (
//             <div className="user-menu">
//               <button className="user-btn">
//                 <FiUser />
//                 <span>{user?.name}</span>
//               </button>
//               <div className="dropdown">
//                 <Link to="/mypage">마이페이지</Link>
//                 <Link to="/mypage/activity">활동 내역</Link>
//                 <Link to="/mypage/settings">설정</Link>
//                 <button onClick={handleLogout}>로그아웃</button>
//               </div>
//             </div>
//           ) : (
//             // <Link to="/auth" className="btn btn-primary">로그인</Link>
//             <Link to="/login" className="btn btn-primary">로그인</Link>
//           )}

//           <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FiX /> : <FiMenu />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiBell } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* 로고 */}
        <Link to="/" className="logo">
          <span className="logo-icon">🏕️</span>
          <span className="logo-text">S'MORE</span>
        </Link>

        {/* 네비게이션 */}
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/sites" onClick={() => setMenuOpen(false)}>예약</Link>
          <Link to="/menu" onClick={() => setMenuOpen(false)}>매점</Link>
          <Link to="/facilities" onClick={() => setMenuOpen(false)}>내부시설</Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>커뮤니티</Link>
        </nav>

        {/* 액션 버튼들 */}
        <div className="header-actions">
          {/* 알림 */}
          <button className="icon-btn" title="알림">
            <FiBell />
            {/* <span className="badge">3</span> */}
          </button>

          {/* 장바구니 */}
          <Link to="/cart" className="icon-btn" title="장바구니">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>

          {/* 사용자 메뉴 */}
          {isAuthenticated ? (
            <div className="user-menu">
              <button className="user-btn">
                <FiUser />
                <span>{user?.name || '사용자'}</span>
              </button>
              <div className="dropdown">
                <Link to="/mypage">마이페이지</Link>
                <Link to="/mypage/reservations">예약 내역</Link>
                <Link to="/mypage/benefits">혜택</Link>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="user-btn">
              <FiUser />
              <span>로그인</span>
            </Link>
          )}

          {/* 모바일 메뉴 토글 */}
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
