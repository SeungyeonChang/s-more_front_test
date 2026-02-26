// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiCalendar, FiMapPin, FiStar, FiTrendingUp, FiCloud } from 'react-icons/fi';
// import '../../styles/Home.css';

// const Home = () => {
//   const [weather, setWeather] = useState({
//     temp: 23,
//     condition: '맑음',
//     icon: '☀️'
//   });

//   const popularSites = [
//     {
//       id: 1,
//       name: 'A구역 - 산 전망',
//       image: 'https://via.placeholder.com/400x300',
//       rating: 4.8,
//       price: 50000,
//       tags: ['전기', '주차', '애견동반']
//     },
//     {
//       id: 2,
//       name: 'B구역 - 계곡 전망',
//       image: 'https://via.placeholder.com/400x300',
//       rating: 4.9,
//       price: 60000,
//       tags: ['전기', '주차', '와이파이']
//     },
//     {
//       id: 3,
//       name: 'C구역 - 숲 속',
//       image: 'https://via.placeholder.com/400x300',
//       rating: 4.7,
//       price: 45000,
//       tags: ['전기', '애견동반']
//     },
//     {
//       id: 4,
//       name: 'D구역 - 호수 뷰',
//       image: 'https://via.placeholder.com/400x300',
//       rating: 4.9,
//       price: 70000,
//       tags: ['전기', '주차', '와이파이', '샤워실']
//     }
//   ];

//   const promotions = [
//     {
//       id: 1,
//       title: '🎉 주말 특별 할인',
//       description: '이번 주말 예약 시 30% 할인',
//       image: 'https://via.placeholder.com/800x300',
//       color: '#FF6B6B'
//     },
//     {
//       id: 2,
//       title: '🌟 신규 회원 혜택',
//       description: '첫 예약 20% 할인 쿠폰',
//       image: 'https://via.placeholder.com/800x300',
//       color: '#4ECDC4'
//     }
//   ];

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>자연과 함께하는 힐링 캠핑</h1>
//           <p>편안한 휴식과 즐거운 추억을 만들어보세요</p>
          
//           {/* Quick Booking */}
//           <div className="quick-booking">
//             <div className="booking-input">
//               <FiCalendar />
//               <input type="date" placeholder="체크인" />
//             </div>
//             <div className="booking-input">
//               <FiCalendar />
//               <input type="date" placeholder="체크아웃" />
//             </div>
//             <div className="booking-input">
//               <FiMapPin />
//               <select>
//                 <option>전체 구역</option>
//                 <option>A구역</option>
//                 <option>B구역</option>
//                 <option>C구역</option>
//                 <option>D구역</option>
//               </select>
//             </div>
//             <Link to="/sites" className="btn btn-primary">
//               예약하기
//             </Link>
//           </div>
//         </div>
//       </section>

//       <div className="container">
//         {/* Weather Widget */}
//         <section className="weather-widget">
//           <div className="weather-card">
//             <div className="weather-icon">{weather.icon}</div>
//             <div className="weather-info">
//               <h3>현재 날씨</h3>
//               <p className="temp">{weather.temp}°C</p>
//               <p className="condition">{weather.condition}</p>
//             </div>
//             <Link to="/weather" className="btn btn-outline">
//               상세 보기
//             </Link>
//           </div>
//           <Link to="/ai-hub" className="ai-recommend-banner">
//             <FiTrendingUp />
//             <div>
//               <h4>AI 추천</h4>
//               <p>날씨에 맞는 최적의 사이트를 추천받아보세요</p>
//             </div>
//           </Link>
//         </section>

//         {/* Promotions */}
//         <section className="promotions-section">
//           <h2 className="section-title">🎁 진행중인 프로모션</h2>
//           <div className="promotions-grid">
//             {promotions.map(promo => (
//               <div 
//                 key={promo.id} 
//                 className="promotion-card"
//                 style={{ borderLeftColor: promo.color }}
//               >
//                 <h3>{promo.title}</h3>
//                 <p>{promo.description}</p>
//                 <button className="btn btn-primary">자세히 보기</button>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Popular Sites */}
//         <section className="popular-sites-section">
//           <div className="section-header">
//             <h2 className="section-title">⭐ 인기 사이트</h2>
//             <Link to="/sites" className="view-all">전체보기 →</Link>
//           </div>
          
