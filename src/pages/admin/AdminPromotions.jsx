import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiPercent, FiCalendar } from 'react-icons/fi';
import '../../styles/AdminPromotions.css';

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: '주말 특가 이벤트',
      description: '주말 예약 시 20% 할인',
      discount: 20,
      type: 'percentage',
      startDate: '2026-02-01',
      endDate: '2026-02-29',
      status: 'active',
      usageCount: 45,
      code: 'WEEKEND20'
    },
    {
      id: 2,
      title: '신규 가입 쿠폰',
      description: '신규 회원 첫 예약 10,000원 할인',
      discount: 10000,
      type: 'fixed',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'active',
      usageCount: 128,
      code: 'WELCOME10K'
    },
    {
      id: 3,
      title: '봄맞이 프로모션',
      description: '3박 이상 예약 시 30% 할인',
      discount: 30,
      type: 'percentage',
      startDate: '2026-03-01',
      endDate: '2026-05-31',
      status: 'scheduled',
      usageCount: 0,
      code: 'SPRING30'
    },
    {
      id: 4,
      title: 'VIP 회원 전용',
      description: 'VIP 등급 회원 25% 할인',
      discount: 25,
      type: 'percentage',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'active',
      usageCount: 67,
      code: 'VIP25'
    },
    {
      id: 5,
      title: '겨울 시즌 종료',
      description: '2월 한정 15% 할인',
      discount: 15,
      type: 'percentage',
      startDate: '2026-01-15',
      endDate: '2026-02-14',
      status: 'expired',
      usageCount: 89,
      code: 'WINTER15'
    }
  ]);

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: '진행중', class: 'status-active' },
      scheduled: { text: '예정', class: 'status-scheduled' },
      expired: { text: '종료', class: 'status-expired' }
    };
    return badges[status] || badges.active;
  };

  const handleDelete = (id) => {
    if (window.confirm('이 프로모션을 삭제하시겠습니까?')) {
      setPromotions(promotions.filter(p => p.id !== id));
    }
  };

  return (
    <div className="admin-promotions">
      <div className="page-header">
        <div>
          <h1>🎉 프로모션 관리</h1>
          <p>할인 쿠폰 및 이벤트 관리</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus />
          새 프로모션 추가
        </button>
      </div>

      {/* Stats */}
      <div className="promo-stats">
        <div className="stat-card">
          <div className="stat-icon active">
            <FiPercent />
          </div>
          <div className="stat-content">
            <span className="stat-label">진행중</span>
            <span className="stat-value">
              {promotions.filter(p => p.status === 'active').length}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon scheduled">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <span className="stat-label">예정</span>
            <span className="stat-value">
              {promotions.filter(p => p.status === 'scheduled').length}
            </span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon total">
            <FiPercent />
          </div>
          <div className="stat-content">
            <span className="stat-label">총 사용</span>
            <span className="stat-value">
              {promotions.reduce((sum, p) => sum + p.usageCount, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="promotions-grid">
        {promotions.map(promo => {
          const badge = getStatusBadge(promo.status);
          return (
            <div key={promo.id} className="promo-card">
              <div className="promo-header">
                <h3>{promo.title}</h3>
                <span className={`status-badge ${badge.class}`}>
                  {badge.text}
                </span>
              </div>

              <p className="promo-description">{promo.description}</p>

              <div className="promo-details">
                <div className="detail-item">
                  <span className="detail-label">할인</span>
                  <span className="detail-value discount">
                    {promo.type === 'percentage' 
                      ? `${promo.discount}%`
                      : `₩${promo.discount.toLocaleString()}`
                    }
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">쿠폰 코드</span>
                  <span className="detail-value code">{promo.code}</span>
                </div>
              </div>

              <div className="promo-period">
                <FiCalendar />
                <span>{promo.startDate} ~ {promo.endDate}</span>
              </div>

              <div className="promo-usage">
                <span className="usage-label">사용 횟수</span>
                <span className="usage-count">{promo.usageCount}회</span>
              </div>

              <div className="promo-actions">
                <button className="action-btn edit">
                  <FiEdit />
                  수정
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => handleDelete(promo.id)}
                >
                  <FiTrash2 />
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPromotions;
