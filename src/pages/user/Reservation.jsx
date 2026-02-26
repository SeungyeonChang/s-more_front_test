import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUsers, FiMapPin, FiCheck } from 'react-icons/fi';
import '../../styles/Reservation.css';

const Reservation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    zone: '',
    site: '',
    name: '',
    email: '',
    phone: ''
  });

  const zones = [
    { id: 'A', name: 'A구역', price: 50000, description: '산 전망', sites: 10 },
    { id: 'B', name: 'B구역', price: 60000, description: '계곡 전망', sites: 12 },
    { id: 'C', name: 'C구역', price: 45000, description: '숲 속', sites: 8 },
    { id: 'D', name: 'D구역', price: 70000, description: '호수 뷰', sites: 15 },
    { id: 'E', name: 'E구역', price: 55000, description: '별빛 테라스', sites: 10 },
    { id: 'F', name: 'F구역', price: 65000, description: '가족 구역', sites: 9 }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('예약이 완료되었습니다!');
    navigate('/mypage');
  };

  const selectedZone = zones.find(z => z.id === formData.zone);

  return (
    <div className="reservation-page">
      <div className="container">
        <h1>예약하기</h1>
        
        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>날짜/인원</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>구역 선택</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>정보 입력</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="reservation-form">
          {/* Step 1: 날짜 및 인원 */}
          {step === 1 && (
            <div className="form-step">
              <h2>날짜 및 인원 선택</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>체크인</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>체크아웃</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>인원</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="2">2명</option>
                    <option value="4">4명</option>
                    <option value="6">6명</option>
                  </select>
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                다음 단계
              </button>
            </div>
          )}

          {/* Step 2: 구역 선택 */}
          {step === 2 && (
            <div className="form-step">
              <h2>구역 선택</h2>
              <div className="zones-grid">
                {zones.map(zone => (
                  <div
                    key={zone.id}
                    className={`zone-card ${formData.zone === zone.id ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, zone: zone.id })}
                  >
                    <h3>{zone.name}</h3>
                    <p>{zone.description}</p>
                    <div className="zone-price">₩{zone.price.toLocaleString()}/박</div>
                    <div className="zone-sites">사이트 {zone.sites}개</div>
                  </div>
                ))}
              </div>
              <div className="step-buttons">
                <button type="button" className="btn btn-outline" onClick={handlePrev}>
                  이전
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!formData.zone}
                >
                  다음 단계
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 정보 입력 */}
          {step === 3 && (
            <div className="form-step">
              <h2>예약자 정보</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>이름</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>전화번호</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                    required
                  />
                </div>
              </div>

              {/* 예약 요약 */}
              <div className="reservation-summary">
                <h3>예약 요약</h3>
                <div className="summary-item">
                  <span>체크인</span>
                  <strong>{formData.checkIn}</strong>
                </div>
                <div className="summary-item">
                  <span>체크아웃</span>
                  <strong>{formData.checkOut}</strong>
                </div>
                <div className="summary-item">
                  <span>인원</span>
                  <strong>{formData.guests}명</strong>
                </div>
                <div className="summary-item">
                  <span>구역</span>
                  <strong>{selectedZone?.name}</strong>
                </div>
                <div className="summary-item total">
                  <span>총 금액</span>
                  <strong>₩{selectedZone?.price.toLocaleString()}</strong>
                </div>
              </div>

              <div className="step-buttons">
                <button type="button" className="btn btn-outline" onClick={handlePrev}>
                  이전
                </button>
                <button type="submit" className="btn btn-primary">
                  <FiCheck />
                  예약 완료
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reservation;