//           <div className="sites-grid">
//             {popularSites.map(site => (
//               <Link to={`/sites/${site.id}`} key={site.id} className="site-card">
//                 <div className="site-image">
//                   <img src={site.image} alt={site.name} />
//                   <div className="site-rating">
//                     <FiStar fill="gold" color="gold" />
//                     <span>{site.rating}</span>
//                   </div>
//                 </div>
//                 <div className="site-info">
//                   <h3>{site.name}</h3>
//                   <div className="site-tags">
//                     {site.tags.map((tag, idx) => (
//                       <span key={idx} className="tag">{tag}</span>
//                     ))}
//                   </div>
//                   <div className="site-price">
//                     <span className="price">{site.price.toLocaleString()}원</span>
//                     <span className="period">/1박</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Quick Links */}
//         <section className="quick-links-section">
//           <h2 className="section-title">🚀 바로가기</h2>
//           <div className="quick-links-grid">
//             <Link to="/menu" className="quick-link-card">
//               <div className="quick-link-icon">🍔</div>
//               <h4>메뉴 주문</h4>
//               <p>캠핑 음식 & 용품</p>
//             </Link>
//             <Link to="/movie-hub" className="quick-link-card">
//               <div className="quick-link-icon">🎬</div>
//               <h4>영화 상영</h4>
//               <p>야외 영화 일정</p>
//             </Link>
//             <Link to="/game" className="quick-link-card">
//               <div className="quick-link-icon">🎮</div>
//               <h4>게임</h4>
//               <p>보물찾기 & 미니게임</p>
//             </Link>
//             <Link to="/community" className="quick-link-card">
//               <div className="quick-link-icon">👥</div>
//               <h4>커뮤니티</h4>
//               <p>후기 & 캠핑 메이트</p>
//             </Link>
//           </div>
//         </section>

//         {/* Features */}
//         <section className="features-section">
//           <h2 className="section-title">✨ 왜 저희 캠핑장인가요?</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">🏕️</div>
//               <h4>프리미엄 시설</h4>
//               <p>깨끗하고 편안한 캠핑 환경</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🤖</div>
//               <h4>AI 맞춤 추천</h4>
//               <p>개인화된 사이트 추천</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🚗</div>
//               <h4>편리한 주차</h4>
//               <p>구역별 전용 주차 공간</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">💬</div>
//               <h4>24/7 고객지원</h4>
//               <p>언제든 도움을 드립니다</p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiCalendar, FiChevronRight, FiChevronLeft, FiCloud } from 'react-icons/fi';
// import '../../styles/Home.css';

// const Home = () => {
//   const navigate = useNavigate();
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');

//   // 슬라이더 ref
//   const placesSliderRef = useRef(null);
//   const postsSliderRef = useRef(null);
//   const moviesSliderRef = useRef(null);

//   /**
//    * 📌 슬라이더 스크롤 함수
//    */
//   const handleScroll = (ref, direction) => {
//     if (ref.current) {
//       const scrollAmount = ref.current.offsetWidth; // 현재 보이는 너비만큼 스크롤
//       ref.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       });
//     }
//   };

//   /**
//    * 📌 예약하기 버튼
//    */
//   const handleReservation = () => {
//     if (!checkIn || !checkOut) {
//       alert('체크인/체크아웃 날짜를 선택해주세요.');
//       return;
//     }

//     navigate('/sites', {
//       state: { checkIn, checkOut }
//     });
//   };

//   /**
//    * 📌 AI 기상캐스터
//    */
//   const handleWeatherCast = () => {
//     navigate('/weather');
//   };

//   /**
//    * 📌 인기 PLACE 더미 데이터
//    */
//   const popularPlaces = [
//     {
//       id: 1,
//       name: '숲속의 오두막',
//       image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
//       price: 80000,
//       rating: 4.8,
//       tags: ['조용한', '가족']
//     },
//     {
//       id: 2,
//       name: '호수뷰 캠핑존',
//       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
//       price: 120000,
//       rating: 4.9,
//       tags: ['전망좋은', '커플']
//     },
//     {
//       id: 3,
//       name: '별빛 글램핑',
//       image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=600',
//       price: 150000,
//       rating: 5.0,
//       tags: ['럭셔리', '파티']
//     },
//     {
//       id: 4,
//       name: '계곡 힐링존',
//       image: 'https://images.unsplash.com/photo-1537565732175-4b3e2c1c8b7f?w=600',
//       price: 90000,
//       rating: 4.7,
//       tags: ['시원한', '자연']
//     },
//     {
//       id: 5,
//       name: '산정상 캠핑장',
//       image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
//       price: 110000,
//       rating: 4.6,
//       tags: ['등산', '전망']
//     },
//     {
//       id: 6,
//       name: '해변 글램핑',
//       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
//       price: 140000,
//       rating: 4.9,
//       tags: ['바다', '일몰']
//     }
//   ];

