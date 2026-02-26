import React, { useState } from 'react';
import { FiMapPin, FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import '../../styles/AdminParking.css';

const AdminParking = () => {
  const [selectedZone, setSelectedZone] = useState('all');

  const parkingZones = [
    {
      id: 1,
      name: 'A구역 주차장',
      total: 20,
      occupied: 15,
      available: 5,
      status: 'available',
      location: 'A구역 입구',
      vehicles: [
        { id: 1, plateNumber: '12가3456', owner: '김캠핑', spot: 'A-01', checkIn: '14:30' },
        { id: 2, plateNumber: '34나5678', owner: '이자연', spot: 'A-05', checkIn: '15:20' }
      ]
    },
    {
      id: 2,
      name: 'B구역 주차장',
      total: 25,
      occupied: 23,
      available: 2,
      status: 'limited',
      location: 'B구역 입구',
      vehicles: []
    },
    {
      id: 3,
      name: 'C구역 주차장',
      total: 15,
      occupied: 8,
      available: 7,
      status: 'available',
      location: 'C구역 입구',
      vehicles: []
    },
    {
      id: 4,
      name: 'D구역 주차장',
      total: 30,
      occupied: 30,
      available: 0,
      status: 'full',
      location: 'D구역 입구',
      vehicles: []
    },
    {
      id: 5,
      name: 'E구역 주차장',
      total: 20,
      occupied: 12,
      available: 8,
      status: 'available',
      location: 'E구역 입구',
      vehicles: []
    },
    {
      id: 6,
      name: 'F구역 주차장',
      total: 18,
      occupied: 10,
      available: 8,
      status: 'available',
      location: 'F구역 입구',
      vehicles: []
    }
  ];

  const recentActivity = [
    { id: 1, action: '입차', plateNumber: '12가3456', zone: 'A구역', time: '15:30', owner: '김캠핑' },
    { id: 2, action: '출차', plateNumber: '56다7890', zone: 'B구역', time: '15:15', owner: '박야외' },
    { id: 3, action: '입차', plateNumber: '34나5678', zone: 'A구역', time: '15:00', owner: '이자연' },
    { id: 4, action: '출차', plateNumber: '78라9012', zone: 'C구역', time: '14:45', owner: '최캠핑' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#4CAF50';
      case 'limited': return '#FF9800';
      case 'full': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return '여유';
      case 'limited': return '잔여적음';
      case 'full': return '만차';
      default: return '알 수 없음';
    }
  };

  const filteredZones = selectedZone === 'all'
    ? parkingZones
    : parkingZones.filter(zone => zone.id === parseInt(selectedZone));

  const totalSpots = parkingZones.reduce((sum, zone) => sum + zone.total, 0);
  const totalOccupied = parkingZones.reduce((sum, zone) => sum + zone.occupied, 0);
  const totalAvailable = parkingZones.reduce((sum, zone) => sum + zone.available, 0);
  const occupancyRate = Math.round((totalOccupied / totalSpots) * 100);

  return (
    <div className="admin-parking">
      <div className="page-header">
        <div>
          <h1>🚗 주차 관리</h1>
          <p>주차장 현황 및 차량 관리</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus />
          차량 등록
        </button>
      </div>

      {/* Summary Stats */}
      <div className="parking-summary">
        <div className="summary-card total">
          <h3>전체 주차면</h3>
          <div className="value">{totalSpots}</div>
        </div>
        <div className="summary-card occupied">
          <h3>주차 중</h3>
          <div className="value">{totalOccupied}</div>
        </div>
        <div className="summary-card available">
          <h3>이용 가능</h3>
          <div className="value">{totalAvailable}</div>
        </div>
        <div className="summary-card rate">
          <h3>점유율</h3>
          <div className="value">{occupancyRate}%</div>
          <div className="rate-bar">
            <div
              className="rate-fill"
              style={{
                width: `${occupancyRate}%`,
                background: occupancyRate >= 80 ? '#f44336' : occupancyRate >= 60 ? '#FF9800' : '#4CAF50'
              }}
            />
          </div>
        </div>
      </div>

      <div className="parking-content">
        {/* Parking Zones */}
        <div className="parking-zones">
          <div className="zones-header">
            <h2>주차장 현황</h2>
            <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
              <option value="all">전체 구역</option>
              {parkingZones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>

          <div className="zones-grid">
            {filteredZones.map(zone => (
              <div key={zone.id} className="zone-card">
                <div className="zone-header">
                  <div className="zone-title">
                    <FiMapPin />
                    <h3>{zone.name}</h3>
                  </div>
                  <span
                    className="zone-status"
                    style={{ background: getStatusColor(zone.status) }}
                  >
                    {getStatusText(zone.status)}
                  </span>
                </div>

                <div className="zone-location">{zone.location}</div>

                <div className="zone-stats">
                  <div className="stat-item">
                    <span className="stat-label">전체</span>
                    <span className="stat-value">{zone.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">주차중</span>
                    <span className="stat-value occupied">{zone.occupied}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">이용가능</span>
                    <span className="stat-value available">{zone.available}</span>
                  </div>
                </div>

                <div className="zone-progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(zone.occupied / zone.total) * 100}%`,
                      background: getStatusColor(zone.status)
                    }}
                  />
                </div>

                <div className="zone-actions">
                  <button className="action-btn">
                    <FiEdit />
                    수정
                  </button>
                  <button className="action-btn">
                    차량 목록
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>최근 활동</h2>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-badge ${activity.action === '입차' ? 'entry' : 'exit'}`}>
                  {activity.action}
                </div>
                <div className="activity-info">
                  <div className="plate-number">{activity.plateNumber}</div>
                  <div className="activity-details">
                    <span>{activity.owner}</span>
                    <span>•</span>
                    <span>{activity.zone}</span>
                  </div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminParking;
