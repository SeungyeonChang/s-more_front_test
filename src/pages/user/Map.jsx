import React, { useState } from 'react';
import { FiMapPin, FiNavigation, FiZoomIn, FiZoomOut, FiLayers } from 'react-icons/fi';
import '../../styles/Map.css';

const Map = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const zones = [
    { id: 1
      , name: 'A구역'
      , sites: 10
      , available: 3
      , amenities: ['전기', '주차']
      , description: '산 전망이 아름다운 구역'
      , position: { x: 15, y: 22 } 
    },
    { id: 2
      , name: 'B구역'
      , sites: 12
      , available: 0
      , amenities: ['전기', '계곡']
      , description: '계곡 근처 구역'
      , position: { x: 48, y: 45 } 
    },
    { id: 3
      , name: 'C구역'
      , sites: 8
      , available: 5
      , amenities: ['주차']
      , description: '조용한 숲 속 구역'
      , position: { x: 18, y: 62 } 
    },
    { id: 4
      , name: 'D구역'
      , sites: 15
      , available: 8
      , amenities: ['BBQ']
      , description: '호수 뷰 프리미엄 구역'
      , position: { x: 75, y: 65 } 
    },
    { id: 5
      , name: 'E구역'
      , sites: 10
      , available: 2
      , amenities: ['별빛 테라스']
      , description: '별 관측 최적 구역'
      , position: { x: 65, y: 35 } 
    },
    { id: 6
      , name: 'F구역'
      , sites: 9
      , available: 6
      , amenities: ['놀이터']
      , description: '가족 캠핑 구역'
      , position: { x: 35, y: 85 } },
  ];

  const facilities = [
    { id: 1
      , name: '관리사무소'
      , icon: '🏢'
      , position: { x: 25, y: 12 } 
    },
    { id: 2
      , name: '화장실'
      , icon: '🚻'
      , position: { x: 50, y: 28 } 
    },
    { id: 3
      , name: '매점'
      , icon: '🏪'
      , position: { x: 35, y: 30 } 
    },
    { id: 4
      , name: '놀이터'
      , icon: '🎠'
      , position: { x: 39, y: 85 } 
    },
  ];

  const handleZoneClick = (zone) => setSelectedZone(zone);

  const handleNavigate = () => {
    if (selectedZone) alert(`${selectedZone.name} 길 안내 기능 (가상)`);
  };

  return (
    <div className="map-page">
      <div className="container-fluid">
        <div className="map-layout">
          <aside className="map-sidebar">
            <div className="sidebar-header">
              <h2>🗺️ 캠핑장 지도</h2>
              <p>구역과 시설을 확인하세요</p>
            </div>

            {/* Map Controls */}
            <div className="map-controls">
              <h3>지도 타입</h3>
              <div className="map-type-buttons">
                <button className={mapView === 'roadmap' ? 'active' : ''} onClick={() => setMapView('roadmap')}>일반</button>
                <button className={mapView === 'satellite' ? 'active' : ''} onClick={() => setMapView('satellite')}>위성</button>
                <button className={mapView === 'terrain' ? 'active' : ''} onClick={() => setMapView('terrain')}>지형</button>
              </div>
            </div>

            {/* Zone List */}
            <div className="zones-list">
              <h3>캠핑 구역</h3>
              {zones.map(zone => (
                <div
                  key={zone.id}
                  className={`zone-item ${selectedZone?.id === zone.id ? 'selected' : ''} ${zone.available === 0 ? 'full' : ''}`}
                  onClick={() => handleZoneClick(zone)}
                >
                  <div className="zone-header">
                    <FiMapPin />
                    <strong>{zone.name}</strong>
                    <span className={`availability ${zone.available === 0 ? 'full' : ''}`}>
                      {zone.available === 0 ? '만석' : `${zone.available}/${zone.sites}`}
                    </span>
                  </div>
                  <p className="zone-description">{zone.description}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Map Container */}
          <div className="map-container">
            <div className="map-canvas">
              <div className="virtual-map">
                {/* 산 배경 */}
                <div className="mountains"></div>
                
                {/* 호수 */}
                <div className="lake"></div>
                
                {/* 계곡/하천 */}
                <div className="stream"></div>
                
                {/* 숲 영역 */}
                <div className="forest forest-1"></div>
                <div className="forest forest-2"></div>
                <div className="forest forest-3"></div>
                
                {/* 도로 */}
                <div className="road main-road"></div>
                <div className="road side-road-1"></div>
                <div className="road side-road-2"></div>
                
                {/* Zones */}
                {zones.map(zone => (
                  <div
                    key={zone.id}
                    className={`zone-marker ${selectedZone?.id === zone.id ? 'selected' : ''} ${zone.available === 0 ? 'full' : ''}`}
                    style={{ top: `${zone.position.y}%`, left: `${zone.position.x}%` }}
                    onClick={() => handleZoneClick(zone)}
                    title={`${zone.name} (${zone.available === 0 ? '만석' : zone.available})`}
                  >
                    <span className="zone-letter">{zone.name[0]}</span>
                  </div>
                ))}

                {/* Facilities */}
                {facilities.map(fac => (
                  <div
                    key={fac.id}
                    className="facility-marker"
                    style={{ top: `${fac.position.y}%`, left: `${fac.position.x}%` }}
                    title={fac.name}
                  >
                    <span className="facility-icon">{fac.icon}</span>
                    <span className="facility-label">{fac.name}</span>
                  </div>
                ))}
                
                {/* 나무 장식 요소들 */}
                <div className="tree" style={{ top: '12%', left: '15%' }}>🌲</div>
                <div className="tree" style={{ top: '18%', left: '22%' }}>🌲</div>
                <div className="tree" style={{ top: '35%', left: '18%' }}>🌳</div>
                <div className="tree" style={{ top: '42%', left: '25%' }}>🌲</div>
                <div className="tree" style={{ top: '55%', left: '22%' }}>🌳</div>
                <div className="tree" style={{ top: '48%', left: '85%' }}>🌲</div>
                <div className="tree" style={{ top: '58%', left: '82%' }}>🌲</div>
                <div className="tree" style={{ top: '65%', left: '88%' }}>🌳</div>
                <div className="tree" style={{ top: '25%', left: '88%' }}>🌲</div>
                <div className="tree" style={{ top: '32%', left: '85%' }}>🌳</div>
                
                {/* 추가 자연 요소 */}
                <div className="rock" style={{ top: '28%', left: '35%' }}>🪨</div>
                <div className="rock" style={{ top: '52%', left: '48%' }}>🪨</div>
                <div className="tent-deco" style={{ top: '16%', left: '21%' }}>⛺</div>
                <div className="tent-deco" style={{ top: '51%', left: '31%' }}>⛺</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Zone Info */}
      {selectedZone && (
        <div className="selected-zone-info">
          <button className="close-btn" onClick={() => setSelectedZone(null)}>✕</button>
          <h3>{selectedZone.name}</h3>
          <p>{selectedZone.description}</p>
          <div className="info-stats">
            <div className="info-stat">
              <span className="stat-label">전체 사이트</span>
              <span className="stat-value">{selectedZone.sites}개</span>
            </div>
            <div className="info-stat">
              <span className="stat-label">이용 가능</span>
              <span className="stat-value available">{selectedZone.available}개</span>
            </div>
          </div>
          <div className="info-actions">
            <button className="btn btn-outline" onClick={handleNavigate}><FiNavigation /> 길 찾기</button>
            <button className="btn btn-primary">예약하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;