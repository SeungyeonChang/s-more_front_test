import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiClock, FiCalendar, FiUser, FiPhone, FiCreditCard,
         FiUsers, FiChevronDown, FiChevronUp, FiArrowLeft } from 'react-icons/fi';
import '../../styles/MovieBooking.css';

const PRICE_PER_PERSON = 5000;

const MovieBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * 📌 state 안전하게 추출
   * - navigate에서 state로 전달된 데이터를 받음
   * - state가 없을 경우 null로 처리
   */
  const state = location.state;
  const movie       = state?.movie      ?? null;
  const screening   = state?.screening  ?? null;
  const selectedDate = state?.selectedDate ?? null;

  const [people, setPeople]         = useState(1);
  const [name, setName]             = useState('');
  const [phone, setPhone]           = useState('');
  const [paymentMethod, setPayment] = useState('card');
  const [agreed, setAgreed]         = useState(false);

  // ── 데이터 없을 때 fallback ──────────────────────
  if (!movie || !screening) {
    return (
      <div className="movie-booking-page">
        <div className="container">
          <div className="booking-error">
            <p>⚠️ 상영 정보를 찾을 수 없습니다.</p>
            <p style={{ fontSize: '14px', opacity: 0.6 }}>
              MovieHub 화면에서 예매 버튼을 통해 접근해주세요.
            </p>
            <button className="btn btn-dev" onClick={() => navigate('/movies')}>
              영화 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── 계산 ──────────────────────────────────────────
  const totalPrice = PRICE_PER_PERSON * people;

  /**
   * 📌 인원 증감 처리
   * - 최소 1명, 최대 잔여 좌석 수
   */
  const handlePeople = (delta) => {
    setPeople((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > screening.available) return prev;
      return next;
    });
  };

  /**
   * 📌 전화번호 자동 하이픈 포맷
   */
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4)  return digits;
    if (digits.length < 8)  return `${digits.slice(0,3)}-${digits.slice(3)}`;
    return `${digits.slice(0,3)}-${digits.slice(3,7)}-${digits.slice(7)}`;
  };

  /**
   * 📌 실제 결제 버튼 (PC 연동용)
   * - 실제 PG 연동 시 이 함수에 로직 추가
   */
  const handleRealPayment = () => {
    if (!name.trim())  { alert('예매자 이름을 입력해주세요.'); return; }
    if (!phone.trim()) { alert('연락처를 입력해주세요.'); return; }
    if (!agreed)       { alert('약관에 동의해주세요.'); return; }

    // TODO: 실제 PG사 연동 로직 (예: 토스페이먼츠, KG이니시스 등)
    alert('결제 모듈 연동 준비 중입니다.');
  };

  /**
   * 📌 개발용 결제 버튼
   * - 폼 검증 후 완료 페이지로 바로 이동
   */
  const handleDevPayment = () => {
    if (!name.trim())  { alert('예매자 이름을 입력해주세요.'); return; }
    if (!phone.trim()) { alert('연락처를 입력해주세요.'); return; }
    if (!agreed)       { alert('약관에 동의해주세요.'); return; }

    navigate('/movies/payment/complete', {
      state: {
        movie,
        screening,
        selectedDate,
        people,
        name,
        phone,
        paymentMethod,
        totalPrice
      }
    });
  };

  // ── 렌더링 ────────────────────────────────────────
  return (
    <div className="movie-booking-page">
      <div className="container">

        {/* 페이지 타이틀 */}
        <div className="booking-title-row">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            <span>돌아가기</span>
          </button>
          <h1>영화표 결제</h1>
        </div>

        {/* ── 2분할 레이아웃 ── */}
        <div className="booking-layout">

          {/* ━━━━━ 좌측: 영화 포스터 + 상영 정보 ━━━━━ */}
          <div className="booking-movie-info">

            {/* 포스터 + 기본 정보 */}
            <div className="booking-movie-header">
              <img src={movie.poster} alt={movie.title} />
              <div className="booking-movie-meta">
                <h2>{movie.title}</h2>
                <p>{movie.genre} · {movie.duration}분</p>
                <span className="booking-rating">관람 등급: {movie.rating}</span>
                <p className="booking-desc">{movie.description}</p>
              </div>
            </div>

            {/* 상영 정보 */}
            <div className="booking-screening-info">
              <h3>상영 정보</h3>

              <div className="screening-detail-item">
                <FiCalendar />
                <span>상영 날짜</span>
                <strong>{selectedDate}</strong>
              </div>

              <div className="screening-detail-item">
                <FiClock />
                <span>상영 시간</span>
                <strong>{screening.time}</strong>
              </div>

              <div className="screening-detail-item">
                <FiUsers />
                <span>잔여 좌석</span>
                <strong className={
                  screening.available === 0 ? 'sold-out'
                  : screening.available <= 9 ? 'limited'
                  : 'available'
                }>
                  {screening.available}석 / 총 {screening.seats}석
                </strong>
              </div>
            </div>

          </div>

          {/* ━━━━━ 우측: 예매 폼 + 결제 ━━━━━ */}
          <div className="booking-form">

            {/* 예매 인원 */}
            <div className="form-group">
              <label>예매 인원</label>
              <div className="people-stepper">
                <button
                  className="stepper-btn"
                  onClick={() => handlePeople(-1)}
                  disabled={people <= 1}
                >
                  <FiChevronDown />
                </button>
                <span className="stepper-value">{people}명</span>
                <button
                  className="stepper-btn"
                  onClick={() => handlePeople(1)}
                  disabled={people >= screening.available}
                >
                  <FiChevronUp />
                </button>
              </div>
              <p className="help-text">최대 {screening.available}명까지 예매 가능합니다</p>
            </div>

            {/* 예매자 이름 */}
            <div className="form-group">
              <label>예매자 이름</label>
              <div className="input-with-icon">
                <FiUser />
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* 연락처 */}
            <div className="form-group">
              <label>연락처</label>
              <div className="input-with-icon">
                <FiPhone />
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="form-group">
              <label>결제 수단</label>
              <div className="payment-methods">
                {[
                  { value: 'card',    label: '💳 신용카드' },
                  { value: 'kakao',   label: '💛 카카오페이' },
                  { value: 'naver',   label: '🟢 네이버페이' },
                  { value: 'cash',    label: '💵 현장 현금' },
                ].map((method) => (
                  <button
                    key={method.value}
                    className={`method-btn ${paymentMethod === method.value ? 'active' : ''}`}
                    onClick={() => setPayment(method.value)}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 결제 금액 요약 */}
            <div className="payment-summary">
              <div className="summary-row">
                <span>1인 금액</span>
                <span>{PRICE_PER_PERSON.toLocaleString()}원</span>
              </div>
              <div className="summary-row">
                <span>인원</span>
                <span>{people}명</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>총 결제 금액</span>
                <strong className="total-price">{totalPrice.toLocaleString()}원</strong>
              </div>
            </div>

            {/* 약관 동의 */}
            <label className="agree-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>
                개인정보 수집·이용 및 예매 취소 규정에 동의합니다
              </span>
            </label>

            {/* 결제 버튼 */}
            <div className="payment-actions">
              {/* 실제 PC 연동용 */}
              <button className="btn btn-primary" onClick={handleRealPayment}>
                <FiCreditCard />
                결제하기 (PC 연동용)
              </button>

              {/* 개발용 */}
              <button className="btn btn-dev" onClick={handleDevPayment}>
                결제 완료 테스트 (개발용)
              </button>
            </div>

          </div>
          {/* ━━━━━ 우측 끝 ━━━━━ */}

        </div>
        {/* ── 2분할 끝 ── */}

      </div>
    </div>
  );
};

export default MovieBooking;
