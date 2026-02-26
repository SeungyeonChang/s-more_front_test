// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-section">
//           <h3>캠핑장</h3>
//           <p>자연과 함께하는 힐링 캠핑</p>
//           <div className="social-links">
//             <a href="#" aria-label="Facebook">📘</a>
//             <a href="#" aria-label="Instagram">📷</a>
//             <a href="#" aria-label="YouTube">📺</a>
//           </div>
//         </div>

//         <div className="footer-section">
//           <h4>바로가기</h4>
//           <Link to="/sites">사이트 예약</Link>
//           <Link to="/menu">메뉴 주문</Link>
//           <Link to="/support">고객센터</Link>
//           <Link to="/community">커뮤니티</Link>
//           <Link to="/visiting-info">오시는 길</Link>
//         </div>

//         <div className="footer-section">
//           <h4>고객지원</h4>
//           <Link to="/support">공지사항</Link>
//           <Link to="/support">FAQ</Link>
//           <Link to="/support">이용약관</Link>
//           <Link to="/support">개인정보처리방침</Link>
//         </div>

//         <div className="footer-section">
//           <h4>연락처</h4>
//           <div className="contact-item">
//             <FiPhone />
//             <span>1588-0000</span>
//           </div>
//           <div className="contact-item">
//             <FiMail />
//             <span>support@camping.com</span>
//           </div>
//           <div className="contact-item">
//             <FiMapPin />
//             <span>서울시 강남구 테헤란로 123</span>
//           </div>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>&copy; 2026 캠핑장. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiMap } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  /**
   * 📌 캠핑장 지도 열기
   */
  const handleOpenMap = () => {
    // 실제 캠핑장 위치로 변경 필요
    const campingLocation = {
      lat: 37.5665,
      lng: 126.9780,
      name: "S'MORE 캠핑장"
    };

    // 구글 지도 열기
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${campingLocation.lat},${campingLocation.lng}`,
      '_blank'
    );
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 회사 정보 */}
        <div className="footer-section">
          <h3>S'MORE</h3>
          <p>자연과 함께하는<br />힐링 캠핑</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="YouTube">📺</a>
            <a href="#" aria-label="KakaoTalk">💬</a>
          </div>
        </div>

        {/* 빠른 링크 */}
        <div className="footer-section">
          <h4>빠른 링크</h4>
          <Link to="/sites">예약하기</Link>
          <Link to="/menues">매점</Link>
          <Link to="/facilities">내부시설</Link>
          <Link to="/community">커뮤니티</Link>
          <Link to="/about">소개</Link>
        </div>

        {/* 고객 지원 */}
        <div className="footer-section">
          <h4>고객 지원</h4>
          <Link to="/faq">자주 묻는 질문</Link>
          <Link to="/notice">공지사항</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
        </div>

        {/* 연락처 */}
        <div className="footer-section">
          <h4>연락처</h4>
          <div className="contact-item">
            <FiPhone />
            <span>1588-0000</span>
          </div>
          <div className="contact-item">
            <FiMail />
            <span>info@smore-camping.com</span>
          </div>
          <div className="contact-item">
            <FiMapPin />
            <span>서울특별시 강남구<br />캠핑로 123</span>
          </div>

          {/* ✅ 캠핑장 지도 버튼 추가 */}
          <button className="map-button" onClick={handleOpenMap}>
            <FiMap />
            <span>캠핑장 지도 보기</span>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 S'MORE Camping. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
