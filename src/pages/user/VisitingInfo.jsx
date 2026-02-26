import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCar, FaBus, FaSubway, FaPhone } from 'react-icons/fa';
import '../../styles/VisitingInfo.css';

const VisitingInfo = () => {
  const [activeTab, setActiveTab] = useState('map');

  // 캠핑장 위치 좌표 (실제 위치로 변경 필요)
  const CAMPING_POSITION = {
    lat: 37.2415, // 경기도 용인시 예시
    lng: 127.0798
  };

  const handleNaverMapLoad = () => {
    // 네이버 지도 스크립트 로드 후 초기화
    if (window.naver && window.naver.maps) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(CAMPING_POSITION.lat, CAMPING_POSITION.lng),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        }
      };

      const map = new window.naver.maps.Map('map', mapOptions);

      // 캠핑장 마커
      const markerOptions = {
        position: new window.naver.maps.LatLng(CAMPING_POSITION.lat, CAMPING_POSITION.lng),
        map: map,
        title: '캠핑장 위치',
        icon: {
          url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA0MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0Q0FGNTAiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMTUiIGZpbGw9IiNGRkYiIHN0cm9rZT0iIzNDQ0NDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMzQ0NDQyIiBmb250LXdlaWdodD0iYm9sZCI+44Kq44OqPC90ZXh0Pgo8L3N2Zz4K',
          size: new window.naver.maps.Size(40, 50),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(20, 50)
        }
      };

      new window.naver.maps.Marker(markerOptions);

      // 현재 위치로 이동 버튼
      window.naver.maps.Event.addListener(map, 'click', function(e) {
        console.log('지도 클릭:', e.coord);
      });
    }
  };

  return (
    <div className="visiting-info-page">
      <div className="container">
        {/* 헤더 */}
        <div className="page-header">
          <h1><FaMapMarkerAlt /> 오시는 길</h1>
          <p>가장 편리한 교통수단으로 찾아오세요</p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="tab-nav">
          <button 
            className={activeTab === 'map' ? 'active' : ''}
            onClick={() => setActiveTab('map')}
          >
            지도
          </button>
          <button 
            className={activeTab === 'car' ? 'active' : ''}
            onClick={() => setActiveTab('car')}
          >
            <FaCar /> 자차
          </button>
          <button 
            className={activeTab === 'bus' ? 'active' : ''}
            onClick={() => setActiveTab('bus')}
          >
            <FaBus /> 대중교통
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          {/* 지도 탭 */}
          {activeTab === 'map' && (
            <div className="map-tab">
              <div id="map" className="map-container"></div>
              
              <div className="map-info">
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <h3>캠핑장 주소</h3>
                    <p>경기도 용인시 처인구 xxx로 123<br />동천동 456-7</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <h3>문의 전화</h3>
                    <p>031-123-4567</p>
                  </div>
                </div>
              </div>

              <div className="map-buttons">
                <button className="naver-map-btn" onClick={() => {
                  window.open(`https://map.naver.com/p/search/${encodeURIComponent('경기도 용인시 처인구 xxx로 123')}`);
                }}>
                  네이버 지도 열기
                </button>
                <button className="kakao-map-btn" onClick={() => {
                  window.open(`https://map.kakao.com/link/to/캠핑장,${CAMPING_POSITION.lat},${CAMPING_POSITION.lng}`);
                }}>
                  카카오맵 열기
                </button>
              </div>
            </div>
          )}

          {/* 자차 탭 */}
          {activeTab === 'car' && (
            <div className="transport-tab">
              <div className="route-card">
                <h3><FaCar /> 자차 이용 시</h3>
                <div className="route-steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <div>
                      <h4>경부고속도로 → 영동고속도로</h4>
                      <p>수지IC → 용인서울고속도로 → 천전IC</p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <div>
                      <h4>천전IC → 캠핑장 (15분)</h4>
                      <p>직진 3km → xxx로 우회전 → 1km 직진</p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <div>
                      <h4>주차 안내</h4>
                      <p>대형 주차장 완비 (100대 수용)<br />RV차량 전용 주차 구역 별도 운영</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="parking-info">
                <h3>주차장 정보</h3>
                <ul>
                  <li>일반 승용차: 무료</li>
                  <li>RV/트럭: 1박 10,000원</li>
                  <li>장애인 주차: 전 구역 가능</li>
                  <li>주차 위치: 각 사이트별 1-2대</li>
                </ul>
              </div>
            </div>
          )}

          {/* 대중교통 탭 */}
          {activeTab === 'bus' && (
            <div className="transport-tab">
              <div className="route-card">
                <h3><FaBus /> 대중교통 이용 시</h3>
                <div className="route-steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <div>
                      <h4>신분당선 수지구청역</h4>
                      <p>1호선 환승 → 5분 거리</p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <div>
                      <h4>버스 33-1번 (용인시내버스)</h4>
                      <p>수지구청역 → 동천리 (캠핑장 앞, 12분 소요)</p>
                    </div>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <div>
                      <h4>도보 5분</h4>
                      <p>동천리 정류장 → 캠핑장 입구</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shuttle-info">
                <h3>셔틀버스 운행</h3>
                <div className="shuttle-schedule">
                  <div className="schedule-item">
                    <div>수지구청역 ↔ 캠핑장</div>
                    <div>주말 오전 9시 ~ 오후 6시 (30분 간격)</div>
                  </div>
                  <div className="schedule-item">
                    <div>왕복 요금</div>
                    <div>성인 5,000원 / 어린이 3,000원</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitingInfo;
