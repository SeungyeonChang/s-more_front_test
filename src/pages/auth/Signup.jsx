import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import '../../styles/Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 필수값 체크
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필수 항목을 입력해주세요.');
      setLoading(false);
      return;
    }

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    // 🚗 차량번호는 입력했을 때만 검사
    if (vehicleNumber) {
      const vehicleRegex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
      if (!vehicleRegex.test(vehicleNumber)) {
        setError('올바른 차량번호 형식이 아닙니다. 예: 12가3456');
        setLoading(false);
        return;
      }
    }

    try {
      await signup({
        name,
        email,
        password,
        vehicleNumber: vehicleNumber || null // 선택값 처리
      });

      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-image">
          <div className="image-overlay">
            <h1>🏕️ 캠핑장 관리 시스템</h1>
            <p>회원가입 후 다양한 서비스를 이용하세요</p>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>회원가입</h2>
              <p>새 계정을 생성하세요</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">

              {/* 이름 */}
              <div className="form-group">
                <label><FiUser /> 이름 *</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* 이메일 */}
              <div className="form-group">
                <label><FiMail /> 이메일 *</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>


              {/* 비밀번호 */}
              <div className="form-group">
                <label><FiLock /> 비밀번호 *</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div className="form-group">
                <label><FiLock /> 비밀번호 확인 *</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력하세요"
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


              {/* 차량번호 (선택) */}
              <div className="form-group">
                <label>차량번호 (선택)</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="예: 12가3456"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </form>

            <div className="signup-link">
              이미 계정이 있으신가요?{' '}
              <Link to="/login">로그인</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
