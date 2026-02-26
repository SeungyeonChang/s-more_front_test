import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import '../../styles/Login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 🔥 토큰이 없어도 테스트 가능하게 demo-token 사용
  const token = searchParams.get('token') || 'demo-token';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 비밀번호 재설정 요청');
      console.log('Token:', token);

      // ==========================================
      // 🔥 나중에 백엔드 연결할 자리 (지금은 건들지 마세요)
      // ==========================================
      /*
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword: password
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      */
      // ==========================================

      // ✅ 지금은 더미 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('비밀번호가 성공적으로 변경되었습니다.');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message || '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 왼쪽 이미지 */}
        <div className="login-image">
          <div className="image-overlay">
            <h1>🔐 CampSite</h1>
            <p>새 비밀번호를 설정하세요</p>
          </div>
        </div>

        {/* 오른쪽 폼 */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>비밀번호 재설정</h2>
              <p>새로운 비밀번호를 입력해주세요</p>
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                ✅ {success}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              {/* 새 비밀번호 */}
              <div className="form-group">
                <label>새 비밀번호</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div className="form-group">
                <label>비밀번호 확인</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? '변경 중...' : '비밀번호 변경'}
              </button>
            </form>

            <div className="signup-link" style={{ marginTop: '20px' }}>
              <Link to="/login">로그인 페이지로 이동</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
