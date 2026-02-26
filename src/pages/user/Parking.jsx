import React, { useState } from 'react';
import { FiMapPin, FiCheck, FiX, FiClock } from 'react-icons/fi';
import '../../styles/Parking.css';

const Parking = () => {
  const [selectedZone, setSelectedZone] = useState(null);

  const parkingZones = [
    {
      id: 1,
      name: 'A구역 주차장',
      total: 20,
      occupied: 15,
      available: 5,
      status: 'available',
      nearSites: ['A구역 사이트 1-10']
    },
    {
      id: 2,
      name: 'B구역 주차장',
      total: 25,
      occupied: 25,
      available: 0,
      status: 'full',
      nearSites: ['B구역 사이트 1-12']
    },
    {
      id: 3,
      name: 'C구역 주차장',
      total: 15,
      occupied: 8,
      available: 7,
      status: 'available',
      nearSites: ['C구역 사이트 1-8']
    },
    {
      id: 4,
      name: 'D구역 주차장',
      total: 30,
      occupied: 18,
      available: 12,
      status: 'available',
      nearSites: ['D구역 사이트 1-15']
    },
    {
      id: 5,
      name: 'E구역 주차장',
      total: 20,
      occupied: 19,
      available: 1,
      status: 'limited',
      nearSites: ['E구역 사이트 1-10']
    },
    {
      id: 6,
      name: 'F구역 주차장',
      total: 18,
      occupied: 10,
      available: 8,
      status: 'available',
      nearSites: ['F구역 사이트 1-9']
    }
  ];

  const myReservation = {
    zone: 'A구역',
    site: 'A구역 사이트 5',
    parkingSpot: 'A-12',
    checkIn: '2026-02-15 14:00'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'limited':
        return '#FF9800';
      case 'full':
        return '#f44336';
      default:
        return '#9E9E9E';
    }
  };

  const getOccupancyRate = (zone) => {
    return (zone.occupied / zone.total) * 100;
  };

  return (
    <div className="parking-page">
      <div className="container">
        <h1>🚗 주차 현황</h1>

        {/* My Parking Info */}
        {myReservation && (
          <div className="my-parking-card">
            <h2>내 주차 정보</h2>
            <div className="parking-info-grid">
              <div className="info-item">
                <span className="label">예약 구역</span>
                <span className="value">{myReservation.zone}</span>
              </div>
              <div className="info-item">
                <span className="label">사이트</span>
                <span className="value">{myReservation.site}</span>
              </div>
              <div className="info-item">
                <span className="label">주차 번호</span>
                <span className="value parking-number">{myReservation.parkingSpot}</span>
              </div>
              <div className="info-item">
                <span className="label">체크인 시간</span>
                <span className="value">{myReservation.checkIn}</span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="parking-stats">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#4CAF50' }}>
              <FiCheck />
            </div>
            <div className="stat-info">
              <span className="stat-value">
                {parkingZones.reduce((sum, zone) => sum + zone.available, 0)}
              </span>
              <span className="stat-label">이용 가능</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f44336' }}>
              <FiX />
            </div>
            <div className="stat-info">
              <span className="stat-value">
                {parkingZones.reduce((sum, zone) => sum + zone.occupied, 0)}
              </span>
              <span className="stat-label">주차 중</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#2196F3' }}>
              <FiMapPin />
            </div>
            <div className="stat-info">
              <span className="stat-value">
                {parkingZones.reduce((sum, zone) => sum + zone.total, 0)}
              </span>
              <span className="stat-label">전체</span>
            </div>
          </div>
        </div>

        {/* Parking Zones */}
        <div className="parking-zones">
          <h2>구역별 주차 현황</h2>
          <div className="zones-grid">
            {parkingZones.map(zone => (
              <div
                key={zone.id}
                className={`zone-card ${selectedZone === zone.id ? 'selected' : ''}`}
                onClick={() => setSelectedZone(zone.id)}
              >
                <div className="zone-header">
                  <h3>{zone.name}</h3>
                  <span
                    className="status-badge"
                    style={{ background: getStatusColor(zone.status) }}
                  >
                    {zone.status === 'available' && '여유'}
                    {zone.status === 'limited' && '마감임박'}
                    {zone.status === 'full' && '만차'}
                  </span>
                </div>

                <div className="zone-stats">
                  <div className="zone-stat">
                    <span className="stat-number available">{zone.available}</span>
                    <span className="stat-text">이용가능</span>
                  </div>
                  <div className="zone-divider">/</div>
                  <div className="zone-stat">
                    <span className="stat-number total">{zone.total}</span>
                    <span className="stat-text">전체</span>
                  </div>
                </div>

                <div className="occupancy-bar">
                  <div
                    className="occupancy-fill"
                    style={{
                      width: `${getOccupancyRate(zone)}%`,
                      background: getStatusColor(zone.status)
                    }}
                  />
                </div>

                <div className="zone-info">
                  <FiMapPin />
                  <span>{zone.nearSites[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parking Rules */}
        <div className="parking-rules">
          <h2>주차장 이용 안내</h2>
          <div className="rules-grid">
            <div className="rule-card">
              <div className="rule-icon">🚗</div>
              <h3>주차 방법</h3>
              <ul>
                <li>예약하신 구역 주차장을 이용하세요</li>
                <li>지정된 주차 구역에만 주차 가능</li>
                <li>차량 번호를 관리실에 등록해주세요</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">⏰</div>
              <h3>이용 시간</h3>
              <ul>
                <li>체크인: 14:00부터</li>
                <li>체크아웃: 12:00까지</li>
                <li>24시간 출입 가능</li>
              </ul>
            </div>

            <div className="rule-card">
              <div className="rule-icon">⚠️</div>
              <h3>주의사항</h3>
              <ul>
                <li>주차장 내 서행 운전 필수</li>
                <li>귀중품은 차량에 두지 마세요</li>
                <li>쓰레기는 지정 장소에 버려주세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Live Update Notice */}
        <div className="live-update-notice">
          <FiClock />
          <span>주차 현황은 실시간으로 업데이트됩니다.</span>
          <span className="update-time">최근 업데이트: 방금 전</span>
        </div>
      </div>
    </div>
  );
};

export default Parking;
