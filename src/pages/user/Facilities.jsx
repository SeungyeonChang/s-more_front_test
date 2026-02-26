import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilm, FiTarget, FiMapPin, FiClock, FiPhone, FiInfo } from 'react-icons/fi';
import '../../styles/Facilities.css';

const Facilities = () => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState(null);

  /**
   * 📌 내부 시설 데이터
   */
  const facilities = [
    {
      id: 1,
      name: '영화관',
      icon: '🎬',
      description: '최신 영화를 대형 스크린으로 즐기실 수 있습니다',
      location: 'A동 1층',
      hours: '10:00 - 22:00',
      contact: '032-1234-5678',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600',
      features: ['4K 프로젝터', '돌비 사운드', '200석 규모', '간식 판매'],
      color: '#e74c3c'
    },
    {
      id: 2,
      name: '매점',
      icon: '🏪',
      description: '캠핑에 필요한 물품과 간식을 구매하실 수 있습니다',
      location: 'B동 1층',
      hours: '08:00 - 21:00',
      contact: '032-1234-5679',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600',
      features: ['캠핑용품', '식료품', '음료', '간식류'],
      color: '#3498db'
    },
    {
      id: 3,
      name: '관리사무소',
      icon: '🏛️',
      description: '예약 확인 및 각종 문의사항을 도와드립니다',
      location: '중앙광장 옆',
      hours: '24시간 운영',
      contact: '032-1234-5670',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      features: ['예약 관리', '분실물 센터', '응급처치', '24시간 상주'],
      color: '#2ecc71'
    },
    {
      id: 4,
      name: '화장실',
      icon: '🚻',
      description: '깨끗하고 편리한 화장실을 이용하실 수 있습니다',
      location: '캠핑장 곳곳',
      hours: '24시간 이용 가능',
      contact: '-',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600',
      features: ['온수 제공', '샤워실', '파우더룸', '장애인 화장실'],
      color: '#9b59b6'
    },
    {
      id: 5,
      name: '놀이터',
      icon: '🎠',
      description: '어린이를 위한 안전한 놀이 공간입니다',
      location: 'C동 야외',
      hours: '07:00 - 20:00',
      contact: '-',
      image: 'https://images.unsplash.com/photo-1587735243474-99b1f7816959?w=600',
      features: ['미끄럼틀', '그네', '시소', '모래놀이터'],
      color: '#f39c12'
    }
  ];

  /**
   * 📌 빠른 이동 버튼
   * ✅ FiGamepad → FiTarget으로 변경
   */
  const quickLinks = [
    {
      id: 'movies',
      name: '영화 예매',
      icon: <FiFilm />,
      color: '#e74c3c',
      path: '/movies'
    },
    {
      id: 'games',
      name: '게임 예약',
      icon: <FiTarget />, // ✅ 변경: FiGamepad → FiTarget
      color: '#3498db',
      path: '/games'
    }
  ];

  return (
    <div className="facilities-page">
      <div className="container">
        {/* 헤더 */}
        <div className="facilities-header">
          <h1>내부 시설 안내</h1>
          <p>캠핑장 내 다양한 편의시설을 이용해보세요</p>
        </div>

        {/* 빠른 이동 버튼 */}
        <div className="quick-links">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              className="quick-link-btn"
              style={{ borderColor: link.color }}
              onClick={() => navigate(link.path)}
            >
              <div className="quick-link-icon" style={{ background: link.color }}>
                {link.icon}
              </div>
              <span>{link.name}</span>
            </button>
          ))}
        </div>

        {/* 시설 그리드 */}
        <div className="facilities-grid">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className={`facility-card ${selectedFacility?.id === facility.id ? 'selected' : ''}`}
              onClick={() => setSelectedFacility(facility)}
            >
              <div className="facility-image">
                <img src={facility.image} alt={facility.name} />
                <div className="facility-icon" style={{ background: facility.color }}>
                  {facility.icon}
                </div>
              </div>

              <div className="facility-info">
                <h3>{facility.name}</h3>
                <p className="facility-description">{facility.description}</p>

                <div className="facility-details">
                  <div className="detail-item">
                    <FiMapPin />
                    <span>{facility.location}</span>
                  </div>
                  <div className="detail-item">
                    <FiClock />
                    <span>{facility.hours}</span>
                  </div>
                  {facility.contact !== '-' && (
                    <div className="detail-item">
                      <FiPhone />
                      <span>{facility.contact}</span>
                    </div>
                  )}
                </div>

                <div className="facility-features">
                  {facility.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 지도 섹션 */}
        <div className="map-section">
          <div className="map-header">
            <h2>시설 위치 안내</h2>
            <p>캠핑장 내 시설들의 위치를 확인하세요</p>
          </div>

          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-grid">
                {/* 상단 영역 */}
                <div className="map-area top">
                  <div className="map-item" style={{ background: '#e74c3c20' }}>
                    <span className="map-icon">🎬</span>
                    <span>영화관</span>
                    <span className="map-location">A동 1층</span>
                  </div>
                  <div className="map-item" style={{ background: '#3498db20' }}>
                    <span className="map-icon">🏪</span>
                    <span>매점</span>
                    <span className="map-location">B동 1층</span>
                  </div>
                </div>

                {/* 중앙 영역 */}
                <div className="map-area center">
                  <div className="map-item main" style={{ background: '#2ecc7120' }}>
                    <span className="map-icon">🏛️</span>
                    <span>관리사무소</span>
                    <span className="map-location">중앙광장</span>
                  </div>
                </div>

                {/* 하단 영역 */}
                <div className="map-area bottom">
                  <div className="map-item" style={{ background: '#9b59b620' }}>
                    <span className="map-icon">🚻</span>
                    <span>화장실</span>
                    <span className="map-location">곳곳</span>
                  </div>
                  <div className="map-item" style={{ background: '#f39c1220' }}>
                    <span className="map-icon">🎠</span>
                    <span>놀이터</span>
                    <span className="map-location">C동 야외</span>
                  </div>
                </div>
              </div>

              <div className="map-info">
                <FiInfo />
                <span>클릭하여 각 시설의 자세한 정보를 확인하세요</span>
              </div>
            </div>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="facilities-notice">
          <h3>이용 안내</h3>
          <ul>
            <li>모든 시설은 캠핑장 이용객에게 무료로 제공됩니다</li>
            <li>영화관과 게임센터는 사전 예약을 권장합니다</li>
            <li>매점 이용 시 현금과 카드 모두 사용 가능합니다</li>
            <li>관리사무소는 24시간 상주하여 긴급 상황에 대응합니다</li>
            <li>놀이터 이용 시 보호자 동반이 필요합니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
