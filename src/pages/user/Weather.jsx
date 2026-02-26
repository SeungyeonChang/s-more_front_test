import React, { useState } from 'react';
import { FiCloud, FiSun, FiDroplet, FiWind, FiEye } from 'react-icons/fi';
import '../../styles/Weather.css';

const Weather = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const currentWeather = {
    temp: 15,
    condition: '맑음',
    icon: '☀️',
    feelsLike: 13,
    humidity: 45,
    wind: 3.2,
    visibility: 10,
    uvIndex: 3,
    sunrise: '07:15',
    sunset: '18:30'
  };

  const hourlyForecast = [
    { time: '09:00', temp: 12, condition: '☀️', precipitation: 0 },
    { time: '12:00', temp: 15, condition: '☀️', precipitation: 0 },
    { time: '15:00', temp: 16, condition: '🌤️', precipitation: 10 },
    { time: '18:00', temp: 14, condition: '🌥️', precipitation: 20 },
    { time: '21:00', temp: 10, condition: '🌙', precipitation: 0 },
    { time: '00:00', temp: 8, condition: '🌙', precipitation: 0 }
  ];

  const weeklyForecast = [
    { day: '오늘', date: '2/4', high: 16, low: 8, condition: '☀️', precipitation: 10 },
    { day: '내일', date: '2/5', high: 18, low: 10, condition: '🌤️', precipitation: 20 },
    { day: '목', date: '2/6', high: 15, low: 9, condition: '🌥️', precipitation: 30 },
    { day: '금', date: '2/7', high: 12, low: 7, condition: '🌧️', precipitation: 60 },
    { day: '토', date: '2/8', high: 14, low: 8, condition: '🌤️', precipitation: 20 },
    { day: '일', date: '2/9', high: 16, low: 10, condition: '☀️', precipitation: 10 },
    { day: '월', date: '2/10', high: 17, low: 11, condition: '☀️', precipitation: 5 }
  ];

  const campingRecommendation = {
    score: 85,
    status: 'excellent',
    message: '캠핑하기 최적의 날씨입니다!',
    tips: [
      '일교차가 크니 여벌 옷을 챙기세요',
      '자외선이 강하니 선크림을 준비하세요',
      '오후 시간대 야외활동을 추천합니다'
    ]
  };

  return (
    <div className="weather-page">
      <div className="container">
        <h1>🌤️ 날씨 정보</h1>

        {/* Current Weather */}
        <div className="current-weather">
          <div className="weather-main">
            <div className="weather-icon-large">{currentWeather.icon}</div>
            <div className="weather-temp">
              <span className="temp-value">{currentWeather.temp}</span>
              <span className="temp-unit">°C</span>
            </div>
            <div className="weather-condition">{currentWeather.condition}</div>
            <div className="feels-like">체감온도 {currentWeather.feelsLike}°C</div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <FiDroplet />
              <div>
                <span className="detail-label">습도</span>
                <span className="detail-value">{currentWeather.humidity}%</span>
              </div>
            </div>
            <div className="detail-item">
              <FiWind />
              <div>
                <span className="detail-label">풍속</span>
                <span className="detail-value">{currentWeather.wind} m/s</span>
              </div>
            </div>
            <div className="detail-item">
              <FiEye />
              <div>
                <span className="detail-label">가시거리</span>
                <span className="detail-value">{currentWeather.visibility} km</span>
              </div>
            </div>
            <div className="detail-item">
              <FiSun />
              <div>
                <span className="detail-label">자외선</span>
                <span className="detail-value">보통</span>
              </div>
            </div>
          </div>

          <div className="sun-times">
            <div className="sun-time">
              <span className="sun-icon">🌅</span>
              <div>
                <span className="sun-label">일출</span>
                <span className="sun-value">{currentWeather.sunrise}</span>
              </div>
            </div>
            <div className="sun-time">
              <span className="sun-icon">🌇</span>
              <div>
                <span className="sun-label">일몰</span>
                <span className="sun-value">{currentWeather.sunset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Camping Recommendation */}
        <div className={`camping-recommendation ${campingRecommendation.status}`}>
          <div className="recommendation-header">
            <div className="recommendation-score">
              <div className="score-circle">
                <span className="score-value">{campingRecommendation.score}</span>
                <span className="score-max">/100</span>
              </div>
            </div>
            <div className="recommendation-message">
              <h3>캠핑 추천도</h3>
              <p>{campingRecommendation.message}</p>
            </div>
          </div>
          <div className="recommendation-tips">
            <h4>추천 팁</h4>
            <ul>
              {campingRecommendation.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="hourly-forecast">
          <h2>시간별 예보</h2>
          <div className="hourly-scroll">
            {hourlyForecast.map((hour, idx) => (
              <div key={idx} className="hour-card">
                <span className="hour-time">{hour.time}</span>
                <span className="hour-icon">{hour.condition}</span>
                <span className="hour-temp">{hour.temp}°</span>
                <div className="hour-precipitation">
                  <FiDroplet size={12} />
                  <span>{hour.precipitation}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Forecast */}
        <div className="weekly-forecast">
          <h2>주간 예보</h2>
          <div className="week-list">
            {weeklyForecast.map((day, idx) => (
              <div
                key={idx}
                className={`week-card ${selectedDay === idx ? 'selected' : ''}`}
                onClick={() => setSelectedDay(idx)}
              >
                <div className="week-day">
                  <strong>{day.day}</strong>
                  <span>{day.date}</span>
                </div>
                <div className="week-icon">{day.condition}</div>
                <div className="week-temp">
                  <span className="temp-high">{day.high}°</span>
                  <span className="temp-low">{day.low}°</span>
                </div>
                <div className="week-precipitation">
                  <FiDroplet size={14} />
                  <span>{day.precipitation}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="weather-alerts">
          <h2>날씨 알림</h2>
          <div className="alert-card info">
            <div className="alert-icon">ℹ️</div>
            <div className="alert-content">
              <h4>일교차 주의</h4>
              <p>오늘 낮과 밤의 기온차가 8°C입니다. 따뜻한 옷을 준비하세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
