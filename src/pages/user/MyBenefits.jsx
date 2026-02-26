import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/MyBenefits.css";

const MyBenefits = () => {
  const [activeTab, setActiveTab] = useState("points");

  const currentPoints = 15000;

  const pointHistory = [
    { id: 1, date: "2026-02-15", desc: "캠핑 예약 적립", amount: 5000, type: "earn" },
    { id: 2, date: "2026-01-20", desc: "상품 구매 사용", amount: -3000, type: "use" },
    { id: 3, date: "2026-01-05", desc: "리뷰 작성 적립", amount: 2000, type: "earn" }
  ];

  const coupons = [
    {
      id: 1,
      name: "신규 가입 10% 할인",
      discount: "10%",
      expire: "2026-03-01",
      status: "available"
    },
    {
      id: 2,
      name: "봄맞이 5,000원 할인",
      discount: "5,000원",
      expire: "2026-02-25",
      status: "expiring"
    },
    {
      id: 3,
      name: "VIP 전용 15% 할인",
      discount: "15%",
      expire: "2026-01-30",
      status: "used"
    }
  ];

  return (
    <div className="mybenefits-page container">
      {/* 헤더 */}
      <div className="benefits-header">
        <h1>보유 혜택</h1>
        <Link to="/mypage" className="back-link">
          ← 마이페이지
        </Link>
      </div>

      {/* 요약 카드 */}
      <div className="benefits-summary">
        <div 
          className={`summary-card ${activeTab === "points" ? "active" : ""}`}
          onClick={() => setActiveTab("points")}
        >
          <span>보유 포인트</span>
          <h2>{currentPoints.toLocaleString()} P</h2>
        </div>

        <div 
          className={`summary-card ${activeTab === "coupons" ? "active" : ""}`}
          onClick={() => setActiveTab("coupons")}
        >
          <span>보유 쿠폰</span>
          <h2>{coupons.length} 장</h2>
        </div>
      </div>

      {/* 탭 버튼 */}
      <div className="benefits-tabs">
        <button
          className={activeTab === "points" ? "active" : ""}
          onClick={() => setActiveTab("points")}
        >
          포인트
        </button>
        <button
          className={activeTab === "coupons" ? "active" : ""}
          onClick={() => setActiveTab("coupons")}
        >
          쿠폰
        </button>
      </div>

      {/* 포인트 탭 */}
      {activeTab === "points" && (
        <div className="points-section">
          {pointHistory.map(item => (
            <div key={item.id} className="point-item">
              <div>
                <div className="point-desc">{item.desc}</div>
                <div className="point-date">{item.date}</div>
              </div>
              <div className={`point-amount ${item.type}`}>
                {item.amount > 0 ? "+" : ""}
                {item.amount.toLocaleString()} P
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 쿠폰 탭 */}
      {activeTab === "coupons" && (
        <div className="coupon-section">
          {coupons.map(coupon => (
            <div key={coupon.id} className={`coupon-card ${coupon.status}`}>
              <div className="coupon-left">
                <h3>{coupon.discount}</h3>
                <span>{coupon.name}</span>
              </div>
              <div className="coupon-right">
                <span className="expire">~ {coupon.expire}</span>
                {coupon.status === "expiring" && (
                  <span className="badge">만료 임박</span>
                )}
                {coupon.status === "used" && (
                  <span className="badge used">사용 완료</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBenefits;