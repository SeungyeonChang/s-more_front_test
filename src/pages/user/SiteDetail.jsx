// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiStar, FiUsers, FiMapPin, FiCheck, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../../styles/SiteDetail.css';

// const SiteDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [selectedDate, setSelectedDate] = useState({
//     checkIn: null,
//     checkOut: null
//   });
//   const [guests, setGuests] = useState(2);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const site = {
//     id: id,
//     name: 'A구역 - 산 전망',
//     description: '아름다운 산 전망과 함께하는 프리미엄 캠핑 사이트입니다.',
//     longDescription: '청정 자연 속에서 힐링할 수 있는 최고의 캠핑 장소입니다. 넓은 공간과 깨끗한 시설, 그리고 아름다운 산 전망이 어우러져 완벽한 캠핑 경험을 제공합니다.',
//     images: [
//       'https://via.placeholder.com/800x600',
//       'https://via.placeholder.com/800x600/4CAF50',
//       'https://via.placeholder.com/800x600/2196F3',
//       'https://via.placeholder.com/800x600/FF9800'
//     ],
//     rating: 4.8,
//     reviews: 156,
//     price: 50000,
//     capacity: { min: 2, max: 4 },
//     size: '10m x 10m',
//     facilities: [
//       { name: '전기', icon: '⚡' },
//       { name: '주차', icon: '🚗' },
//       { name: '애견동반', icon: '🐕' },
//       { name: '와이파이', icon: '📶' },
//       { name: '샤워실', icon: '🚿' },
//       { name: 'BBQ 그릴', icon: '🍖' }
//     ],
//     location: {
//       address: '강원도 홍천군 내면 광원리 123',
//       lat: 37.7749,
//       lng: 127.4194
//     },
//     rules: [
//       '체크인 14:00 / 체크아웃 12:00',
//       '정숙 시간 22:00 ~ 07:00',
//       '애완동물 동반 가능 (목줄 필수)',
//       '취사는 지정된 장소에서만 가능',
//       '쓰레기는 분리수거 필수'
//     ]
//   };

//   const reviews = [
//     {
//       id: 1,
//       user: '김철수',
//       rating: 5,
//       date: '2026-01-15',
//       comment: '정말 좋은 경험이었습니다! 전망도 좋고 시설도 깨끗해요.',
//       images: ['https://via.placeholder.com/100']
//     },
//     {
//       id: 2,
//       user: '이영희',
//       rating: 4,
//       date: '2026-01-10',
//       comment: '가족과 함께 좋은 시간 보냈어요. 다음에 또 오고 싶습니다.',
//       images: []
//     },
//     {
//       id: 3,
//       user: '박민수',
//       rating: 5,
//       date: '2026-01-05',
//       comment: '완벽한 캠핑장! 강력 추천합니다.',
//       images: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100']
//     }
//   ];

//   const handleReservation = () => {
//     if (!selectedDate.checkIn || !selectedDate.checkOut) {
//       alert('날짜를 선택해주세요.');
//       return;
//     }

//     navigate('/payment', {
//       state: {
//         site,
//         checkIn: selectedDate.checkIn,
//         checkOut: selectedDate.checkOut,
//         guests
//       }
//     });
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % site.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + site.images.length) % site.images.length);
//   };

