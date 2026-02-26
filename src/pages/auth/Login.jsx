import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { SiKakaotalk } from 'react-icons/si';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * 📌 메인 로그인 핸들러
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 로그인 시도:', email);
      const result = await login(email, password);
      
      console.log('✅ 로그인 결과:', result);

      if (result && result.success) {
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userEmail', email);
        }

        console.log('👤 사용자 role:', result.user?.role);
        
        // ✅ setTimeout으로 상태 업데이트 후 navigate 실행
        setTimeout(() => {
          if (result.user?.role === 'admin') {
            console.log('🔄 관리자 페이지로 이동');
            navigate('/admin/dashboard', { replace: true });
          } else {
            console.log('🔄 홈으로 이동');
            navigate('/', { replace: true });
          }
        }, 100);
      } else {
        setError(result?.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('❌ 로그인 에러:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 📌 빠른 로그인 (데모용) - 완전 수정
   */
  const handleQuickLogin = async (role) => {
    console.log(`🚀 빠른 로그인 시작: ${role}`);
    
    setError('');
    setLoading(true);

    let testEmail, testPassword;

    if (role === 'admin') {
      testEmail = 'admin@camping.com';
      testPassword = 'admin123';
      console.log('👨‍💼 관리자 계정으로 로그인 시도');
    } else {
      testEmail = 'user@example.com';
      testPassword = 'user123';
      console.log('👤 일반 사용자 계정으로 로그인 시도');
    }

    // 폼에 자동 입력
    setEmail(testEmail);
    setPassword(testPassword);

    try {
      console.log('📞 AuthContext login() 호출 중...');
      const result = await login(testEmail, testPassword);
      
      console.log('📊 빠른 로그인 결과:', result);
      console.log('📊 result.success:', result?.success);
      console.log('📊 result.user:', result?.user);
      console.log('📊 result.user.role:', result?.user?.role);

      // ✅ result가 없거나 undefined인 경우 처리
      if (!result) {
        console.error('❌ AuthContext login()이 아무것도 반환하지 않았습니다!');
        setError('로그인 함수가 응답하지 않습니다. AuthContext를 확인해주세요.');
        setLoading(false);
        return;
      }

      if (result.success) {
        console.log('✅ 빠른 로그인 성공! Role:', result.user?.role);
        
        // ✅ setTimeout으로 navigate 지연 실행 (상태 업데이트 대기)
        setTimeout(() => {
          if (result.user?.role === 'admin') {
            console.log('🔄 관리자 대시보드로 이동');
            navigate('/admin/dashboard', { replace: true });
          } else {
            console.log('🔄 홈으로 이동');
            navigate('/', { replace: true });
          }
          setLoading(false);
        }, 100);
      } else {
        console.error('❌ 빠른 로그인 실패:', result.message);
        setError(result.message || '빠른 로그인 실패. 계정 정보를 확인해주세요.');
        setLoading(false);
      }
    } catch (err) {
      console.error('❌ 빠른 로그인 에러:', err);
      setError('빠른 로그인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  /**
   * 📌 카카오 로그인
   */
  const handleKakaoLogin = () => {
    alert('카카오 로그인은 준비 중입니다.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* 왼쪽: 이미지 */}
        <div className="login-image">
          <div className="image-overlay">
            <h1>🏕️ CampSite</h1>
            <p>자연과 함께하는 특별한 경험</p>
          </div>
        </div>

        {/* 오른쪽: 로그인 폼 */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>로그인</h2>
              <p>계정에 로그인하여 서비스를 이용하세요</p>
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              {/* 이메일 */}
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <div className="input-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label="비밀번호 표시/숨기기"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* 로그인 옵션 */}
              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>로그인 상태 유지</span>
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  비밀번호 찾기
                </Link>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    로그인 중...
                  </span>
                ) : (
                  '로그인'
                )}
              </button>
            </form>

            {/* 구분선 */}
            <div className="login-divider">
              <span>또는</span>
            </div>

            {/* 카카오 로그인 */}
            <button
              className="btn btn-kakao btn-block"
              onClick={handleKakaoLogin}
              disabled={loading}
            >
              <SiKakaotalk />
              <span>카카오톡으로 로그인하기</span>
            </button>

            {/* 빠른 로그인 (데모용) */}
            <div className="quick-login">
              <p>빠른 로그인 (데모용)</p>
              <div className="quick-login-buttons">
                <button
                  type="button"
                  className="btn btn-quick btn-user"
                  onClick={() => handleQuickLogin('user')}
                  disabled={loading}
                >
                  👤 일반 사용자
                </button>
                <button
                  type="button"
                  className="btn btn-quick btn-admin"
                  onClick={() => handleQuickLogin('admin')}
                  disabled={loading}
                >
                  👨‍💼 관리자
                </button>
              </div>
            </div>

            {/* 회원가입 링크 */}
            <div className="signup-link">
              계정이 없으신가요?
              <Link to="/signup">회원가입</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
