import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiFilter, FiMap, FiList, FiStar, FiUsers, FiWifi, FiZap } from 'react-icons/fi';
import '../../styles/SiteList.css';

const SiteList = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [filters, setFilters] = useState({
    date: '',
    priceRange: [0, 100000],
    capacity: '',
    facilities: [],
    rating: 0
  });
  const [sortBy, setSortBy] = useState('popular');

  const sites = [
    {
      id: 1,
      name: 'A구역 - 산 전망',
      description: '아름다운 산 전망과 함께하는 프리미엄 캠핑',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.8,
      reviews: 156,
      price: 50000,
      capacity: 4,
      facilities: ['전기', '주차', '애견동반', '와이파이'],
      available: true,
      location: '1구역'
    },
    {
      id: 2,
      name: 'B구역 - 계곡 전망',
      description: '시원한 계곡 소리와 함께하는 힐링 캠핑',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.9,
      reviews: 203,
      price: 60000,
      capacity: 6,
      facilities: ['전기', '주차', '와이파이', '샤워실'],
      available: true,
      location: '2구역'
    },
    {
      id: 3,
      name: 'C구역 - 숲 속',
      description: '조용하고 프라이빗한 숲 속 캠핑',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.7,
      reviews: 98,
      price: 45000,
      capacity: 4,
      facilities: ['전기', '애견동반'],
      available: true,
      location: '3구역'
    },
    {
      id: 4,
      name: 'D구역 - 호수 뷰',
      description: '탁 트인 호수 전망의 럭셔리 캠핑',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.9,
      reviews: 178,
      price: 70000,
      capacity: 6,
      facilities: ['전기', '주차', '와이파이', '샤워실', 'BBQ'],
      available: false,
      location: '4구역'
    },
    {
      id: 5,
      name: 'E구역 - 별빛 테라스',
      description: '별빛 관찰에 최적화된 개방형 사이트',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.8,
      reviews: 145,
      price: 55000,
      capacity: 5,
      facilities: ['전기', '주차', '와이파이'],
      available: true,
      location: '5구역'
    },
    {
      id: 6,
      name: 'F구역 - 가족 캠핑존',
      description: '어린이 놀이터와 가까운 패밀리 사이트',
      image: 'https://via.placeholder.com/400x300',
      rating: 4.6,
      reviews: 89,
      price: 48000,
      capacity: 6,
      facilities: ['전기', '주차', '애견동반'],
      available: true,
      location: '6구역'
    }
  ];

  const facilityIcons = {
    '전기': <FiZap />,
    '와이파이': <FiWifi />,
    '주차': '🚗',
    '애견동반': '🐕',
    '샤워실': '🚿',
    'BBQ': '🍖'
  };

  


  return (
    <div className="site-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>캠핑 사이트</h1>
            <p>{sites.length}개의 사이트가 있습니다</p>
          </div>
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <FiList /> 리스트
            </button>
            <button 
              className={viewMode === 'map' ? 'active' : ''}
              onClick={() => setViewMode('map')}
            >
              <FiMap /> 지도
            </button>
          </div>
        </div>

        <div className="site-list-container">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3><FiCalendar /> 예약 날짜</h3>
              <div className="date-range-inline">
                <input
                  type="date"
                  value={filters.checkIn || ''}
                  onChange={(e) => setFilters({...filters, checkIn: e.target.value})}
                  className="date-inline-input"
                  placeholder="체크인"
                />
                <span className="date-divider">~</span>
                <input
                  type="date"
                  value={filters.checkOut || ''}
                  onChange={(e) => setFilters({...filters, checkOut: e.target.value})}
                  min={filters.checkIn || ''}
                  className="date-inline-input"
                  placeholder="체크아웃"
                />
              </div>
            </div>

            <div className="filter-section">
              <h3><FiFilter /> 가격</h3>
              <div className="price-filter">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters, 
                    priceRange: [0, parseInt(e.target.value)]
                  })}
                />
                <div className="price-range">
                  <span>0원</span>
                  <span>{filters.priceRange[1].toLocaleString()}원</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3><FiUsers /> 인원</h3>
              <select 
                value={filters.capacity}
                onChange={(e) => setFilters({...filters, capacity: e.target.value})}
              >
                <option value="">전체</option>
                <option value="2">2인</option>
                <option value="4">4인</option>
                <option value="6">6인 이상</option>
              </select>
            </div>

            <div className="filter-section">
              <h3>시설</h3>
              <div className="facility-checkboxes">
                {['전기', '주차', '와이파이', '애견동반', '샤워실', 'BBQ'].map(facility => (
                  <label key={facility}>
                    <input
                      type="checkbox"
                      checked={filters.facilities.includes(facility)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            facilities: [...filters.facilities, facility]
                          });
                        } else {
                          setFilters({
                            ...filters,
                            facilities: filters.facilities.filter(f => f !== facility)
                          });
                        }
                      }}
                    />
                    <span>{facility}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3><FiStar /> 평점</h3>
              <div className="rating-filter">
                {[5, 4, 3].map(rating => (
                  <label key={rating}>
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating}
                      onChange={() => setFilters({...filters, rating})}
                    />
                    <span>
                      {Array.from({length: 5}).map((_, i) => (
                        <FiStar
                          key={i}
                          fill={i < rating ? 'gold' : 'none'}
                          color={i < rating ? 'gold' : '#ccc'}
                        />
                      ))}
                      이상
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-outline btn-block"
              onClick={() => setFilters({
                search: '',
                priceRange: [0, 100000],
                capacity: '',
                facilities: [],
                rating: 0
              })}
            >
              필터 초기화
            </button>
          </aside>

          {/* Site List/Map */}
          <div className="sites-content">
            <div className="sort-bar">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">인기순</option>
                <option value="price-low">가격 낮은순</option>
                <option value="price-high">가격 높은순</option>
                <option value="rating">평점순</option>
              </select>
            </div>

            {viewMode === 'grid' ? (
              <div className="sites-grid">
                {sites.map(site => (
                  <Link to={`/sites/${site.id}`} key={site.id} className="site-card">
                    <div className="site-card-image">
                      <img src={site.image} alt={site.name} />
                      {!site.available && (
                        <div className="unavailable-badge">예약 마감</div>
                      )}
                      <div className="site-card-rating">
                        <FiStar fill="gold" color="gold" />
                        <span>{site.rating}</span>
                        <span className="reviews">({site.reviews})</span>
                      </div>
                    </div>
                    <div className="site-card-content">
                      <h3>{site.name}</h3>
                      <p className="site-description">{site.description}</p>
                      <div className="site-facilities">
                        {site.facilities.slice(0, 4).map((facility, idx) => (
                          <span key={idx} className="facility-tag">
                            {facilityIcons[facility]} {facility}
                          </span>
                        ))}
                        {site.facilities.length > 4 && (
                          <span className="more">+{site.facilities.length - 4}</span>
                        )}
                      </div>
                      <div className="site-card-footer">
                        <div className="site-capacity">
                          <FiUsers /> 최대 {site.capacity}인
                        </div>
                        <div className="site-price">
                          <span className="price">{site.price.toLocaleString()}원</span>
                          <span className="period">/1박</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="map-view">
                <div className="map-placeholder">
                  <FiMap size={48} />
                  <p>지도 뷰는 준비 중입니다</p>
                  <Link to="/map" className="btn btn-primary">
                    전체 지도 보기
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteList;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiUsers, FiMapPin, FiCheck, FiX } from 'react-icons/fi';
// import '../../styles/SiteList.css';

// const SiteList = () => {
//   const { id } = useParams(); // sites/:id에서 id 받기
//   const navigate = useNavigate();
  
//   // 사이트 데이터 (각 사이트별 최대 인원, 반려동물 가능 여부 설정)
//   const sites = [
//     {
//       id: 0,
//       name: 'A-12 강변 글램핑',
//       type: 'glamping',
//       maxPeople: 6, // 최대 6명
//       petFriendly: true,
//       basePrice: 80000,
//       image: 'https://via.placeholder.com/400x250',
//       facilities: ['샤워실', '전기', '주차'],
//       freePeople: 4 // 4명까지 무료, 그 이상은 추가비용
//     },
//     {
//       id: 1,
//       name: 'B-05 텐트 사이트',
//       type: 'tent',
//       maxPeople: 4, // 최대 4명
//       petFriendly: false,
//       basePrice: 50000,
//       image: 'https://via.placeholder.com/400x250',
//       facilities: ['화장실', '주차'],
//       freePeople: 2 // 2명까지 무료, 그 이상은 추가비용
//     },
//     {
//       id: 2,
//       name: 'C-08 카라반',
//       type: 'caravan',
//       maxPeople: 6,
//       petFriendly: true,
//       basePrice: 100000,
//       image: 'https://via.placeholder.com/400x250',
//       facilities: ['샤워실', '전기', '주방', '주차'],
//       freePeople: 4
//     },
//     {
//       id: 3,
//       name: 'D-03 오토캠핑',
//       type: 'auto',
//       maxPeople: 4,
//       petFriendly: false,
//       basePrice: 60000,
//       image: 'https://via.placeholder.com/400x250',
//       facilities: ['전기', '주차'],
//       freePeople: 2
//     }
//   ];

//   const currentSite = sites.find(site => site.id === Number(id));
  
//   const [people, setPeople] = useState(2);
//   const [hasPet, setHasPet] = useState(false);
//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   // 가격 계산 로직
//   const calculatePrice = () => {
//     if (!currentSite) return 0;

//     const nights = getNights();
//     if (nights <= 0) return 0;

//     let totalPrice = currentSite.basePrice * nights;

//     // 인원 추가 비용 계산
//     const extraPeople = Math.max(0, people - currentSite.freePeople);
//     if (extraPeople > 0) {
//       totalPrice += extraPeople * 15000 * nights; // 1인당 15,000원 추가
//     }

//     // 반려동물 추가 비용 (반려동물 가능 사이트에서만)
//     if (hasPet && currentSite.petFriendly) {
//       totalPrice += 20000 * nights; // 반려동물 1마리당 20,000원
//     }

//     return totalPrice;
//   };

//   const getNights = () => {
//     if (!checkInDate || !checkOutDate) return 0;
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);
//     return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
//   };

//   const getPriceBreakdown = () => {
//     if (!currentSite) return [];

//     const nights = getNights();
//     if (nights <= 0) return [];

//     const breakdown = [];
    
//     breakdown.push({
//       label: '기본 요금',
//       price: currentSite.basePrice * nights,
//       nights
//     });

//     // 인원 추가 비용
//     const extraPeople = Math.max(0, people - currentSite.freePeople);
//     if (extraPeople > 0) {
//       breakdown.push({
//         label: `${extraPeople}명 추가 인원 (${extraPeople} × ${currentSite.freePeople + 1}명 기준)`,
//         price: extraPeople * 15000 * nights
//       });
//     }

//     // 반려동물 비용
//     if (hasPet && currentSite.petFriendly) {
//       breakdown.push({
//         label: '반려동물',
//         price: 20000 * nights
//       });
//     }

//     return breakdown;
//   };

//   if (!currentSite) {
//     return (
//       <div className="site-list-page">
//         <div className="container">
//           <h1>사이트를 찾을 수 없습니다.</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="site-list-page">
//       <div className="container">
//         {/* 사이트 상세 정보 */}
//         <div className="site-header">
//           <div className="site-image">
//             <img src={currentSite.image} alt={currentSite.name} />
//           </div>
//           <div className="site-info">
//             <h1>{currentSite.name}</h1>
//             <div className="site-type">{currentSite.type === 'glamping' ? '글램핑' : 
//                                       currentSite.type === 'tent' ? '텐트' : 
//                                       currentSite.type === 'caravan' ? '카라반' : '오토캠핑'}</div>
//             <div className="site-capacity">
//               <FiUsers /> 최대 {currentSite.maxPeople}명 
//               {currentSite.petFriendly && <span className="pet-badge">반려동물 가능</span>}
//             </div>
//             <div className="site-facilities">
//               {currentSite.facilities.map((facility, idx) => (
//                 <span key={idx} className="facility-tag">{facility}</span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 예약 폼 */}
//         <div className="reservation-form">
//           <div className="form-section">
//             <h2>예약 정보</h2>
            
//             <div className="date-inputs">
//               <div className="form-group">
//                 <label>체크인</label>
//                 <input
//                   type="date"
//                   value={checkInDate}
//                   onChange={(e) => setCheckInDate(e.target.value)}
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>체크아웃</label>
//                 <input
//                   type="date"
//                   value={checkOutDate}
//                   onChange={(e) => setCheckOutDate(e.target.value)}
//                   min={checkInDate || new Date().toISOString().split('T')[0]}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>인원 수 ({currentSite.freePeople}명까지 무료)</label>
//               <div className="people-selector">
//                 <button 
//                   type="button"
//                   onClick={() => setPeople(Math.max(1, people - 1))}
//                   className="counter-btn"
//                 >
//                   -
//                 </button>
//                 <span>{people}명</span>
//                 <button 
//                   type="button"
//                   onClick={() => setPeople(Math.min(currentSite.maxPeople, people + 1))}
//                   className="counter-btn"
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="capacity-info">
//                 최대 {currentSite.maxPeople}명 / {currentSite.freePeople}명까지 기본 요금에 포함
//               </p>
//             </div>

//             {currentSite.petFriendly && (
//               <div className="form-group checkbox-group">
//                 <label>
//                   <input
//                     type="checkbox"
//                     checked={hasPet}
//                     onChange={(e) => setHasPet(e.target.checked)}
//                   />
//                   반려동물 동반 (박당 +20,000원)
//                 </label>
//               </div>
//             )}
//           </div>

//           <div className="form-section">
//             <h2>예약자 정보</h2>
//             <div className="form-group">
//               <label>이름</label>
//               <input
//                 type="text"
//                 placeholder="예약자 이름을 입력하세요"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="form-group">
//               <label>연락처</label>
//               <input
//                 type="tel"
//                 placeholder="예: 010-1234-5678"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* 가격 내역 */}
//         <div className="price-breakdown">
//           <h2>결제 금액</h2>
//           {getNights() > 0 ? (
//             <div className="price-list">
//               {getPriceBreakdown().map((item, idx) => (
//                 <div key={idx} className="price-item">
//                   <span>{item.label}</span>
//                   <span>{item.price.toLocaleString()}원</span>
//                 </div>
//               ))}
//               <div className="price-total">
//                 <span>총 {getNights()}박</span>
//                 <span className="total-amount">{calculatePrice().toLocaleString()}원</span>
//               </div>
//             </div>
//           ) : (
//             <p className="no-price">날짜를 선택해주세요</p>
//           )}
//         </div>

//         {/* 예약 버튼 */}
//         <div className="reserve-actions">
//           <button 
//             className="btn btn-outline"
//             onClick={() => navigate('/sites')}
//           >
//             목록으로
//           </button>
//           <button 
//             className="btn btn-primary"
//             disabled={!name || !phone || getNights() <= 0}
//           >
//             예약하기 ({calculatePrice().toLocaleString()}원)
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteList;
