import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import '../../styles/Login.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      console.log('📩 비밀번호 재설정 요청');
      console.log('Email:', email);

      // ==========================================
      // 🔥 나중에 백엔드 연결할 자리 (axios 주석 처리)
      // ==========================================
      /*
      const response = await axios.post('/api/auth/forgot-password', { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      */
      // ==========================================

      // ✅ 지금은 더미 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess('비밀번호 재설정 링크를 이메일로 전송했습니다.');

    } catch (err) {
      setError(err.message || '요청 중 오류가 발생했습니다.');
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
            <h1>S'MORE</h1>
            <p>이메일로 비밀번호 재설정 <br/>링크를 보내드립니다</p>
          </div>
        </div>

        {/* 오른쪽 폼 */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>비밀번호 찾기</h2>
              <p>가입한 이메일을 입력해주세요</p>
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
              <div className="form-group">
                <label>이메일</label>
                <div className="input-wrapper">
                  {/* <FiMail className="input-icon" /> */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? '전송 중...' : '재설정 링크 보내기'}
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

export default ForgotPassword;
