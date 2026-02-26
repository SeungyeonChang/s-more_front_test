import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiClock, FiCalendar, FiFilm, FiX, FiCheckCircle } from 'react-icons/fi';
import '../../styles/AdminMovie.css';

const AdminMovie = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: '인터스텔라',
      director: '크리스토퍼 놀란',
      genre: 'SF',
      duration: 169,
      rating: '12세 관람가',
      releaseYear: 2014,
      posterUrl: 'https://via.placeholder.com/300x450?text=인터스텔라',
      description: '우주를 횡단하는 인류의 마지막 희망',
      status: 'active'
    },
    {
      id: 2,
      title: '라라랜드',
      director: '데이미언 차젤레',
      genre: '뮤지컬/로맨스',
      duration: 128,
      rating: '12세 관람가',
      releaseYear: 2016,
      posterUrl: 'https://via.placeholder.com/300x450?text=라라랜드',
      description: '꿈을 꾸는 사람들을 위한 별들의 도시 이야기',
      status: 'active'
    },
    {
      id: 3,
      title: '겨울왕국 2',
      director: '크리스 벅',
      genre: '애니메이션',
      duration: 103,
      rating: '전체 관람가',
      releaseYear: 2019,
      posterUrl: 'https://via.placeholder.com/300x450?text=겨울왕국2',
      description: '엘사와 안나의 새로운 모험',
      status: 'active'
    }
  ]);

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      movieId: 1,
      date: '2026-02-10',
      startTime: '19:00',
      location: '야외극장 A',
      maxSeats: 50,
      bookedSeats: 32,
      status: 'scheduled'
    },
    {
      id: 2,
      movieId: 2,
      date: '2026-02-10',
      startTime: '21:30',
      location: '야외극장 A',
      maxSeats: 50,
      bookedSeats: 28,
      status: 'scheduled'
    },
    {
      id: 3,
      movieId: 3,
      date: '2026-02-11',
      startTime: '18:00',
      location: '야외극장 B',
      maxSeats: 30,
      bookedSeats: 30,
      status: 'full'
    },
    {
      id: 4,
      movieId: 1,
      date: '2026-02-11',
      startTime: '20:30',
      location: '야외극장 A',
      maxSeats: 50,
      bookedSeats: 15,
      status: 'scheduled'
    },
    {
      id: 5,
      movieId: 2,
      date: '2026-02-08',
      startTime: '19:00',
      location: '야외극장 A',
      maxSeats: 50,
      bookedSeats: 50,
      status: 'completed'
    }
  ]);

  const [movieFormData, setMovieFormData] = useState({
    title: '',
    director: '',
    genre: '',
    duration: '',
    rating: '전체 관람가',
    releaseYear: new Date().getFullYear(),
    posterUrl: '',
    description: '',
    status: 'active'
  });

  const [scheduleFormData, setScheduleFormData] = useState({
    movieId: '',
    date: '',
    startTime: '',
    location: '야외극장 A',
    maxSeats: 50
  });

  const [statistics, setStatistics] = useState({
    totalMovies: 12,
    activeMovies: 8,
    upcomingScreenings: 15,
    totalBookings: 287
  });

  // 영화 추가/수정
  const handleMovieSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode && selectedMovie) {
      setMovies(movies.map(m => 
        m.id === selectedMovie.id 
          ? { ...movieFormData, id: selectedMovie.id }
          : m
      ));
      alert('영화가 수정되었습니다!');
    } else {
      const newMovie = {
        id: movies.length + 1,
        ...movieFormData
      };
      setMovies([...movies, newMovie]);
      alert('영화가 추가되었습니다!');
    }
    
    closeMovieModal();
  };

  // 영화 삭제
  const handleDeleteMovie = (id) => {
    if (window.confirm('이 영화를 삭제하시겠습니까?')) {
      setMovies(movies.filter(m => m.id !== id));
      // 해당 영화의 스케줄도 삭제
      setSchedules(schedules.filter(s => s.movieId !== id));
      alert('영화가 삭제되었습니다.');
    }
  };

  // 스케줄 추가
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    
    const newSchedule = {
      id: schedules.length + 1,
      ...scheduleFormData,
      bookedSeats: 0,
      status: 'scheduled'
    };
    
    setSchedules([...schedules, newSchedule]);
    alert('상영 일정이 추가되었습니다!');
    closeScheduleModal();
  };

  // 스케줄 삭제
  const handleDeleteSchedule = (id) => {
    const schedule = schedules.find(s => s.id === id);
    if (schedule.bookedSeats > 0) {
      if (!window.confirm('예약된 좌석이 있습니다. 정말 삭제하시겠습니까?')) {
        return;
      }
    }
    
    setSchedules(schedules.filter(s => s.id !== id));
    alert('상영 일정이 삭제되었습니다.');
  };

  // 영화 모달 열기
  const openMovieModal = (movie = null) => {
    if (movie) {
      setIsEditMode(true);
      setSelectedMovie(movie);
      setMovieFormData(movie);
    } else {
      setIsEditMode(false);
      setSelectedMovie(null);
      setMovieFormData({
        title: '',
        director: '',
        genre: '',
        duration: '',
        rating: '전체 관람가',
        releaseYear: new Date().getFullYear(),
        posterUrl: '',
        description: '',
        status: 'active'
      });
    }
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setIsEditMode(false);
    setSelectedMovie(null);
  };

  // 스케줄 모달 열기
  const openScheduleModal = () => {
    setScheduleFormData({
      movieId: '',
      date: '',
      startTime: '',
      location: '야외극장 A',
      maxSeats: 50
    });
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
  };

  // 영화 제목 가져오기
  const getMovieTitle = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    return movie ? movie.title : '알 수 없음';
  };

  // 스케줄 상태 뱃지
  const getScheduleStatusBadge = (status) => {
    const badges = {
      scheduled: { text: '예정', class: 'status-scheduled' },
      full: { text: '매진', class: 'status-full' },
      completed: { text: '종료', class: 'status-completed' },
      cancelled: { text: '취소', class: 'status-cancelled' }
    };
    return badges[status] || badges.scheduled;
  };

  // 주간 스케줄 데이터 생성
  const getWeeklySchedule = () => {
    const today = new Date();
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      weekDays.push({
        date: date.toISOString().split('T')[0],
        dayName: ['일', '월', '화', '수', '목', '금', '토'][date.getDay()],
        schedules: schedules.filter(s => s.date === date.toISOString().split('T')[0])
      });
    }
    
    return weekDays;
  };

  const weeklySchedule = getWeeklySchedule();

  return (
    <div className="admin-movie">
      <div className="page-header">
        <div>
          <h1>🎬 영화 관리</h1>
          <p>야외 영화 상영 관리 시스템</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={openScheduleModal}>
            <FiCalendar />
            상영 일정 추가
          </button>
          <button className="btn btn-primary" onClick={() => openMovieModal()}>
            <FiPlus />
            영화 추가
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="movie-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiFilm />
          </div>
          <div className="stat-content">
            <span className="stat-label">전체 영화</span>
            <span className="stat-value">{statistics.totalMovies}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <FiCheckCircle />
          </div>
          <div className="stat-content">
            <span className="stat-label">상영 중</span>
            <span className="stat-value">{statistics.activeMovies}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <span className="stat-label">예정된 상영</span>
            <span className="stat-value">{statistics.upcomingScreenings}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiClock />
          </div>
          <div className="stat-content">
            <span className="stat-label">총 예약 수</span>
            <span className="stat-value">{statistics.totalBookings}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
          onClick={() => setActiveTab('movies')}
        >
          영화 목록
        </button>
        <button
          className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          상영 일정
        </button>
        <button
          className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          주간 스케줄표
        </button>
      </div>

      {/* Movies List */}
      {activeTab === 'movies' && (
        <div className="movies-grid">
          {movies.map(movie => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} />
                <div className="movie-overlay">
                  <button 
                    className="action-btn edit"
                    onClick={() => openMovieModal(movie)}
                  >
                    <FiEdit />
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDeleteMovie(movie.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span className="genre-badge">{movie.genre}</span>
                  <span className="rating-badge">{movie.rating}</span>
                </div>
                <p className="director">감독: {movie.director}</p>
                <p className="duration">
                  <FiClock /> {movie.duration}분 · {movie.releaseYear}
                </p>
                <p className="description">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedule List */}
      {activeTab === 'schedule' && (
        <div className="schedule-table">
          <table>
            <thead>
              <tr>
                <th>영화</th>
                <th>날짜</th>
                <th>시간</th>
                <th>장소</th>
                <th>예약 현황</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {schedules
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(schedule => {
                  const movie = movies.find(m => m.id === schedule.movieId);
                  const statusBadge = getScheduleStatusBadge(schedule.status);
                  const occupancyRate = Math.round((schedule.bookedSeats / schedule.maxSeats) * 100);
                  
                  return (
                    <tr key={schedule.id}>
                      <td>
                        <div className="schedule-movie">
                          {movie && <img src={movie.posterUrl} alt={movie.title} />}
                          <strong>{getMovieTitle(schedule.movieId)}</strong>
                        </div>
                      </td>
                      <td>{schedule.date}</td>
                      <td>
                        <span className="time-badge">
                          <FiClock />
                          {schedule.startTime}
                        </span>
                      </td>
                      <td>
                        <span className="location-badge">{schedule.location}</span>
                      </td>
                      <td>
                        <div className="booking-info">
                          <div className="booking-text">
                            {schedule.bookedSeats} / {schedule.maxSeats}석
                            <span className="occupancy-rate">({occupancyRate}%)</span>
                          </div>
                          <div className="booking-progress">
                            <div 
                              className="booking-bar" 
                              style={{ width: `${occupancyRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            title="삭제"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Weekly Schedule Table */}
      {activeTab === 'weekly' && (
        <div className="weekly-schedule">
          <div className="schedule-grid">
            {weeklySchedule.map((day, index) => (
              <div key={index} className="day-column">
                <div className="day-header">
                  <span className="day-name">{day.dayName}</span>
                  <span className="day-date">{day.date.slice(5)}</span>
                </div>
                <div className="day-schedules">
                  {day.schedules.length > 0 ? (
                    day.schedules.map(schedule => {
                      const movie = movies.find(m => m.id === schedule.movieId);
                      const statusBadge = getScheduleStatusBadge(schedule.status);
                      
                      return (
                        <div key={schedule.id} className={`schedule-item ${schedule.status}`}>
                          <div className="schedule-time">{schedule.startTime}</div>
                          <div className="schedule-movie-title">{getMovieTitle(schedule.movieId)}</div>
                          <div className="schedule-location">{schedule.location}</div>
                          <div className="schedule-seats">
                            {schedule.bookedSeats}/{schedule.maxSeats}석
                          </div>
                          <span className={`schedule-status ${statusBadge.class}`}>
                            {statusBadge.text}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-schedule">상영 없음</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Movie Modal */}
      {showMovieModal && (
        <div className="modal-overlay" onClick={closeMovieModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{isEditMode ? '영화 수정' : '영화 추가'}</h2>
              <button className="close-btn" onClick={closeMovieModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleMovieSubmit} className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>영화 제목 *</label>
                  <input
                    type="text"
                    value={movieFormData.title}
                    onChange={(e) => setMovieFormData({ ...movieFormData, title: e.target.value })}
                    placeholder="예: 인터스텔라"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>감독 *</label>
                  <input
                    type="text"
                    value={movieFormData.director}
                    onChange={(e) => setMovieFormData({ ...movieFormData, director: e.target.value })}
                    placeholder="예: 크리스토퍼 놀란"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>장르 *</label>
                  <input
                    type="text"
                    value={movieFormData.genre}
                    onChange={(e) => setMovieFormData({ ...movieFormData, genre: e.target.value })}
                    placeholder="예: SF, 액션, 드라마"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>상영 시간 (분) *</label>
                  <input
                    type="number"
                    value={movieFormData.duration}
                    onChange={(e) => setMovieFormData({ ...movieFormData, duration: e.target.value })}
                    placeholder="예: 120"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>관람 등급 *</label>
                  <select
                    value={movieFormData.rating}
                    onChange={(e) => setMovieFormData({ ...movieFormData, rating: e.target.value })}
                  >
                    <option value="전체 관람가">전체 관람가</option>
                    <option value="12세 관람가">12세 관람가</option>
                    <option value="15세 관람가">15세 관람가</option>
                    <option value="청소년 관람불가">청소년 관람불가</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>개봉 연도 *</label>
                  <input
                    type="number"
                    value={movieFormData.releaseYear}
                    onChange={(e) => setMovieFormData({ ...movieFormData, releaseYear: e.target.value })}
                    min="1900"
                    max={new Date().getFullYear() + 5}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>포스터 URL</label>
                <input
                  type="url"
                  value={movieFormData.posterUrl}
                  onChange={(e) => setMovieFormData({ ...movieFormData, posterUrl: e.target.value })}
                  placeholder="https://example.com/poster.jpg"
                />
              </div>

              <div className="form-group">
                <label>영화 소개</label>
                <textarea
                  value={movieFormData.description}
                  onChange={(e) => setMovieFormData({ ...movieFormData, description: e.target.value })}
                  placeholder="영화에 대한 간단한 소개를 입력하세요"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>상태</label>
                <select
                  value={movieFormData.status}
                  onChange={(e) => setMovieFormData({ ...movieFormData, status: e.target.value })}
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeMovieModal}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? '수정하기' : '추가하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal-overlay" onClick={closeScheduleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>상영 일정 추가</h2>
              <button className="close-btn" onClick={closeScheduleModal}>
                <FiX />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="modal-body">
              <div className="form-group">
                <label>영화 선택 *</label>
                <select
                  value={scheduleFormData.movieId}
                  onChange={(e) => setScheduleFormData({ ...scheduleFormData, movieId: parseInt(e.target.value) })}
                  required
                >
                  <option value="">영화를 선택하세요</option>
                  {movies.filter(m => m.status === 'active').map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title} ({movie.duration}분)
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>상영 날짜 *</label>
                  <input
                    type="date"
                    value={scheduleFormData.date}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>시작 시간 *</label>
                  <input
                    type="time"
                    value={scheduleFormData.startTime}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, startTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>상영 장소 *</label>
                  <select
                    value={scheduleFormData.location}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, location: e.target.value })}
                  >
                    <option value="야외극장 A">야외극장 A</option>
                    <option value="야외극장 B">야외극장 B</option>
                    <option value="실내극장">실내극장</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>최대 좌석 수 *</label>
                  <input
                    type="number"
                    value={scheduleFormData.maxSeats}
                    onChange={(e) => setScheduleFormData({ ...scheduleFormData, maxSeats: parseInt(e.target.value) })}
                    min="1"
                    max="100"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={closeScheduleModal}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  추가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovie;
