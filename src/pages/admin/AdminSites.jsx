import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiMapPin, FiPower } from 'react-icons/fi';
import '../../styles/AdminSites.css';

const AdminSites = () => {
  const [selectedZone, setSelectedZone] = useState('all');

  const sites = [
    {
      id: 1,
      name: 'A구역 - 사이트 1',
      zone: 'A',
      capacity: 4,
      price: 50000,
      amenities: ['전기', '주차', 'BBQ'],
      status: 'available',
      description: '산 전망이 좋은 사이트'
    },
    {
      id: 2,
      name: 'A구역 - 사이트 2',
      zone: 'A',
      capacity: 6,
      price: 55000,
      amenities: ['전기', '주차', 'BBQ', '테라스'],
      status: 'occupied',
      description: '넓은 테라스가 있는 프리미엄 사이트'
    },
    {
      id: 3,
      name: 'B구역 - 사이트 1',
      zone: 'B',
      capacity: 4,
      price: 60000,
      amenities: ['전기', '주차', '계곡'],
      status: 'available',
      description: '계곡 바로 앞 시원한 사이트'
    },
    {
      id: 4,
      name: 'B구역 - 사이트 2',
      zone: 'B',
      capacity: 4,
      price: 60000,
      amenities: ['전기', '주차', '계곡', 'BBQ'],
      status: 'maintenance',
      description: '계곡뷰 + BBQ 시설'
    },
    {
      id: 5,
      name: 'C구역 - 사이트 1',
      zone: 'C',
      capacity: 2,
      price: 45000,
      amenities: ['전기', '주차'],
      status: 'available',
      description: '조용한 숲 속 커플 사이트'
    },
    {
      id: 6,
      name: 'D구역 - 사이트 1',
      zone: 'D',
      capacity: 6,
      price: 70000,
      amenities: ['전기', '주차', 'BBQ', '호수뷰'],
      status: 'occupied',
      description: '호수가 보이는 프리미엄 사이트'
    },
    {
      id: 7,
      name: 'E구역 - 사이트 1',
      zone: 'E',
      capacity: 4,
      price: 55000,
      amenities: ['전기', '주차', '별빛 테라스'],
      status: 'available',
      description: '별 관측에 최적화된 사이트'
    },
    {
      id: 8,
      name: 'F구역 - 사이트 1',
      zone: 'F',
      capacity: 5,
      price: 65000,
      amenities: ['전기', '주차', 'BBQ', '놀이터'],
      status: 'available',
      description: '가족 캠핑에 적합한 사이트'
    }
  ];

  const zones = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getStatusBadge = (status) => {
    const badges = {
      available: { text: '이용 가능', class: 'status-available' },
      occupied: { text: '예약 중', class: 'status-occupied' },
      maintenance: { text: '점검 중', class: 'status-maintenance' }
    };
    return badges[status] || badges.available;
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'maintenance' : 'available';
    console.log(`사이트 ${id}의 상태를 ${newStatus}로 변경`);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 이 사이트를 삭제하시겠습니까?')) {
      console.log(`사이트 ${id} 삭제`);
    }
  };

  const filteredSites = selectedZone === 'all'
    ? sites
    : sites.filter(site => site.zone === selectedZone);

  return (
    <div className="admin-sites">
      <div className="page-header">
        <div>
          <h1>사이트 관리</h1>
          <p>전체 {sites.length}개의 사이트</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus />
          새 사이트 추가
        </button>
      </div>

      {/* Zone Filters */}
      <div className="zone-filters">
        <button
          className={`zone-btn ${selectedZone === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedZone('all')}
        >
          전체 구역
        </button>
        {zones.map(zone => (
          <button
            key={zone}
            className={`zone-btn ${selectedZone === zone ? 'active' : ''}`}
            onClick={() => setSelectedZone(zone)}
          >
            {zone}구역
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="site-stats">
        <div className="stat-box">
          <span className="stat-label">이용 가능</span>
          <span className="stat-value available">
            {sites.filter(s => s.status === 'available').length}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">예약 중</span>
          <span className="stat-value occupied">
            {sites.filter(s => s.status === 'occupied').length}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">점검 중</span>
          <span className="stat-value maintenance">
            {sites.filter(s => s.status === 'maintenance').length}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">평균 가격</span>
          <span className="stat-value">
            ₩{Math.round(sites.reduce((sum, s) => sum + s.price, 0) / sites.length).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="sites-grid">
        {filteredSites.map(site => {
          const badge = getStatusBadge(site.status);
          return (
            <div key={site.id} className="site-card">
              <div className="site-header">
                <div className="site-title">
                  <FiMapPin />
                  <h3>{site.name}</h3>
                </div>
                <span className={`status-badge ${badge.class}`}>
                  {badge.text}
                </span>
              </div>

              <div className="site-content">
                <p className="site-description">{site.description}</p>

                <div className="site-details">
                  <div className="detail-item">
                    <span className="detail-label">최대 인원</span>
                    <span className="detail-value">{site.capacity}명</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">1박 요금</span>
                    <span className="detail-value price">
                      ₩{site.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="site-amenities">
                  <span className="amenities-label">편의시설:</span>
                  <div className="amenities-tags">
                    {site.amenities.map((amenity, idx) => (
                      <span key={idx} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="site-actions">
                <button
                  className={`action-btn toggle ${site.status === 'maintenance' ? 'active' : ''}`}
                  onClick={() => handleToggleStatus(site.id, site.status)}
                  disabled={site.status === 'occupied'}
                  title={site.status === 'available' ? '점검 모드' : '이용 가능'}
                >
                  <FiPower />
                </button>
                <button className="action-btn edit" title="수정">
                  <FiEdit />
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(site.id)}
                  disabled={site.status === 'occupied'}
                  title="삭제"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSites;
