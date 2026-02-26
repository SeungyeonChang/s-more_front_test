import React, { useState } from 'react';
import { FiMapPin, FiZoomIn, FiZoomOut, FiLayers, FiNavigation } from 'react-icons/fi';
import '../../styles/AdminMap.css';

const AdminMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [mapView, setMapView] = useState('satellite');

  const zones = [
    {
      id: 'A',
      name: 'A구역',
      sites: 10,
      occupied: 7,
      available: 3,
      position: { x: 20, y: 25 },
      facilities: ['전기', '주차', 'BBQ']
    },
    {
      id: 'B',
      name: 'B구역',
      sites: 12,
      occupied: 11,
      available: 1,
      position: { x: 45, y: 30 },
      facilities: ['전기', '주차', '계곡']
    },
    {
      id: 'C',
      name: 'C구역',
      sites: 8,
      occupied: 4,
      available: 4,
      position: { x: 70, y: 35 },
      facilities: ['전기', '주차']
    },
    {
      id: 'D',
      name: 'D구역',
      sites: 15,
      occupied: 12,
      available: 3,
      position: { x: 30, y: 60 },
      facilities: ['전기', '주차', 'BBQ', '호수뷰']
    },
    {
      id: 'E',
      name: 'E구역',
      sites: 10,
      occupied: 8,
      available: 2,
      position: { x: 55, y: 65 },
      facilities: ['전기', '주차', '별빛 테라스']
    },
    {
      id: 'F',
      name: 'F구역',
      sites: 9,
      occupied: 5,
      available: 4,
      position: { x: 75, y: 70 },
      facilities: ['전기', '주차', '놀이터']
    }
  ];

  const facilities = [
    { id: 1, name: '관리사무소', icon: '🏢', position: { x: 50, y: 15 } },
    { id: 2, name: '화장실/샤워실', icon: '🚻', position: { x: 40, y: 50 } },
    { id: 3, name: '매점', icon: '🏪', position: { x: 60, y: 45 } },
    { id: 4, name: '놀이터', icon: '🎠', position: { x: 80, y: 60 } },
    { id: 5, name: '야외극장', icon: '🎬', position: { x: 25, y: 80 } }
  ];

  const getOccupancyColor = (zone) => {
    const rate = (zone.occupied / zone.sites) * 100;
    if (rate >= 90) return '#f44336';
    if (rate >= 70) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <div className="admin-map">
      <div className="page-header">
        <div>
          <h1>🗺️ 캠핑장 지도 관리</h1>
          <p>구역 및 시설 위치 관리</p>
        </div>
      </div>

      <div className="map-layout">
        {/* Map Controls */}
        <div className="map-controls">
          <div className="control-group">
            <h3>지도 타입</h3>
            <div className="control-buttons">
              <button
                className={mapView === 'roadmap' ? 'active' : ''}
                onClick={() => setMapView('roadmap')}
              >
                일반
              </button>
              <button
                className={mapView === 'satellite' ? 'active' : ''}
                onClick={() => setMapView('satellite')}
              >
                위성
              </button>
              <button
                className={mapView === 'hybrid' ? 'active' : ''}
                onClick={() => setMapView('hybrid')}
              >
                하이브리드
              </button>
            </div>
          </div>

          <div className="control-group">
            <h3>구역 현황</h3>
            <div className="zones-status">
              {zones.map(zone => (
                <div
                  key={zone.id}
                  className={`zone-status-item ${selectedZone?.id === zone.id ? 'active' : ''}`}
                  onClick={() => setSelectedZone(zone)}
                  style={{ borderLeftColor: getOccupancyColor(zone) }}
                >
                  <div className="zone-name">{zone.name}</div>
                  <div className="zone-occupancy">
                    {zone.occupied}/{zone.sites}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>주요 시설</h3>
            <div className="facilities-list">
              {facilities.map(facility => (
                <div key={facility.id} className="facility-item">
                  <span className="facility-icon">{facility.icon}</span>
                  <span>{facility.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>범례</h3>
            <div className="legend">
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#4CAF50' }}></span>
                <span>여유</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#FF9800' }}></span>
                <span>보통</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ background: '#f44336' }}></span>
                <span>만석 임박</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="map-container">
          <div className="map-canvas">
            <div className="map-background">
              {/* Zone Markers */}
              {zones.map(zone => (
                <div
                  key={zone.id}
                  className={`zone-marker ${selectedZone?.id === zone.id ? 'selected' : ''}`}
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`,
                    borderColor: getOccupancyColor(zone)
                  }}
                  onClick={() => setSelectedZone(zone)}
                >
                  <div className="marker-icon">
                    <FiMapPin />
                  </div>
                  <div className="marker-label">{zone.name}</div>
                  <div className="marker-status">
                    {zone.available}/{zone.sites}
                  </div>
                </div>
              ))}

              {/* Facility Markers */}
              {facilities.map(facility => (
                <div
                  key={facility.id}
                  className="facility-marker"
                  style={{
                    left: `${facility.position.x}%`,
                    top: `${facility.position.y}%`
                  }}
                >
                  <span>{facility.icon}</span>
                  <div className="facility-tooltip">{facility.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="zoom-controls">
            <button className="zoom-btn">
              <FiZoomIn />
            </button>
            <button className="zoom-btn">
              <FiZoomOut />
            </button>
            <button className="zoom-btn">
              <FiLayers />
            </button>
            <button className="zoom-btn">
              <FiNavigation />
            </button>
          </div>

          {/* Zone Info Panel */}
          {selectedZone && (
            <div className="zone-info-panel">
              <button className="close-btn" onClick={() => setSelectedZone(null)}>
                ✕
              </button>
              <h3>{selectedZone.name}</h3>
              <div className="info-stats">
                <div className="info-stat">
                  <span className="stat-label">전체 사이트</span>
                  <span className="stat-value">{selectedZone.sites}개</span>
                </div>
                <div className="info-stat">
                  <span className="stat-label">이용 중</span>
                  <span className="stat-value occupied">{selectedZone.occupied}개</span>
                </div>
                <div className="info-stat">
                  <span className="stat-label">이용 가능</span>
                  <span className="stat-value available">{selectedZone.available}개</span>
                </div>
              </div>
              <div className="info-facilities">
                <h4>편의시설</h4>
                <div className="facilities-tags">
                  {selectedZone.facilities.map((facility, idx) => (
                    <span key={idx} className="facility-tag">{facility}</span>
                  ))}
                </div>
              </div>
              <div className="info-actions">
                <button className="btn btn-outline btn-sm">구역 수정</button>
                <button className="btn btn-primary btn-sm">사이트 관리</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMap;
