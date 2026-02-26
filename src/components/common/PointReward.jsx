// import React from 'react';
// import { FaStar, FaGem } from 'react-icons/fa';
// import './PointReward.css';

// const PointReward = ({ totalPrice, userGrade = '일반', className = '' }) => {
//   // 등급별 적립률
//   const pointRates = {
//     일반: 0.05,  // 5%
//     vip: 0.10    // 10%
//   };

//   const pointRate = pointRates[userGrade] || 0.05;
//   const expectedPoints = Math.floor(totalPrice * pointRate);
//   const pointColor = userGrade === 'vip' ? '#ffd700' : '#4CAF50';

//   return (
//     <div className={`point-reward ${className}`}>
//       <div className="point-header">
//         <div className="grade-badge">
//           {userGrade === 'vip' ? (
//             <>
//               <FaGem className="gem-icon" />
//               VIP
//             </>
//           ) : (
//             <>
//               <FaStar className="star-icon" />
//               일반
//             </>
//           )}
//         </div>
//         <div className="point-info">
//           <span className="point-text">포인트 {expectedPoints.toLocaleString()}원 적립 예상</span>
//           <span className="rate-text">({pointRate * 100}% 적립)</span>
//         </div>
//       </div>
      
//       <div className="point-bar">
//         <div 
//           className="point-progress" 
//           style={{ 
//             width: `${pointRate * 100}%`,
//             backgroundColor: pointColor 
//           }}
//         ></div>
//       </div>
      
//       <div className="point-benefit">
//         <span>VIP 전환 시 2배 적립!</span>
//       </div>
//     </div>
//   );
// };

// export default PointReward;
import React from 'react';
import { FaStar, FaGem, FaCoins } from 'react-icons/fa';
import './PointReward.css';

const PointReward = ({ totalPrice, userGrade = '일반', size = 'normal' }) => {
  const pointRates = { 일반: 0.05, vip: 0.10 };
  const pointRate = pointRates[userGrade] || 0.05;
  const expectedPoints = Math.floor(totalPrice * pointRate);

  return (
    <div className={`point-reward-card ${size}`}>
      <div className="point-reward-header">
        <div className={`grade-badge ${userGrade}`}>
          {userGrade === 'vip' ? (
            <>
              <FaGem className="icon" />
              <span>VIP 회원</span>
            </>
          ) : (
            <>
              <FaStar className="icon" />
              <span>일반 회원</span>
            </>
          )}
        </div>
        <div className="point-rate">{pointRate * 100}% 적립</div>
      </div>
      
      <div className="point-info">
        <FaCoins className="coin-icon" />
        <div className="point-details">
          <span className="point-label">적립 예상 포인트</span>
          <span className="point-amount">+{expectedPoints.toLocaleString()}P</span>
        </div>
      </div>

      {userGrade === '일반' && (
        <div className="upgrade-tip">
          💡 VIP 전환 시 2배 포인트 적립!
        </div>
      )}
    </div>
  );
};

export default PointReward;