//   return (
//     <div className="site-detail-page">
//       <div className="container">
//         {/* Image Gallery */}
//         <div className="image-gallery">
//           <div className="main-image">
//             <img src={site.images[currentImageIndex]} alt={site.name} />
//             <button className="image-nav prev" onClick={prevImage}>
//               <FiChevronLeft />
//             </button>
//             <button className="image-nav next" onClick={nextImage}>
//               <FiChevronRight />
//             </button>
//             <div className="image-counter">
//               {currentImageIndex + 1} / {site.images.length}
//             </div>
//           </div>
//           <div className="thumbnail-list">
//             {site.images.map((img, idx) => (
//               <img
//                 key={idx}
//                 src={img}
//                 alt={`${site.name} ${idx + 1}`}
//                 className={idx === currentImageIndex ? 'active' : ''}
//                 onClick={() => setCurrentImageIndex(idx)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="site-detail-container">
//           {/* Main Content */}
//           <div className="site-main-content">
//             {/* Header */}
//             <div className="site-header">
//               <h1>{site.name}</h1>
//               <div className="site-meta">
//                 <div className="rating">
//                   <FiStar fill="gold" color="gold" />
//                   <span className="rating-value">{site.rating}</span>
//                   <span className="reviews-count">({site.reviews}개 리뷰)</span>
//                 </div>
//                 <div className="location">
//                   <FiMapPin />
//                   <span>{site.location.address}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <section className="section">
//               <h2>소개</h2>
//               <p className="description">{site.description}</p>
//               <p className="long-description">{site.longDescription}</p>
//             </section>

//             {/* Facilities */}
//             <section className="section">
//               <h2>시설 정보</h2>
//               <div className="facilities-grid">
//                 {site.facilities.map((facility, idx) => (
//                   <div key={idx} className="facility-item">
//                     <span className="facility-icon">{facility.icon}</span>
//                     <span className="facility-name">{facility.name}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="site-specs">
//                 <div className="spec-item">
//                   <FiUsers />
//                   <span>수용 인원: {site.capacity.min}~{site.capacity.max}명</span>
//                 </div>
//                 <div className="spec-item">
//                   <FiMapPin />
//                   <span>사이트 크기: {site.size}</span>
//                 </div>
//               </div>
//             </section>

//             {/* Rules */}
//             <section className="section">
//               <h2>이용 규칙</h2>
//               <ul className="rules-list">
//                 {site.rules.map((rule, idx) => (
//                   <li key={idx}>
//                     <FiCheck />
//                     <span>{rule}</span>
//                   </li>
//                 ))}
//               </ul>
//             </section>

//             {/* Reviews */}
//             <section className="section">
//               <h2>리뷰 ({reviews.length})</h2>
//               <div className="reviews-list">
//                 {reviews.map(review => (
//                   <div key={review.id} className="review-item">
//                     <div className="review-header">
//                       <div>
//                         <strong>{review.user}</strong>
//                         <div className="review-rating">
//                           {Array.from({length: 5}).map((_, i) => (
//                             <FiStar
//                               key={i}
//                               fill={i < review.rating ? 'gold' : 'none'}
//                               color={i < review.rating ? 'gold' : '#ccc'}
//                               size={14}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                       <span className="review-date">{review.date}</span>
//                     </div>
//                     <p className="review-comment">{review.comment}</p>
//                     {review.images.length > 0 && (
//                       <div className="review-images">
//                         {review.images.map((img, idx) => (
//                           <img key={idx} src={img} alt="리뷰 이미지" />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <button className="btn btn-outline">리뷰 더보기</button>
//             </section>

//             {/* Map */}
//             <section className="section">
//               <h2>위치</h2>
//               <div className="map-container">
//                 <div className="map-placeholder">
//                   <FiMapPin size={48} />
//                   <p>{site.location.address}</p>
//                   <button className="btn btn-primary">지도에서 보기</button>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Booking Sidebar */}
//           <aside className="booking-sidebar">
//             <div className="booking-card">
//               <div className="price-info">
//                 <span className="price">{site.price.toLocaleString()}원</span>
//                 <span className="period">/1박</span>
//               </div>

//               <div className="booking-form">
//                 <div className="form-group">
//                   <label><FiCalendar /> 체크인 / 체크아웃</label>
//                   <Calendar
//                     onChange={(dates) => {
//                       if (Array.isArray(dates)) {
//                         setSelectedDate({
//                           checkIn: dates[0],
//                           checkOut: dates[1]
//                         });
//                       }
//                     }}
//                     selectRange={true}
//                     minDate={new Date()}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label><FiUsers /> 인원</label>
//                   <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
//                     {Array.from({length: site.capacity.max - site.capacity.min + 1}, (_, i) => i + site.capacity.min).map(n => (
//                       <option key={n} value={n}>{n}명</option>
//                     ))}
//                   </select>
//                 </div>

//                 {selectedDate.checkIn && selectedDate.checkOut && (
//                   <div className="booking-summary">
//                     <div className="summary-row">
//                       <span>체크인</span>
//                       <span>{selectedDate.checkIn.toLocaleDateString('ko-KR')}</span>
//                     </div>
//                     <div className="summary-row">
//                       <span>체크아웃</span>
//                       <span>{selectedDate.checkOut.toLocaleDateString('ko-KR')}</span>
//                     </div>
//                     <div className="summary-row">
//                       <span>숙박 일수</span>
//                       <span>{Math.ceil((selectedDate.checkOut - selectedDate.checkIn) / (1000 * 60 * 60 * 24))}박</span>
//                     </div>
//                     <div className="summary-row total">
//                       <span>총 금액</span>
//                       <span>{(site.price * Math.ceil((selectedDate.checkOut - selectedDate.checkIn) / (1000 * 60 * 60 * 24))).toLocaleString()}원</span>
//                     </div>
//                   </div>
//                 )}

//                 <button 
//                   className="btn btn-primary btn-block"
//                   onClick={handleReservation}
//                 >
//                   예약하기
//                 </button>
//               </div>

//               <div className="booking-notice">
//                 <p>✓ 예약 즉시 확정</p>
//                 <p>✓ 무료 취소 (3일 전까지)</p>
//                 <p>✓ 안전한 결제</p>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiUsers, FiMapPin, FiClock, FiDollarSign, FiCheck, FiX } from 'react-icons/fi';
// import { FaPaw } from 'react-icons/fa';  // FaPaw 추가 (Font Awesome)
// import '../../styles/SiteDetail.css';

// const SiteDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   // 사이트 데이터 (실제로는 백엔드에서 가져옴)
//   const siteData = {
//     0: {
//       id: 0,
//       name: 'A-12 강변 프리미엄',
//       type: '6인용',
//       maxPeople: 6,
//       freePeople: 4,
//       extraPrice: 10000,
//       petFriendly: true,
//       image: 'https://via.placeholder.com/800x500?text=A-12+강변+프리미엄',
//       facilities: ['전기', '샤워실', '화장실', '주차 2대'],
//       description: '강변 전망이 가장 좋은 프리미엄 사이트. 가족 여행에 최적화'
//     },
//     1: {
//       id: 1,
//       name: 'B-05 숲속 글램핑',
//       type: '4인용',
//       maxPeople: 4,
//       freePeople: 2,
//       extraPrice: 8000,
//       petFriendly: false,
//       image: 'https://via.placeholder.com/800x500?text=B-05+숲속+글램핑',
//       facilities: ['전기', '샤워실', '주차 1대'],
//       description: '울창한 숲속에 위치한 글램핑 사이트'
//     },
//     2: {
//       id: 2,
//       name: 'C-08 펫프렌들리',
//       type: '6인용',
//       maxPeople: 6,
//       freePeople: 4,
//       extraPrice: 12000,
//       petFriendly: true,
//       image: 'https://via.placeholder.com/800x500?text=C-08+펫프렌들리',
//       facilities: ['전기', '샤워실', '펫샤워실', '주차 2대'],
//       description: '반려동물과 함께하는 반려인 전용 사이트'
//     }
//   };

//   const site = siteData[id] || siteData[0];

//   const [people, setPeople] = useState(2);
//   const [pet, setPet] = useState(false);
//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   // 기본 날짜 설정
//   useEffect(() => {
//     const today = new Date().toISOString().split('T')[0];
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     setCheckInDate(today);
//     setCheckOutDate(tomorrow.toISOString().split('T')[0]);
//   }, []);

//   // 가격 계산
//   const calculatePrice = () => {
//     const nights = Math.ceil(
//       (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
//     );
//     const freeCount = Math.min(people, site.freePeople);
//     const extraCount = Math.max(0, people - site.freePeople);
    
//     const basePrice = 80000; // 기본 1박 가격
//     const totalBase = basePrice * nights;
//     const extraPriceTotal = extraCount * site.extraPrice * nights;
    
//     return {
//       nights,
//       basePrice: totalBase,
//       extraPrice: extraPriceTotal,
//       total: totalBase + extraPriceTotal,
//       freeCount,
//       extraCount
//     };
//   };

//   const priceInfo = calculatePrice();

//   const handlePeopleChange = (delta) => {
//     const newPeople = people + delta;
//     if (newPeople >= 1 && newPeople <= site.maxPeople) {
//       setPeople(newPeople);
//     }
//   };

//   const handleReserve = () => {
//     if (!name || !phone || !checkInDate || !checkOutDate) {
//       alert('모든 필수 정보를 입력해주세요.');
//       return;
//     }
//     if (new Date(checkInDate) >= new Date(checkOutDate)) {
//       alert('체크아웃 날짜는 체크인 날짜보다 늦어야 합니다.');
//       return;
//     }
//     if (pet && !site.petFriendly) {
//       alert('이 사이트는 반려동물 입장이 불가능합니다.');
//       return;
//     }

//     // 결제 페이지로 이동 (또는 모달)
//     navigate('/payment', {
//       state: {
//         site,
//         people,
//         pet,
//         checkInDate,
//         checkOutDate,
//         priceInfo,
//         customer: { name, phone }
//       }
//     });
//   };

//   const isPetDisabled = !site.petFriendly;

//   return (
//     <div className="site-detail-page">
//       <div className="container">
//         {/* 헤더 */}
//         <div className="site-header">
//           <button 
//             className="back-btn" 
//             onClick={() => navigate('/sites')}
//           >
//             ← 목록
//           </button>
//           <div className="site-title">
//             <h1>{site.name}</h1>
//             <span className={`site-type ${site.type === '6인용' ? 'large' : 'small'}`}>
//               {site.type}
//             </span>
//           </div>
//         </div>

//         <div className="site-detail-grid">
//           {/* 좌측: 이미지 + 시설 */}
//           <div className="site-visual">
//             <div className="main-image">
//               <img src={site.image} alt={site.name} />
//             </div>
//             <div className="facilities">
//               {site.facilities.map((facility, idx) => (
//                 <div key={idx} className="facility-item">
//                   <FiCheck /> {facility}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 우측: 예약 폼 */}
//           <div className="reservation-form">
//             <div className="form-section">
//               <h2>예약 정보</h2>
              
//               {/* 기간 선택 */}
//               <div className="date-row">
//                 <div className="form-group">
//                   <label>체크인</label>
//                   <input
//                     type="date"
//                     value={checkInDate}
//                     onChange={(e) => setCheckInDate(e.target.value)}
//                     min={new Date().toISOString().split('T')[0]}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>체크아웃</label>
//                   <input
//                     type="date"
//                     value={checkOutDate}
//                     onChange={(e) => setCheckOutDate(e.target.value)}
//                     min={checkInDate || new Date().toISOString().split('T')[0]}
//                   />
//                 </div>
//               </div>
//               <p className="nights">{priceInfo.nights}박</p>

