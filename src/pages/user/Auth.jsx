import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import '../../styles/Auth.css';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);
    setError('');

    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      alert('회원가입이 완료되었습니다.');
      setMode('login');
    } else {
      setError('회원가입에 실패했습니다.');
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 비밀번호 재설정 로직
    setTimeout(() => {
      setLoading(false);
      alert('비밀번호 재설정 이메일이 발송되었습니다.');
      setMode('login');
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={mode === 'login' ? 'active' : ''} 
            onClick={() => setMode('login')}
          >
            로그인
          </button>
          <button 
            className={mode === 'signup' ? 'active' : ''} 
            onClick={() => setMode('signup')}
          >
            회원가입
          </button>
        </div>

        {mode === 'login' && (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>로그인</h2>
            
            <div className="form-group">
              <label>이메일</label>
              <div className="input-with-icon">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <div className="input-with-icon">
                <FiLock />
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </button>

            <div className="auth-links">
              <button type="button" onClick={() => setMode('reset')}>
                비밀번호 찾기
              </button>
            </div>

            <div className="social-login">
              <p>소셜 로그인</p>
              <div className="social-buttons">
                <button type="button" className="social-btn kakao">카카오</button>
                <button type="button" className="social-btn naver">네이버</button>
                <button type="button" className="social-btn google">구글</button>
              </div>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="auth-form" onSubmit={handleSignup}>
            <h2>회원가입</h2>
            
            <div className="form-group">
              <label>이름</label>
              <div className="input-with-icon">
                <FiUser />
                <input
                  type="text"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>이메일</label>
              <div className="input-with-icon">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>전화번호</label>
              <div className="input-with-icon">
                <FiPhone />
                <input
                  type="tel"
                  name="phone"
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>비밀번호</label>
              <div className="input-with-icon">
                <FiLock />
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>비밀번호 확인</label>
              <div className="input-with-icon">
                <FiLock />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="terms">
              <label>
                <input type="checkbox" required />
                <span>이용약관 및 개인정보처리방침에 동의합니다.</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>
        )}

        {mode === 'reset' && (
          <form className="auth-form" onSubmit={handleReset}>
            <h2>비밀번호 찾기</h2>
            
            <p className="reset-description">
              가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다.
            </p>

            <div className="form-group">
              <label>이메일</label>
              <div className="input-with-icon">
                <FiMail />
                <input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? '전송 중...' : '재설정 링크 보내기'}
            </button>

            <div className="auth-links">
              <button type="button" onClick={() => setMode('login')}>
                로그인으로 돌아가기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
