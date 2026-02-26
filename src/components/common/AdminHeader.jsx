import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiUser, FiLogOut } from 'react-icons/fi';
import './AdminHeader.css';

const AdminHeader = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header">
      <button className="sidebar-toggle" onClick={onToggleSidebar}>
        <FiMenu />
      </button>

      <div className="admin-header-right">
        <button className="admin-icon-btn">
          <FiBell />
          <span className="notification-badge">5</span>
        </button>

        <div className="admin-user">
          <FiUser />
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