//   /**
//    * 📌 인기 게시글 더미 데이터
//    */
//   const popularPosts = [
//     {
//       id: 1,
//       title: '가족 캠핑 필수 준비물 체크리스트',
//       author: '캠핑러버',
//       views: 1253,
//       comments: 42,
//       image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400'
//     },
//     {
//       id: 2,
//       title: '비 오는 날 캠핑 꿀팁 대공개',
//       author: '아웃도어킹',
//       views: 2104,
//       comments: 68,
//       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
//     },
//     {
//       id: 3,
//       title: '초보자를 위한 캠핑 가이드',
//       author: '산림이',
//       views: 3521,
//       comments: 125,
//       image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=400'
//     },
//     {
//       id: 4,
//       title: '캠핑장 야경 포토존 추천',
//       author: '사진작가김',
//       views: 892,
//       comments: 31,
//       image: 'https://images.unsplash.com/photo-1537565732175-4b3e2c1c8b7f?w=400'
//     },
//     {
//       id: 5,
//       title: '겨울 캠핑 난방 꿀팁',
//       author: '겨울캠퍼',
//       views: 1567,
//       comments: 54,
//       image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400'
//     },
//     {
//       id: 6,
//       title: '캠핑 요리 레시피 10선',
//       author: '캠핑셰프',
//       views: 2891,
//       comments: 78,
//       image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
//     }
//   ];

//   /**
//    * 📌 새로운 영화 더미 데이터
//    */
//   const newMovies = [
//     {
//       id: 1,
//       title: '인터스텔라',
//       poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
//       rating: 9.2,
//       genre: 'SF'
//     },
//     {
//       id: 2,
//       title: '노매드랜드',
//       poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
//       rating: 8.5,
//       genre: '드라마'
//     },
//     {
//       id: 3,
//       title: '캐스트 어웨이',
//       poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
//       rating: 8.8,
//       genre: '어드벤처'
//     },
//     {
//       id: 4,
//       title: '캠핑의 신',
//       poster: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
//       rating: 7.9,
//       genre: '코미디'
//     },
//     {
//       id: 5,
//       title: '야생의 부르심',
//       poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
//       rating: 8.3,
//       genre: '어드벤처'
//     },
//     {
//       id: 6,
//       title: '포레스트 검프',
//       poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
//       rating: 9.0,
//       genre: '드라마'
//     }
//   ];

//   return (
//     <div className="home-page">
//       {/* 히어로 섹션 */}
//       <section className="hero-section">
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1 className="hero-title">자연과 함께하는 힐링 캠핑</h1>
//           <p className="hero-subtitle">편안한 휴식과 즐거운 추억을 만들어 보세요</p>

//           {/* 예약 검색 박스 */}
//           <div className="search-box">
//             <div className="search-field">
//               <label>
//                 <FiCalendar />
//                 <span>체크인</span>
//               </label>
//               <input
//                 type="date"
//                 value={checkIn}
//                 onChange={(e) => setCheckIn(e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//               />
//             </div>

//             <div className="search-field">
//               <label>
//                 <FiCalendar />
//                 <span>체크아웃</span>
//               </label>
//               <input
//                 type="date"
//                 value={checkOut}
//                 onChange={(e) => setCheckOut(e.target.value)}
//                 min={checkIn || new Date().toISOString().split('T')[0]}
//               />
//             </div>

//             <button className="btn-search" onClick={handleReservation}>
//               예약하기
//             </button>
//           </div>

//           {/* AI 기상캐스터 버튼 */}
//           <button className="btn-weather" onClick={handleWeatherCast}>
//             <FiCloud />
//             <span>AI 기상캐스터</span>
//           </button>
//         </div>
//       </section>

