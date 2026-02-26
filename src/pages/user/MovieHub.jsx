import React, { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUsers } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../styles/MovieHub.css';

const MovieHub = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('2026-02-19');

  const movies = [
    {
      id: 1,
      title: '겨울왕국 3',
      genre: '애니메이션',
      rating: 'ALL',
      duration: 120,
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_face/uEf3xmua3482lLjX3U0NrrZEWR6.jpg/300x400',
      description: '엘사와 안나의 새로운 모험이 펼쳐집니다.',
      screenings: [
        { time: '14:00', seats: 36, available: 20 },
        { time: '19:00', seats: 36, available: 8 },
      ]
    },
    {
      id: 2,
      title: '인터스텔라',
      genre: 'SF',
      rating: '12',
      duration: 169,
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_face/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg/300x400',
      description: '우주를 배경으로 한 감동적인 SF 대작',
      screenings: [
        { time: '16:00', seats: 36, available: 15 },
        { time: '21:00', seats: 36, available: 0 },
      ]
    },
    {
      id: 3,
      title: '코코',
      genre: '애니메이션',
      rating: 'ALL',
      duration: 105,
      poster: 'https://media.themoviedb.org/t/p/w300_and_h450_face/pQu93NuwR90AaCULzglVD5Ge4Ml.jpg/300x400',
      description: '가족의 소중함을 일깨워주는 감동 애니메이션',
      screenings: [
        { time: '11:00', seats: 36, available: 30 },
        { time: '18:00', seats: 36, available: 22 },
      ]
    }
  ];

  /**
   * 📌 좌석 상태 반환 함수
   * - 0석: 매진
   * - 1~9석: 마감임박
   * - 10석 이상: 여유
   */
  const getSeatStatus = (available) => {
    if (available === 0) return { label: '매진', className: 'sold-out' };
    if (available <= 9) return { label: `잔여 ${available}석`, className: 'limited' };
    return { label: `잔여 ${available}석`, className: 'available' };
  };

  /**
   * 📌 예매 버튼 클릭 핸들러
   */
  const handleReservation = (movie, screening) => {
    if (screening.available === 0) {
      alert('예약 가능한 좌석이 없습니다.');
      return;
    }
    navigate(`/movies/${movie.id}/book`, {
    // navigate(`/movies/${movie.id}`, {
    // navigate(`/movies/${movie.id}/book/${screening.id}`, {
      state: { movie, screening, selectedDate }
    });
  };

  return (
    <div className="movie-hub-page">
      <div className="container">

        {/* ===== 헤더 ===== */}
        <div className="movie-hub-header">
          <h1>실내 영화 상영</h1>
          <p>캠핑장 내 프리미엄 실내 영화관에서 특별한 영화 경험을 즐겨보세요</p>
        </div>

        {/* ===== 날짜 선택 ===== */}
        <div className="date-filter">
          <label>
            <FiCalendar />
            <span>상영 날짜</span>
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* ===== 오늘의 상영작 ===== */}
        <div className="movies-section">
          <h2>오늘의 상영작</h2>
          <div className="user-movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">

                {/* 포스터 */}
                <div className="movie-poster">
                  <img src={movie.poster} alt={movie.title} />
                  <span className="movie-rating-badge">{movie.rating}</span>
                </div>

                {/* 영화 정보 */}
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <div className="movie-meta">
                    <span className="genre">{movie.genre}</span>
                    <span className="user-movie-duration">
                      <FiClock />
                      {movie.duration}분
                    </span>
                  </div>
                  <p className="movie-description">{movie.description}</p>

                  {/* 상영 시간 목록 */}
                  <div className="screenings">
                    <h4>상영 시간</h4>
                    {movie.screenings.map((screening, idx) => {
                      const status = getSeatStatus(screening.available);
                      return (
                        <div key={idx} className="screening-item">
                          <div className="screening-info">
                            <span className="screening-time">
                              <FiClock />
                              {screening.time}
                            </span>
                            <span className="screening-seats">
                              <FiUsers />
                              <span className={status.className}>{status.label}</span>
                              &nbsp;/ 총 {screening.seats}석
                            </span>
                          </div>
                          <button
                            className={`btn-reserve ${status.className}`}
                            onClick={() => handleReservation(movie, screening)}
                            disabled={screening.available === 0}
                          >
                            {screening.available === 0 ? '매진' : '예매'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 영화관 안내사항 ===== */}
        <div className="movie-info-section">
          <h2>영화관 안내사항</h2>
          <div className="info-grid">

            {/* 예약 안내 */}
            <div className="movie-info-card">
              <h3>🎟️ 예약 안내</h3>
              <ul>
                {/* <li>예약은 당일 현장 또는 앱에서 가능합니다</li> */}
                {/* <li>최대 입장 인원은 36명입니다</li> */}
                <li>예약 취소는 상영 1시간 전까지 가능합니다</li>
                <li>예약 확인증을 입장 시 제시해주세요</li>
                {/* <li>단체 예약(10인 이상)은 관리사무소에 문의하세요</li> */}
              </ul>
            </div>

            {/* 위치 및 시설 */}
            {/* <div className="movie-info-card">
              <h3>📍 위치 및 시설</h3>
              <ul>
                <li>위치: 캠핑장 A동 1층 영화관</li>
                <li>수용 인원: 최대 36명</li>
                <li>4K 프로젝터 및 돌비 사운드 시스템</li>
                <li>냉난방 완비된 실내 영화관</li>
                <li>영화 관람 중 간식 취식 가능</li>
              </ul>
            </div> */}

            {/* 유의사항 */}
            <div className="movie-info-card">
              <h3>⚠️ 유의사항</h3>
              <ul>
                {/* <li>상영 시작 10분 전까지 입장해주세요</li> */}
                {/* <li>상영 중 휴대폰 무음 모드 유지 필수</li> */}
                <li>음식물 반입은 매점 구매 상품만 허용</li>
                <li>만 12세 미만 어린이는 보호자 동반 필수</li>
                <li>시설 내 흡연은 엄격히 금지됩니다</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieHub;
