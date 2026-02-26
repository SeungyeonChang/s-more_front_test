import React, { useState } from 'react';
import { FiTrendingUp, FiUsers, FiDollarSign, FiCalendar, FiDownload } from 'react-icons/fi';
import '../../styles/AdminAnalytics.css';

const AdminAnalytics = () => {
  const [period, setPeriod] = useState('month');

  const stats = {
    revenue: {
      current: 12450000,
      previous: 10230000,
      change: 21.7
    },
    reservations: {
      current: 324,
      previous: 287,
      change: 12.9
    },
    users: {
      current: 1856,
      previous: 1624,
      change: 14.3
    },
    avgStay: {
      current: 2.3,
      previous: 2.1,
      change: 9.5
    }
  };

  const monthlyData = [
    { month: '1월', revenue: 8500000, reservations: 180, users: 450 },
    { month: '2월', revenue: 12450000, reservations: 324, users: 680 },
    { month: '3월', revenue: 15200000, reservations: 412, users: 850 },
    { month: '4월', revenue: 18900000, reservations: 520, users: 1020 },
    { month: '5월', revenue: 22300000, reservations: 645, users: 1245 },
    { month: '6월', revenue: 25100000, reservations: 728, users: 1450 }
  ];

  const topZones = [
    { name: 'D구역', bookings: 156, revenue: 10920000, rate: 89 },
    { name: 'A구역', bookings: 134, revenue: 6700000, rate: 85 },
    { name: 'F구역', bookings: 128, revenue: 8320000, rate: 82 },
    { name: 'B구역', bookings: 98, revenue: 5880000, rate: 76 },
    { name: 'E구역', bookings: 87, revenue: 4785000, rate: 71 }
  ];

  const customerSegments = [
    { type: 'VIP 회원', count: 156, percentage: 8.4, revenue: 5680000 },
    { type: '일반 회원', count: 1245, percentage: 67.1, revenue: 5120000 },
    { type: '신규 가입', count: 455, percentage: 24.5, revenue: 1650000 }
  ];

  return (
    <div className="admin-analytics">
      <div className="page-header">
        <div>
          <h1>통계 & 리포트</h1>
          <p>비즈니스 인사이트와 성과 분석</p>
        </div>
        <div className="header-actions">
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="week">최근 7일</option>
            <option value="month">이번 달</option>
            <option value="quarter">분기</option>
            <option value="year">올해</option>
          </select>
          <button className="btn btn-primary">
            <FiDownload />
            리포트 다운로드
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="card-icon revenue">
            <FiDollarSign />
          </div>
          <div className="card-content">
            <span className="card-label">총 수익</span>
            <h2>₩{stats.revenue.current.toLocaleString()}</h2>
            <div className="card-change positive">
              <FiTrendingUp />
              <span>+{stats.revenue.change}% vs 지난달</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon bookings">
            <FiCalendar />
          </div>
          <div className="card-content">
            <span className="card-label">예약 건수</span>
            <h2>{stats.reservations.current}</h2>
            <div className="card-change positive">
              <FiTrendingUp />
              <span>+{stats.reservations.change}% vs 지난달</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon users">
            <FiUsers />
          </div>
          <div className="card-content">
            <span className="card-label">활성 사용자</span>
            <h2>{stats.users.current}</h2>
            <div className="card-change positive">
              <FiTrendingUp />
              <span>+{stats.users.change}% vs 지난달</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon stay">
            <FiCalendar />
          </div>
          <div className="card-content">
            <span className="card-label">평균 숙박일</span>
            <h2>{stats.avgStay.current}박</h2>
            <div className="card-change positive">
              <FiTrendingUp />
              <span>+{stats.avgStay.change}% vs 지난달</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        {/* Monthly Trend */}
        <div className="analytics-card full-width">
          <div className="card-header">
            <h2>월별 추이</h2>
          </div>
          <div className="chart-container">
            <div className="bar-chart">
              {monthlyData.map((data, idx) => (
                <div key={idx} className="bar-group">
                  <div className="bar-wrapper">
                    <div
                      className="bar revenue-bar"
                      style={{ height: `${(data.revenue / 25100000) * 100}%` }}
                      title={`수익: ₩${data.revenue.toLocaleString()}`}
                    />
                    <div
                      className="bar reservation-bar"
                      style={{ height: `${(data.reservations / 728) * 100}%` }}
                      title={`예약: ${data.reservations}건`}
                    />
                  </div>
                  <span className="bar-label">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color revenue"></span>
                <span>수익</span>
              </div>
              <div className="legend-item">
                <span className="legend-color reservation"></span>
                <span>예약</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Zones */}
        <div className="analytics-card">
          <div className="card-header">
            <h2>인기 구역 Top 5</h2>
          </div>
          <div className="top-list">
            {topZones.map((zone, idx) => (
              <div key={idx} className="top-item">
                <div className="rank">{idx + 1}</div>
                <div className="item-info">
                  <strong>{zone.name}</strong>
                  <span>{zone.bookings}건 예약</span>
                </div>
                <div className="item-stats">
                  <div className="revenue">₩{(zone.revenue / 1000000).toFixed(1)}M</div>
                  <div className="rate-bar">
                    <div className="rate-fill" style={{ width: `${zone.rate}%` }}></div>
                  </div>
                  <div className="rate-text">{zone.rate}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="analytics-card">
          <div className="card-header">
            <h2>고객 세그먼트</h2>
          </div>
          <div className="segment-list">
            {customerSegments.map((segment, idx) => (
              <div key={idx} className="segment-item">
                <div className="segment-header">
                  <strong>{segment.type}</strong>
                  <span className="segment-percentage">{segment.percentage}%</span>
                </div>
                <div className="segment-bar">
                  <div
                    className="segment-fill"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
                <div className="segment-details">
                  <span>{segment.count}명</span>
                  <span>₩{(segment.revenue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