//       {/* 프로모션 섹션 */}
//       <section className="promotions-section">
//         <div className="container">
//           <h2 className="section-title">진행중인 프로모션</h2>
//           <div className="promotions-grid">
//             <div className="promotion-card promo-1">
//               <div className="promotion-badge">주말 특가</div>
//               <h3>주말 특별 할인</h3>
//               <p>주말 예약 시 30% 할인</p>
//               <button className="btn-detail">
//                 자세히 보기
//                 <FiChevronRight />
//               </button>
//             </div>

//             <div className="promotion-card promo-2">
//               <div className="promotion-badge">신규 회원</div>
//               <h3>신규 회원 혜택</h3>
//               <p>첫 예약 포인트 5000p 추가 적립</p>
//               <button className="btn-detail">
//                 자세히 보기
//                 <FiChevronRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 인기 PLACE 섹션 */}
//       <section className="places-section">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">인기 PLACE</h2>
//             <button className="btn-view-all" onClick={() => navigate('/sites')}>
//               전체보기
//               <FiChevronRight />
//             </button>
//           </div>

//           <div className="slider-wrapper">
//             <button 
//               className="slider-btn prev" 
//               onClick={() => handleScroll(placesSliderRef, 'left')}
//             >
//               <FiChevronLeft />
//             </button>

//             <div className="slider-container" ref={placesSliderRef}>
//               {popularPlaces.map((place) => (
//                 <div key={place.id} className="place-card" onClick={() => navigate(`/sites/${place.id}`)}>
//                   <div className="place-image">
//                     <img src={place.image} alt={place.name} />
//                     <div className="place-rating">⭐ {place.rating}</div>
//                   </div>
//                   <div className="place-info">
//                     <h3>{place.name}</h3>
//                     <div className="place-tags">
//                       {place.tags.map((tag, idx) => (
//                         <span key={idx} className="tag">#{tag}</span>
//                       ))}
//                     </div>
//                     <p className="place-price">{place.price.toLocaleString()}원 / 박</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button 
//               className="slider-btn next" 
//               onClick={() => handleScroll(placesSliderRef, 'right')}
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 인기 게시글 섹션 */}
//       <section className="posts-section">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">인기 게시글</h2>
//             <button className="btn-view-all" onClick={() => navigate('/community')}>
//               전체보기
//               <FiChevronRight />
//             </button>
//           </div>

//           <div className="slider-wrapper">
//             <button 
//               className="slider-btn prev" 
//               onClick={() => handleScroll(postsSliderRef, 'left')}
//             >
//               <FiChevronLeft />
//             </button>

//             <div className="slider-container" ref={postsSliderRef}>
//               {popularPosts.map((post) => (
//                 <div key={post.id} className="post-card" onClick={() => navigate(`/community/${post.id}`)}>
//                   <img src={post.image} alt={post.title} />
//                   <div className="post-content">
//                     <h3>{post.title}</h3>
//                     <div className="post-meta">
//                       <span className="author">{post.author}</span>
//                       <span className="stats">👁️ {post.views} 💬 {post.comments}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button 
//               className="slider-btn next" 
//               onClick={() => handleScroll(postsSliderRef, 'right')}
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 새로운 영화 섹션 */}
//       <section className="movies-section">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">새로운 영화</h2>
//             <button className="btn-view-all" onClick={() => navigate('/movies')}>
//               전체보기
//               <FiChevronRight />
//             </button>
//           </div>

//           <div className="slider-wrapper">
//             <button 
//               className="slider-btn prev" 
//               onClick={() => handleScroll(moviesSliderRef, 'left')}
//             >
//               <FiChevronLeft />
//             </button>

