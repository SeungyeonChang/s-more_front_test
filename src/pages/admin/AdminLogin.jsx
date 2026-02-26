import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLock, FiMail, FiAlertCircle, FiShield } from 'react-icons/fi';
import '../../styles/AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminLogin(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <div className="admin-icon">
            <FiShield />
          </div>
          <h1>관리자 로그인</h1>
          <p>캠핑장 관리 시스템</p>
        </div>

        {error && (
          <div className="error-message">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label>
              <FiMail />
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@camping.com"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <FiLock />
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '관리자 로그인'}
          </button>
        </form>

        <div className="admin-login-info">
          <div className="info-box">
            <FiAlertCircle />
            <div>
              <strong>데모 계정</strong>
              <p>이메일: admin@camping.com</p>
              <p>비밀번호: admin123</p>
            </div>
          </div>
        </div>

        <div className="admin-login-footer">
          <a href="/">일반 사용자 페이지로 이동</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
