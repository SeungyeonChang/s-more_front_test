import React, { useState } from 'react';
import { FiMapPin, FiCloud, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import '../../styles/AIHub.css';

const AIHub = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    capacity: '4',
    budget: '50000',
    weather: 'sunny',
    activities: []
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const activities = ['등산', '낚시', '바비큐', '사진촬영', '별보기', '수영'];

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleActivityToggle = (activity) => {
    setPreferences({
      ...preferences,
      activities: preferences.activities.includes(activity)
        ? preferences.activities.filter(a => a !== activity)
        : [...preferences.activities, activity]
    });
  };

  const handleGetRecommendations = () => {
    setLoading(true);
    
    // AI 추천 로직 시뮬레이션
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          site: 'A구역 - 산 전망',
          score: 95,
          reason: '현재 날씨와 선호하시는 활동에 최적화된 장소입니다.',
          price: 50000,
          image: 'https://via.placeholder.com/300x200',
          features: ['등산 코스 인접', '맑은 날씨 예상', '사진 촬영 명소']
        },
        {
          id: 2,
          site: 'E구역 - 별빛 테라스',
          score: 88,
          reason: '별보기에 최적화된 개방형 사이트입니다.',
          price: 55000,
          image: 'https://via.placeholder.com/300x200',
          features: ['별 관측 최적', '개방형 구조', '조용한 환경']
        },
        {
          id: 3,
          site: 'B구역 - 계곡 전망',
          score: 82,
          reason: '시원한 계곡과 바비큐 시설이 갖춰져 있습니다.',
          price: 60000,
          image: 'https://via.placeholder.com/300x200',
          features: ['BBQ 그릴 제공', '계곡 인접', '시원한 환경']
        }
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="ai-hub-page">
      <div className="container">
        {/* Header */}
        <div className="ai-hub-header">
          <h1>🤖 AI 추천</h1>
          <p>인공지능이 회원님께 최적의 캠핑 사이트를 추천해드립니다</p>
        </div>

        <div className="ai-hub-container">
          {/* Preferences Panel */}
          <div className="preferences-panel">
            <h2>선호도 설정</h2>

            <div className="preference-group">
              <label>
                <FiCalendar />
                인원
              </label>
              <select
                name="capacity"
                value={preferences.capacity}
                onChange={handlePreferenceChange}
              >
                <option value="2">2인</option>
                <option value="4">4인</option>
                <option value="6">6인 이상</option>
              </select>
            </div>

            <div className="preference-group">
              <label>
                <FiTrendingUp />
                예산
              </label>
              <input
                type="range"
                name="budget"
                min="30000"
                max="100000"
                step="5000"
                value={preferences.budget}
                onChange={handlePreferenceChange}
              />
              <div className="budget-display">
                {parseInt(preferences.budget).toLocaleString()}원
              </div>
            </div>

            <div className="preference-group">
              <label>
                <FiCloud />
                선호 날씨
              </label>
              <select
                name="weather"
                value={preferences.weather}
                onChange={handlePreferenceChange}
              >
                <option value="sunny">맑음</option>
                <option value="cloudy">흐림</option>
                <option value="rainy">비</option>
                <option value="any">상관없음</option>
              </select>
            </div>

            <div className="preference-group">
              <label>
                <FiMapPin />
                선호 활동
              </label>
              <div className="activities-grid">
                {activities.map(activity => (
                  <button
                    key={activity}
                    className={`activity-btn ${
                      preferences.activities.includes(activity) ? 'active' : ''
                    }`}
                    onClick={() => handleActivityToggle(activity)}
                  >
                    {activity}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleGetRecommendations}
              disabled={loading}
            >
              {loading ? '분석중...' : 'AI 추천 받기'}
            </button>
          </div>

          {/* Recommendations */}
          <div className="recommendations-panel">
            <h2>추천 결과</h2>

            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>AI가 최적의 사이트를 분석중입니다...</p>
              </div>
            )}

            {!loading && recommendations.length === 0 && (
              <div className="empty-state">
                <p>선호도를 설정하고 AI 추천을 받아보세요</p>
              </div>
            )}

            {!loading && recommendations.length > 0 && (
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={rec.id} className="recommendation-card">
                    <div className="rec-badge">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      <span className="rec-score">{rec.score}점</span>
                    </div>
                    
                    <img src={rec.image} alt={rec.site} />
                    
                    <div className="rec-content">
                      <h3>{rec.site}</h3>
                      <p className="rec-reason">{rec.reason}</p>
                      
                      <div className="rec-features">
                        {rec.features.map((feature, idx) => (
                          <span key={idx} className="feature-tag">
                            ✓ {feature}
                          </span>
                        ))}
                      </div>

                      <div className="rec-footer">
                        <span className="rec-price">
                          {rec.price.toLocaleString()}원/1박
                        </span>
                        <button className="btn btn-primary">예약하기</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Features */}
        <div className="ai-features">
          <h2>AI 추천 시스템의 특징</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>개인화 추천</h3>
              <p>회원님의 선호도를 분석하여 맞춤 추천</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌤️</div>
              <h3>날씨 기반 분석</h3>
              <p>실시간 날씨 데이터를 활용한 추천</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>데이터 기반</h3>
              <p>수천 개의 리뷰 데이터 분석</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>실시간 업데이트</h3>
              <p>최신 정보를 반영한 즉각적인 추천</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHub;
