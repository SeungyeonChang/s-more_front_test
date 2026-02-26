// src/pages/user/MovieDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi';
import '../../styles/MovieDetail.css';

// 실제로는 공통 movies 데이터를 별도 파일/컨텍스트/서버에서 가져오는 게 좋지만,
// 일단은 MovieHub와 동일한 구조를 임시로 복붙해 둔 예시입니다.
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

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(movieId));

  if (!movie) {
    return (
      <div className="movie-detail-page">
        <div className="container">
          <p>영화를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const handleClickSchedule = (screening) => {
    navigate(`/movies/${movie.id}/book/${screening.id}`);
  };

  return (
    <div className="movie-detail-page">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> 목록으로 돌아가기
        </button>

        <div className="movie-detail-layout">
          <div className="movie-detail-poster">
            <img src={movie.poster} alt={movie.title} />
            <div className="movie-detail-rating">{movie.rating}</div>
          </div>

          <div className="movie-detail-info">
            <h1>{movie.title}</h1>
            <p className="movie-detail-genre">{movie.genre}</p>
            <p className="movie-detail-duration">
              <FiClock /> {movie.duration}분
            </p>
            <p className="movie-detail-description">{movie.description}</p>

            <div className="movie-detail-screenings">
              <h2>상영 일정</h2>
              {movie.screenings.map(screening => (
                <div
                  key={screening.id}
                  className="detail-screening-item"
                  onClick={() => handleClickSchedule(screening)}
                >
                  <div className="detail-screening-time">
                    <FiClock /> {screening.time}
                  </div>
                  <div className="detail-screening-location">
                    <FiMapPin /> {screening.location}
                  </div>
                  <div className={`detail-screening-seats ${screening.available < 10 ? 'limited' : ''}`}>
                    잔여 {screening.available}/{screening.seats}석
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
