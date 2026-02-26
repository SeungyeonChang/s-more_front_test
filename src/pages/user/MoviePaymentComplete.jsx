// src/pages/user/MoviePaymentComplete.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiFilm, FiClock, FiMapPin, FiUser } from 'react-icons/fi';
import '../../styles/MoviePaymentComplete.css';

const MoviePaymentComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const {
    movieTitle,
    time,
    location: place,
    people,
    totalPrice
  } = state;

  return (
    <div className="movie-complete-page">
      <div className="container">
        <div className="complete-card">
          <div className="complete-icon">
            <FiCheckCircle />
          </div>
          <h1>결제가 완료되었습니다</h1>
          <p className="complete-sub">
            즐거운 영화 관람 되세요!
          </p>

          <div className="complete-info">
            <div className="info-row">
              <span className="info-label">
                <FiFilm /> 영화
              </span>
              <span className="info-value">{movieTitle || '영화 정보 없음'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">
                <FiClock /> 시간
              </span>
              <span className="info-value">{time || '-'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">
                <FiMapPin /> 장소
              </span>
              <span className="info-value">{place || '-'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">
                <FiUser /> 인원
              </span>
              <span className="info-value">{people ? `${people}명` : '-'}</span>
            </div>
            <div className="info-row total">
              <span className="info-label">총 결제 금액</span>
              <span className="info-value">
                {totalPrice ? `${totalPrice.toLocaleString()}원` : '-'}
              </span>
            </div>
          </div>

          <div className="complete-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/movies')}
            >
              영화 목록으로
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/mypage')}
            >
              마이페이지로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePaymentComplete;
