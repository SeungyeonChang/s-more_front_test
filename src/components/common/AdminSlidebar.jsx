import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiCalendar, FiShoppingBag, FiMapPin, 
  FiTruck, FiUsers, FiCpu, FiFileText, 
  FiMap, FiGift, FiMessageSquare, FiBarChart2,
  FiSettings, FiDatabase
} from 'react-icons/fi';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: '대시보드' },
    { path: '/admin/reservations', icon: <FiCalendar />, label: '예약 관리' },
    { path: '/admin/orders', icon: <FiShoppingBag />, label: '주문 관리' },
    { path: '/admin/sites', icon: <FiMapPin />, label: '사이트 관리' },
    { path: '/admin/parking', icon: <FiTruck />, label: '주차 관리' },
    { path: '/admin/users', icon: <FiUsers />, label: '회원 관리' },
    { path: '/admin/ai', icon: <FiCpu />, label: 'AI 설정' },
    { path: '/admin/content', icon: <FiFileText />, label: '콘텐츠 관리' },
    { path: '/admin/map', icon: <FiMap />, label: '지도 관리' },
    { path: '/admin/promotions', icon: <FiGift />, label: '프로모션' },
    { path: '/admin/chat', icon: <FiMessageSquare />, label: '채팅 관리' },
    { path: '/admin/analytics', icon: <FiBarChart2 />, label: '통계 분석' },
    { path: '/admin/settings', icon: <FiSettings />, label: '시스템 설정' },
    { path: '/admin/backup', icon: <FiDatabase />, label: '백업/복원' }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <span className="sidebar-logo">🏕️</span>
        {isOpen && <span className="sidebar-title">관리자</span>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {isOpen && <span className="sidebar-label">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