//             <div className="slider-container" ref={moviesSliderRef}>
//               {newMovies.map((movie) => (
//                 <div key={movie.id} className="movie-card" onClick={() => navigate(`/movies/${movie.id}`)}>
//                   <div className="movie-poster">
//                     <img src={movie.poster} alt={movie.title} />
//                     <div className="movie-rating">⭐ {movie.rating}</div>
//                   </div>
//                   <div className="movie-info">
//                     <h3>{movie.title}</h3>
//                     <span className="genre">{movie.genre}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button 
//               className="slider-btn next" 
//               onClick={() => handleScroll(moviesSliderRef, 'right')}
//             >
//               <FiChevronRight />
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiChevronRight, FiChevronLeft, FiCloud } from 'react-icons/fi';
import '../../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // 슬라이더 ref
  const placesSliderRef = useRef(null);
  const postsSliderRef = useRef(null);
  const moviesSliderRef = useRef(null);

  /**
   * 📌 슬라이더 스크롤 함수
   */
  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  /**
   * 📌 예약하기 버튼
   */
  const handleReservation = () => {
    if (!checkIn || !checkOut) {
      alert('체크인/체크아웃 날짜를 선택해주세요.');
      return;
    }

    navigate('/sites', {
      state: { checkIn, checkOut }
    });
  };

  /**
   * 📌 AI 기상캐스터
   */
  const handleWeatherCast = () => {
    navigate('/weather');
  };

  /**
   * 📌 인기 PLACE 더미 데이터
   */
  const popularPlaces = [
    {
      id: 1,
      name: '숲속의 오두막',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
      price: 80000,
      rating: 4.8,
      tags: ['조용한', '가족']
    },
    {
      id: 2,
      name: '호수뷰 캠핑존',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
      price: 120000,
      rating: 4.9,
      tags: ['전망좋은', '커플']
    },
    {
      id: 3,
      name: '별빛 글램핑',
      image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=600',
      price: 150000,
      rating: 5.0,
      tags: ['럭셔리', '파티']
    },
    {
      id: 4,
      name: '계곡 힐링존',
      image: 'https://images.unsplash.com/photo-1537565732175-4b3e2c1c8b7f?w=600',
      price: 90000,
      rating: 4.7,
      tags: ['시원한', '자연']
    },
    {
      id: 5,
      name: '산정상 캠핑장',
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
      price: 110000,
      rating: 4.6,
      tags: ['등산', '전망']
    },
    {
      id: 6,
      name: '해변 글램핑',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
      price: 140000,
      rating: 4.9,
      tags: ['바다', '일몰']
    }
  ];

  /**
   * 📌 인기 게시글 더미 데이터
   */
  const popularPosts = [
    {
      id: 1,
      title: '가족 캠핑 필수 준비물 체크리스트',
      author: '캠핑러버',
      views: 1253,
      comments: 42,
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400'
    },
    {
      id: 2,
      title: '비 오는 날 캠핑 꿀팁 대공개',
      author: '아웃도어킹',
      views: 2104,
      comments: 68,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
    },
    {
      id: 3,
      title: '초보자를 위한 캠핑 가이드',
      author: '산림이',
      views: 3521,
      comments: 125,
      image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=400'
    },
    {
      id: 4,
      title: '캠핑장 야경 포토존 추천',
      author: '사진작가김',
      views: 892,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1537565732175-4b3e2c1c8b7f?w=400'
    },
    {
      id: 5,
      title: '겨울 캠핑 난방 꿀팁',
      author: '겨울캠퍼',
      views: 1567,
      comments: 54,
      image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400'
    },
    {
      id: 6,
      title: '캠핑 요리 레시피 10선',
      author: '캠핑셰프',
      views: 2891,
      comments: 78,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
    }
  ];

  /**
   * 📌 새로운 영화 더미 데이터
   */
  const newMovies = [
    {
      id: 1,
      title: '인터스텔라',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      rating: 9.2,
      genre: 'SF'
    },
    {
      id: 2,
      title: '노매드랜드',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      rating: 8.5,
      genre: '드라마'
    },
    {
      id: 3,
      title: '캐스트 어웨이',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
      rating: 8.8,
      genre: '어드벤처'
    },
    {
      id: 4,
      title: '캠핑의 신',
      poster: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
      rating: 7.9,
      genre: '코미디'
    },
    {
      id: 5,
      title: '야생의 부르심',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
      rating: 8.3,
      genre: '어드벤처'
    },
    {
      id: 6,
      title: '포레스트 검프',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
      rating: 9.0,
      genre: '드라마'
    }
  ];

  return (
    <div className="home-page">
      {/* 히어로 섹션 */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">자연과 함께하는 힐링 캠핑</h1>
          <p className="hero-subtitle">편안한 휴식과 즐거운 추억을 만들어 보세요</p>

          {/* 예약 검색 박스 */}
          <div className="search-box">
            <div className="search-field">
              <label>
                {/* <FiCalendar /> */}
                <span>체크인</span>
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="search-field">
              <label>
                {/* <FiCalendar /> */}
                <span>체크아웃</span>
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>

            <button className="btn-search" onClick={handleReservation}>
              예약하기
            </button>
          </div>
        </div>
      </section>

      {/* ✅ AI 기상캐스터 섹션 (프로모션 위로 이동) */}
      <section className="weather-section">
        <div className="container">
          <button className="btn-weather-card" onClick={handleWeatherCast}>
            <div className="weather-icon">
              <FiCloud />
            </div>
            <div className="weather-content">
              <h3>AI 기상캐스터</h3>
              <p>캠핑장 날씨를 AI가 알려드립니다</p>
            </div>
            <FiChevronRight className="weather-arrow" />
          </button>
        </div>
      </section>

      {/* 프로모션 섹션 */}
      <section className="promotions-section">
        <div className="container">
          <h2 className="section-title">진행중인 프로모션</h2>
          <div className="promotions-grid">
            <div className="promotion-card promo-1">
              <div className="promotion-badge">주말 특가</div>
              <h3>주말 특별 할인</h3>
              <p>주말 예약 시 30% 할인</p>
              <button className="btn-detail">
                자세히 보기
                <FiChevronRight />
              </button>
            </div>

            <div className="promotion-card promo-2">
              <div className="promotion-badge">신규 회원</div>
              <h3>신규 회원 혜택</h3>
              <p>첫 예약 포인트 5000p 추가 적립</p>
              <button className="btn-detail">
                자세히 보기
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 PLACE 섹션 */}
      <section className="places-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">인기 PLACE</h2>
            <button className="btn-view-all" onClick={() => navigate('/sites')}>
              전체보기
              <FiChevronRight />
            </button>
          </div>

          <div className="slider-wrapper">
            <button 
              className="slider-btn prev" 
              onClick={() => handleScroll(placesSliderRef, 'left')}
            >
              <FiChevronLeft />
            </button>

            <div className="slider-container" ref={placesSliderRef}>
              {popularPlaces.map((place) => (
                <div key={place.id} className="place-card" onClick={() => navigate(`/sites/${place.id}`)}>
                  <div className="place-image">
                    <img src={place.image} alt={place.name} />
                    <div className="place-rating">⭐ {place.rating}</div>
                  </div>
                  <div className="place-info">
                    <h3>{place.name}</h3>
                    <div className="place-tags">
                      {place.tags.map((tag, idx) => (
                        <span key={idx} className="tag">#{tag}</span>
                      ))}
                    </div>
                    <p className="place-price">{place.price.toLocaleString()}원 / 박</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="slider-btn next" 
              onClick={() => handleScroll(placesSliderRef, 'right')}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* 인기 게시글 섹션 */}
      <section className="posts-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">인기 게시글</h2>
            <button className="btn-view-all" onClick={() => navigate('/community')}>
              전체보기
              <FiChevronRight />
            </button>
          </div>

          <div className="slider-wrapper">
            <button 
              className="slider-btn prev" 
              onClick={() => handleScroll(postsSliderRef, 'left')}
            >
              <FiChevronLeft />
            </button>

            <div className="slider-container" ref={postsSliderRef}>
              {popularPosts.map((post) => (
                <div key={post.id} className="post-card" onClick={() => navigate(`/community/${post.id}`)}>
                  <img src={post.image} alt={post.title} />
                  <div className="post-content">
                    <h3>{post.title}</h3>
                    <div className="post-meta">
                      <span className="author">{post.author}</span>
                      <span className="stats">👁️ {post.views} 💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="slider-btn next" 
              onClick={() => handleScroll(postsSliderRef, 'right')}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* 새로운 영화 섹션 */}
      <section className="movies-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">새로운 영화</h2>
            <button className="btn-view-all" onClick={() => navigate('/movies')}>
              전체보기
              <FiChevronRight />
            </button>
          </div>

          <div className="slider-wrapper">
            <button 
              className="slider-btn prev" 
              onClick={() => handleScroll(moviesSliderRef, 'left')}
            >
              <FiChevronLeft />
            </button>

            <div className="slider-container" ref={moviesSliderRef}>
              {newMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => navigate(`/movies/${movie.id}`)}>
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                    <div className="movie-rating">⭐ {movie.rating}</div>
                  </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <span className="genre">{movie.genre}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="slider-btn next" 
              onClick={() => handleScroll(moviesSliderRef, 'right')}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
