import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiLock, FiBell, FiLogOut, FiTrash2, FiSave } from 'react-icons/fi';
import '../../styles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '김캠핑',
    email: user?.email || 'camping@example.com',
    phone: '010-1234-5678',
    birthdate: '1990-01-01'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailReservation: true,
    smsMarketing: false,
    smsReservation: true,
    pushMarketing: true,
    pushReservation: true
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert('프로필이 업데이트되었습니다.');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    alert('비밀번호가 변경되었습니다.');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    alert('알림 설정이 저장되었습니다.');
  };

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      if (window.confirm('모든 예약 및 포인트가 삭제됩니다. 계속하시겠습니까?')) {
        logout();
        navigate('/');
        alert('회원 탈퇴가 완료되었습니다.');
      }
    }
  };

  return (
    <div className="settings-page">
      <div className="container">
        <h1>설정</h1>

        <div className="settings-container">
          {/* Sidebar */}
          <aside className="settings-sidebar">
            <button
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser />
              프로필 정보
            </button>
            <button
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              <FiLock />
              비밀번호 변경
            </button>
            <button
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell />
              알림 설정
            </button>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <FiLogOut />
              로그아웃
            </button>
            <button
              className="delete-btn"
              onClick={handleDeleteAccount}
            >
              <FiTrash2 />
              회원 탈퇴
            </button>
          </aside>

          {/* Content */}
          <div className="settings-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2>프로필 정보</h2>
                <p className="section-description">
                  회원님의 개인정보를 관리할 수 있습니다.
                </p>

                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label>이름</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>전화번호</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>생년월일</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={profileData.birthdate}
                      onChange={handleProfileChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <FiSave />
                    저장하기
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="settings-section">
                <h2>비밀번호 변경</h2>
                <p className="section-description">
                  정기적으로 비밀번호를 변경하여 계정을 안전하게 보호하세요.
                </p>

                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label>현재 비밀번호</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="현재 비밀번호를 입력하세요"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>새 비밀번호</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="새 비밀번호를 입력하세요"
                      required
                    />
                    <span className="form-hint">
                      8자 이상, 영문/숫자/특수문자 조합
                    </span>
                  </div>

                  <div className="form-group">
                    <label>새 비밀번호 확인</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="새 비밀번호를 다시 입력하세요"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <FiSave />
                    비밀번호 변경
                  </button>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <h2>알림 설정</h2>
                <p className="section-description">
                  받고 싶은 알림을 선택하세요.
                </p>

                <form onSubmit={handleNotificationSubmit}>
                  <div className="notification-group">
                    <h3>이메일 알림</h3>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="emailReservation"
                          checked={notifications.emailReservation}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>예약 알림</strong>
                          <span>예약 확정, 변경, 취소 관련 알림</span>
                        </div>
                      </label>
                    </div>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="emailMarketing"
                          checked={notifications.emailMarketing}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>마케팅 알림</strong>
                          <span>이벤트, 프로모션, 할인 정보</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="notification-group">
                    <h3>SMS 알림</h3>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="smsReservation"
                          checked={notifications.smsReservation}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>예약 알림</strong>
                          <span>예약 확정, 변경, 취소 관련 알림</span>
                        </div>
                      </label>
                    </div>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="smsMarketing"
                          checked={notifications.smsMarketing}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>마케팅 알림</strong>
                          <span>이벤트, 프로모션, 할인 정보</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="notification-group">
                    <h3>푸시 알림</h3>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="pushReservation"
                          checked={notifications.pushReservation}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>예약 알림</strong>
                          <span>예약 확정, 변경, 취소 관련 알림</span>
                        </div>
                      </label>
                    </div>
                    <div className="notification-item">
                      <label>
                        <input
                          type="checkbox"
                          name="pushMarketing"
                          checked={notifications.pushMarketing}
                          onChange={handleNotificationChange}
                        />
                        <div className="notification-info">
                          <strong>마케팅 알림</strong>
                          <span>이벤트, 프로모션, 할인 정보</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <FiSave />
                    저장하기
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
