import React, { useState } from 'react';
import { FiSave, FiUpload, FiMail, FiBell, FiLock, FiGlobe } from 'react-icons/fi';
import '../../styles/AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '캠핑장 관리 시스템',
    siteEmail: 'admin@camping.com',
    sitePhone: '1588-0000',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    emailNotifications: true,
    smsNotifications: false,
    autoConfirm: false,
    maintenanceMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('설정이 저장되었습니다!');
    console.log('Saved settings:', settings);
  };

  return (
    <div className="admin-settings">
      <div className="page-header">
        <div>
          <h1>설정</h1>
          <p>시스템 설정 및 환경 구성</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="settings-form">
        {/* Basic Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FiGlobe />
            <h2>기본 설정</h2>
          </div>
          <div className="settings-grid">
            <div className="form-group">
              <label>사이트 이름</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                name="siteEmail"
                value={settings.siteEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>전화번호</label>
              <input
                type="tel"
                name="sitePhone"
                value={settings.sitePhone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Reservation Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FiLock />
            <h2>예약 설정</h2>
          </div>
          <div className="settings-grid">
            <div className="form-group">
              <label>체크인 시간</label>
              <input
                type="time"
                name="checkInTime"
                value={settings.checkInTime}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>체크아웃 시간</label>
              <input
                type="time"
                name="checkOutTime"
                value={settings.checkOutTime}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="settings-toggles">
            <label className="toggle-item">
              <input
                type="checkbox"
                name="autoConfirm"
                checked={settings.autoConfirm}
                onChange={handleChange}
              />
              <span>예약 자동 확정</span>
            </label>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FiBell />
            <h2>알림 설정</h2>
          </div>
          <div className="settings-toggles">
            <label className="toggle-item">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
              />
              <span>이메일 알림</span>
            </label>
            <label className="toggle-item">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
              />
              <span>SMS 알림</span>
            </label>
          </div>
        </div>

        {/* System Settings */}
        <div className="settings-section">
          <div className="section-header">
            <FiUpload />
            <h2>시스템 설정</h2>
          </div>
          <div className="settings-toggles">
            <label className="toggle-item">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              <span>점검 모드</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            <FiSave />
            설정 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
