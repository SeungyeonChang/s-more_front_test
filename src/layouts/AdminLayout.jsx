import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FiHome, FiCalendar, FiUsers, FiMapPin, FiShoppingBag,
  FiSettings, FiLogOut, FiBarChart2, FiTrendingUp, FiFilm,
  FiTruck, FiCpu, FiMessageSquare, FiTag, FiFileText, FiMap,
  FiDatabase, FiChevronDown, FiMenu, FiX
} from 'react-icons/fi';
import './AdminLayout.css';

const menuGroups = [
  {
    key: 'operation',
    label: '📊 운영 대시보드',
    items: [
      { path: '/admin/dashboard', icon: <FiHome />,      label: '대시보드' },
      { path: '/admin/reports',   icon: <FiBarChart2 />, label: '통계/리포트' },
      { path: '/admin/ai',        icon: <FiCpu />,       label: 'AI 관리' },
    ],
  },
  {
    key: 'booking',
    label: '📅 예약 및 고객 관리',
    items: [
      { path: '/admin/reservations', icon: <FiCalendar />,      label: '예약 관리' },
      { path: '/admin/users',        icon: <FiUsers />,         label: '회원 관리' },
      { path: '/admin/chat',         icon: <FiMessageSquare />, label: '문의 관리' },
      { path: '/admin/orders',       icon: <FiShoppingBag />,   label: '주문 관리' },
    ],
  },
  {
    key: 'resource',
    label: '🏕️ 시설 및 자원 관리',
    items: [
      { path: '/admin/sites',   icon: <FiMapPin />,     label: '사이트 관리' },
      { path: '/admin/map',     icon: <FiMap />,        label: '지도 관리' },
      { path: '/admin/parking', icon: <FiTruck />,      label: '주차 관리' },
      { path: '/admin/game',    icon: <FiTrendingUp />, label: '게임 관리' },
      { path: '/admin/movie',   icon: <FiFilm />,       label: '영화 관리' },
    ],
  },
  {
    key: 'marketing',
    label: '📢 마케팅 및 콘텐츠',
    items: [
      { path: '/admin/content',    icon: <FiFileText />, label: '공지/콘텐츠' },
      { path: '/admin/promotions', icon: <FiTag />,      label: '할인/이벤트' },
    ],
  },
  {
    key: 'system',
    label: '⚙️ 시스템 설정',
    items: [
      { path: '/admin/settings', icon: <FiSettings />, label: '설정' },
      { path: '/admin/backup',   icon: <FiDatabase />, label: '백업/복구' },
    ],
  },
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ operation: true });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleGroup = (key) =>
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));

  const isGroupActive = (items) =>
    items.some(i => location.pathname === i.path);

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/admin/login');
    }
  };

  return (
    <div className="admin-layout">

      {/* ════ Top Header ════ */}
      <header className="admin-header">

        {/* 로고 */}
        <Link to="/admin/dashboard" className="admin-logo">
          <span className="logo-emoji">🏕️</span>
          <span className="logo-text">Admin</span>
        </Link>

        {/* 데스크탑 드롭다운 nav */}
        <nav className="admin-nav">
          {menuGroups.map(group => (
            <div
              key={group.key}
              className="nav-group"
              onMouseEnter={() => setOpenGroups(prev => ({ ...prev, [group.key]: true }))}
              onMouseLeave={() => setOpenGroups(prev => ({ ...prev, [group.key]: false }))}
            >
              <button className={`nav-group-btn ${isGroupActive(group.items) ? 'active' : ''}`}>
                {group.label}
                <FiChevronDown className={`chevron ${openGroups[group.key] ? 'rotated' : ''}`} />
              </button>

              {openGroups[group.key] && (
                <div className="nav-dropdown">
                  {group.items.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      <span className="dropdown-icon">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 우측: 유저 + 로그아웃 */}
        <div className="header-right">
          <div className="admin-user">
            <div className="user-avatar">{user?.name?.[0] || 'A'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || '관리자'}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="로그아웃">
            <FiLogOut />
          </button>
        </div>

        {/* 모바일 햄버거 */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* ════ 모바일 메뉴 (아코디언) ════ */}
      {mobileOpen && (
        <div className="mobile-menu">
          {menuGroups.map(group => (
            <div key={group.key} className="mobile-group">
              <button
                className={`mobile-group-btn ${isGroupActive(group.items) ? 'active' : ''}`}
                onClick={() => toggleGroup(group.key)}
              >
                {group.label}
                <FiChevronDown className={`chevron ${openGroups[group.key] ? 'rotated' : ''}`} />
              </button>
              {openGroups[group.key] && (
                <div className="mobile-group-items">
                  {group.items.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`mobile-item ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button className="mobile-logout" onClick={handleLogout}>
            <FiLogOut /> 로그아웃
          </button>
        </div>
      )}

      {/* ════ Page Content ════ */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;