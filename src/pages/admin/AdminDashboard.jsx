import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiDollarSign, FiCalendar, FiShoppingBag,
  FiTrendingUp, FiTrendingDown, FiActivity, FiAlertCircle
} from 'react-icons/fi';
import '../../styles/AdminDashboard.css';

const Dashboard = () => {
  const stats = [
    {
      id: 1,
      title: '오늘 예약',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <FiCalendar />,
      color: '#4CAF50'
    },
    {
      id: 2,
      title: '총 수익',
      value: '₩3,450,000',
      change: '+8.2%',
      trend: 'up',
      icon: <FiDollarSign />,
      color: '#2196F3'
    },
    {
      id: 3,
      title: '활성 사용자',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: <FiUsers />,
      color: '#FF9800'
    },
    {
      id: 4,
      title: '주문 건수',
      value: '89',
      change: '-5%',
      trend: 'down',
      icon: <FiShoppingBag />,
      color: '#9C27B0'
    }
  ];

  const recentReservations = [
    {
      id: 1,
      customer: '김캠핑',
      site: 'A구역 - 사이트 5',
      checkIn: '2026-02-15',
      status: 'confirmed',
      amount: 50000
    },
    {
      id: 2,
      customer: '이자연',
      site: 'B구역 - 사이트 8',
      checkIn: '2026-02-16',
      status: 'pending',
      amount: 60000
    },
    {
      id: 3,
      customer: '박야외',
      site: 'E구역 - 사이트 3',
      checkIn: '2026-02-14',
      status: 'confirmed',
      amount: 55000
    },
    {
      id: 4,
      customer: '최캠핑',
      site: 'D구역 - 사이트 12',
      checkIn: '2026-02-17',
      status: 'pending',
      amount: 70000
    },
    {
      id: 5,
      customer: '정텐트',
      site: 'C구역 - 사이트 6',
      checkIn: '2026-02-15',
      status: 'confirmed',
      amount: 45000
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'B구역 주차장이 곧 만차됩니다. (23/25)',
      time: '10분 전'
    },
    {
      id: 2,
      type: 'info',
      message: '이번 주말 예약률 85% 달성',
      time: '1시간 전'
    },
    {
      id: 3,
      type: 'error',
      message: '사이트 A-7 전기 점검 필요',
      time: '2시간 전'
    }
  ];

  const occupancyData = [
    { zone: 'A구역', total: 10, occupied: 7, rate: 70 },
    { zone: 'B구역', total: 12, occupied: 11, rate: 92 },
    { zone: 'C구역', total: 8, occupied: 4, rate: 50 },
    { zone: 'D구역', total: 15, occupied: 12, rate: 80 },
    { zone: 'E구역', total: 10, occupied: 8, rate: 80 },
    { zone: 'F구역', total: 9, occupied: 5, rate: 56 }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { text: '확정', class: 'status-confirmed' },
      pending: { text: '대기', class: 'status-pending' },
      cancelled: { text: '취소', class: 'status-cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const getAlertClass = (type) => {
    const classes = {
      warning: 'alert-warning',
      info: 'alert-info',
      error: 'alert-error',
      success: 'alert-success'
    };
    return classes[type] || classes.info;
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>대시보드</h1>
          <p>캠핑장 운영 현황을 한눈에 확인하세요</p>
        </div>
        <div className="header-actions">
          <select className="date-selector">
            <option>오늘</option>
            <option>이번 주</option>
            <option>이번 달</option>
            <option>올해</option>
          </select>
          <button className="btn btn-primary">
            <FiActivity />
            리포트 생성
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card">
            <div className="stat-icon" style={{ background: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <span className="stat-title">{stat.title}</span>
              <div className="stat-value-row">
                <span className="stat-value">{stat.value}</span>
                <span className={`stat-change ${stat.trend}`}>
                  {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        {/* Recent Reservations */}
        <div className="dashboard-card reservations-card">
          <div className="card-header">
            <h2>최근 예약</h2>
            <Link to="/admin/reservations" className="view-all-link">
              전체보기 →
            </Link>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>고객명</th>
                  <th>사이트</th>
                  <th>체크인</th>
                  <th>상태</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                {recentReservations.map(reservation => {
                  const badge = getStatusBadge(reservation.status);
                  return (
                    <tr key={reservation.id}>
                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {reservation.customer[0]}
                          </div>
                          <span>{reservation.customer}</span>
                        </div>
                      </td>
                      <td>{reservation.site}</td>
                      <td>{reservation.checkIn}</td>
                      <td>
                        <span className={`status-badge ${badge.class}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td className="amount-cell">
                        ₩{reservation.amount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="dashboard-card occupancy-card">
          <div className="card-header">
            <h2>구역별 점유율</h2>
            <span className="occupancy-total">전체 평균: 71%</span>
          </div>
          <div className="occupancy-list">
            {occupancyData.map((zone, idx) => (
              <div key={idx} className="occupancy-item">
                <div className="occupancy-info">
                  <span className="zone-name">{zone.zone}</span>
                  <span className="zone-stats">
                    {zone.occupied}/{zone.total}
                  </span>
                </div>
                <div className="occupancy-bar-container">
                  <div
                    className="occupancy-bar"
                    style={{
                      width: `${zone.rate}%`,
                      background: zone.rate >= 80 ? '#f44336' : 
                                 zone.rate >= 60 ? '#FF9800' : '#4CAF50'
                    }}
                  />
                </div>
                <span className="occupancy-rate">{zone.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="dashboard-card alerts-card">
        <div className="card-header">
          <h2>
            <FiAlertCircle />
            알림 및 주의사항
          </h2>
        </div>
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${getAlertClass(alert.type)}`}>
              <div className="alert-content">
                <p>{alert.message}</p>
                <span className="alert-time">{alert.time}</span>
              </div>
              <button className="alert-dismiss">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/admin/reservations/new" className="quick-action-card">
          <FiCalendar />
          <span>새 예약 추가</span>
        </Link>
        <Link to="/admin/users" className="quick-action-card">
          <FiUsers />
          <span>회원 관리</span>
        </Link>
        <Link to="/admin/sites" className="quick-action-card">
          <FiActivity />
          <span>사이트 관리</span>
        </Link>
        <Link to="/admin/orders" className="quick-action-card">
          <FiShoppingBag />
          <span>주문 관리</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