//               {/* 인원 선택 */}
//               <div className="form-group">
//                 <label>인원 수 ({site.freePeople}명 무료)</label>
//                 <div className="people-selector">
//                   <button 
//                     className="count-btn" 
//                     onClick={() => handlePeopleChange(-1)}
//                     disabled={people <= 1}
//                   >
//                     -
//                   </button>
//                   <span className="count">{people}명</span>
//                   <button 
//                     className="count-btn" 
//                     onClick={() => handlePeopleChange(1)}
//                     disabled={people >= site.maxPeople}
//                   >
//                     +
//                   </button>
//                   <div className="people-info">
//                     <span className="free-count">{priceInfo.freeCount}명 무료</span>
//                     {priceInfo.extraCount > 0 && (
//                       <span className="extra-count">
//                         +{priceInfo.extraCount}명 추가 ({site.extraPrice.toLocaleString()}원/인)
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* 반려동물 */}
//               {site.petFriendly && (
//                 <div className="form-group checkbox-group">
//                   <label className="pet-checkbox">
//                     <input
//                       type="checkbox"
//                       checked={pet}
//                       onChange={(e) => setPet(e.target.checked)}
//                     />
//                     <FaPaw /> 반려동물 동반 ({people}명 기준 +20,000원)
//                   </label>
//                 </div>
//               )}

//               {/* 예약자 정보 */}
//               <div className="customer-info">
//                 <div className="form-group">
//                   <label>예약자 이름 *</label>
//                   <input
//                     type="text"
//                     placeholder="이름을 입력하세요"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>연락처 *</label>
//                   <input
//                     type="tel"
//                     placeholder="010-1234-5678"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* 가격 요약 */}
//             <div className="price-summary">
//               <div className="price-row">
//                 <span>기본 요금 ({priceInfo.nights}박)</span>
//                 <span>{priceInfo.basePrice.toLocaleString()}원</span>
//               </div>
//               {priceInfo.extraCount > 0 && (
//                 <div className="price-row extra">
//                   <span>추가 인원 ({priceInfo.extraCount}명 × {priceInfo.nights}박)</span>
//                   <span>{priceInfo.extraPrice.toLocaleString()}원</span>
//                 </div>
//               )}
//               {pet && (
//                 <div className="price-row pet">
//                   <span>반려동물 ({priceInfo.nights}박)</span>
//                   <span>{(20000 * priceInfo.nights).toLocaleString()}원</span>
//                 </div>
//               )}
//               <div className="total-price">
//                 <span>총 결제금액</span>
//                 <span>{(priceInfo.total + (pet ? 20000 * priceInfo.nights : 0)).toLocaleString()}원</span>
//               </div>
//             </div>

//             <button 
//               className="reserve-btn"
//               onClick={handleReserve}
//               disabled={!name || !phone}
//             >
//               <FiDollarSign /> 예약하기 ({(priceInfo.total + (pet ? 20000 * priceInfo.nights : 0)).toLocaleString()}원)
//             </button>
//           </div>
//         </div>

//         {/* 사이트 설명 */}
//         <div className="site-description">
//           <h2>사이트 소개</h2>
//           <p>{site.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SiteDetail;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiUsers, FiMapPin, FiCheck, FiCalendar, FiChevronLeft, FiChevronRight, FiArrowLeft } from 'react-icons/fi';
import '../../styles/SiteDetail.css';

const SiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState({
    checkIn: '',
    checkOut: ''
  });
  const [guests, setGuests] = useState(2);
  const [hasPet, setHasPet] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const site = {
    id: id,
    name: 'A구역 - 산 전망',
    description: '아름다운 산 전망과 함께하는 프리미엄 캠핑 사이트입니다.',
    longDescription: '청정 자연 속에서 힐링할 수 있는 최고의 캠핑 장소입니다. 넓은 공간과 깨끗한 시설, 그리고 아름다운 산 전망이 어우러져 완벽한 캠핑 경험을 제공합니다. 사계절 내내 다양한 자연의 모습을 감상할 수 있으며, 가족 단위 캠핑객들에게 특히 인기가 많습니다.',
    images: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800',
      'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800'
    ],
    rating: 4.8,
    reviews: 156,
    price: 50000,
    capacity: { min: 2, max: 4 },
    size: '10m x 10m',
    facilities: [
      { name: '전기', icon: '⚡', available: true },
      { name: '주차 1대', icon: '🚗', available: true },
      { name: '반려동물', icon: '🐕', available: true },
      { name: '와이파이', icon: '📶', available: true },
      { name: '샤워실', icon: '🚿', available: true },
      { name: 'BBQ 그릴', icon: '🍖', available: true }
    ],
    location: {
      address: '강원도 홍천군 내면 광원리 123',
      lat: 37.7749,
      lng: 127.4194
    },
    rules: [
      '체크인 14:00 / 체크아웃 12:00',
      '정숙 시간 22:00 ~ 07:00',
      '애완동물 동반 가능 (목줄 필수)',
      '취사는 지정된 장소에서만 가능',
      '쓰레기는 분리수거 필수'
    ]
  };

  // 박수 계산
  const calculateNights = () => {
    if (!selectedDate.checkIn || !selectedDate.checkOut) return 0;
    const checkIn = new Date(selectedDate.checkIn);
    const checkOut = new Date(selectedDate.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 가격 계산
  const calculatePrice = () => {
    const nights = calculateNights();
    const basePrice = site.price * nights;
    const extraPersonPrice = Math.max(0, guests - site.capacity.min) * 10000 * nights;
    const petPrice = hasPet ? 15000 * nights : 0;
    return {
      nights,
      basePrice,
      extraPersonPrice,
      petPrice,
      total: basePrice + extraPersonPrice + petPrice
    };
  };

  const priceInfo = calculatePrice();

  const handleReservation = () => {
    if (!selectedDate.checkIn || !selectedDate.checkOut) {
      alert('체크인/체크아웃 날짜를 선택해주세요.');
      return;
    }
    if (!customerInfo.name || !customerInfo.phone) {
      alert('예약자 정보를 입력해주세요.');
      return;
    }
    
    navigate('/payment', {
      state: {
        site,
        checkIn: selectedDate.checkIn,
        checkOut: selectedDate.checkOut,
        guests,
        hasPet,
        customerInfo,
        priceInfo
      }
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % site.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + site.images.length) % site.images.length);
  };

  return (
    <div className="site-detail-page">
      <div className="container">
        {/* 헤더 */}
        <div className="site-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            뒤로가기
          </button>
          <div className="site-title-section">
            <div className="site-title-row">
              <h1>{site.name}</h1>
              <span className="site-type large">대형</span>
            </div>
            <p className="site-intro">{site.description}</p>
            <div className="site-meta">
              <div className="rating">
                <FiStar className="star-filled" />
                <strong>{site.rating}</strong>
                <span>({site.reviews}개 리뷰)</span>
              </div>
              <div className="location">
                <FiMapPin />
                <span>{site.location.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 메인 그리드 */}
        <div className="site-detail-grid">
          {/* 왼쪽: 이미지 갤러리 + 소개 */}
          <div className="site-content">
            {/* 이미지 갤러리 */}
            <div className="image-gallery">
              <div className="main-image-container">
                <img src={site.images[currentImageIndex]} alt={site.name} />
                <button className="nav-btn prev" onClick={prevImage}>
                  <FiChevronLeft />
                </button>
                <button className="nav-btn next" onClick={nextImage}>
                  <FiChevronRight />
                </button>
                <div className="image-counter">
                  {currentImageIndex + 1} / {site.images.length}
                </div>
              </div>
              
              <div className="thumbnail-list">
                {site.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${site.name} ${idx + 1}`}
                    className={idx === currentImageIndex ? 'active' : ''}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </div>

            {/* 캠핑장 소개 */}
            <div className="site-description">
              <h2>🏕️ 캠핑장 소개</h2>
              <p>{site.longDescription}</p>
            </div>

            {/* 시설 정보 */}
            <div className="facilities-section">
              <h2>🔧 편의시설</h2>
              <div className="facilities-grid">
                {site.facilities.map((facility, idx) => (
                  <div key={idx} className="facility-item">
                    <span className="facility-icon">{facility.icon}</span>
                    <span className="facility-name">{facility.name}</span>
                    <FiCheck className="check-icon" />
                  </div>
                ))}
              </div>
            </div>

            {/* 이용 규칙 */}
            <div className="rules-section">
              <h2>📋 이용 규칙</h2>
              <ul>
                {site.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 오른쪽: 예약 폼 (컴팩트) */}
          <div className="reservation-sidebar">
            <div className="reservation-form">
              <div className="price-header">
                <span className="price-amount">{site.price.toLocaleString()}원</span>
                <span className="price-unit">/ 1박</span>
              </div>

              {/* 날짜 선택 */}
              <div className="date-selection">
                <div className="date-input-group">
                  <label>체크인</label>
                  <input
                    type="date"
                    value={selectedDate.checkIn}
                    onChange={(e) => setSelectedDate({...selectedDate, checkIn: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="date-input-group">
                  <label>체크아웃</label>
                  <input
                    type="date"
                    value={selectedDate.checkOut}
                    onChange={(e) => setSelectedDate({...selectedDate, checkOut: e.target.value})}
                    min={selectedDate.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {priceInfo.nights > 0 && (
                <div className="nights-display">
                  <FiCalendar />
                  <span>{priceInfo.nights}박 선택됨</span>
                </div>
              )}

              {/* 인원 선택 */}
              <div className="guest-selection">
                <label>인원</label>
                <div className="guest-controls">
                  <button
                    className="count-btn"
                    onClick={() => setGuests(Math.max(site.capacity.min, guests - 1))}
                    disabled={guests <= site.capacity.min}
                  >
                    -
                  </button>
                  <div className="guest-count">
                    <FiUsers />
                    <span>{guests}명</span>
                  </div>
                  <button
                    className="count-btn"
                    onClick={() => setGuests(Math.min(site.capacity.max, guests + 1))}
                    disabled={guests >= site.capacity.max}
                  >
                    +
                  </button>
                </div>
                <p className="capacity-info">
                  기본 {site.capacity.min}명 / 최대 {site.capacity.max}명
                </p>
              </div>

              {/* 반려동물 */}
              <div className="pet-option">
                <label className="pet-checkbox">
                  <input
                    type="checkbox"
                    checked={hasPet}
                    onChange={(e) => setHasPet(e.target.checked)}
                  />
                  <span>🐕 반려동물 동반 (+15,000원/박)</span>
                </label>
              </div>

              {/* 예약자 정보 */}
              <div className="customer-info-compact">
                <input
                  type="text"
                  placeholder="예약자 이름"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="연락처 (010-1234-5678)"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                />
              </div>

              {/* 가격 요약 */}
              {priceInfo.nights > 0 && (
                <div className="price-summary-compact">
                  <div className="price-row">
                    <span>{site.price.toLocaleString()}원 × {priceInfo.nights}박</span>
                    <span>{priceInfo.basePrice.toLocaleString()}원</span>
                  </div>
                  {priceInfo.extraPersonPrice > 0 && (
                    <div className="price-row extra">
                      <span>추가 인원 ({guests - site.capacity.min}명)</span>
                      <span>+{priceInfo.extraPersonPrice.toLocaleString()}원</span>
                    </div>
                  )}
                  {priceInfo.petPrice > 0 && (
                    <div className="price-row pet">
                      <span>반려동물</span>
                      <span>+{priceInfo.petPrice.toLocaleString()}원</span>
                    </div>
                  )}
                  <div className="price-divider"></div>
                  <div className="price-row total">
                    <strong>총 결제 금액</strong>
                    <strong>{priceInfo.total.toLocaleString()}원</strong>
                  </div>
                </div>
              )}

              {/* 예약 버튼 */}
              <button
                className="reserve-btn"
                onClick={handleReservation}
                disabled={!selectedDate.checkIn || !selectedDate.checkOut || !customerInfo.name}
              >
                <FiCalendar />
                예약하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;
