import React, { useState } from 'react';
import { FiHeart, FiMessageSquare, FiStar, FiTrash2, FiEdit } from 'react-icons/fi';
import '../../styles/MyActivity.css';

const MyActivity = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const reviews = [
    {
      id: 1,
      site: 'A구역 - 산 전망',
      rating: 5,
      comment: '정말 좋은 경험이었습니다! 전망도 좋고 시설도 깨끗해요.',
      date: '2026-01-20',
      images: ['https://via.placeholder.com/100']
    },
    {
      id: 2,
      site: 'B구역 - 계곡 전망',
      rating: 4,
      comment: '가족과 함께 좋은 시간 보냈어요.',
      date: '2026-01-10',
      images: []
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: 'A구역 - 산 전망',
      price: 50000,
      rating: 4.8,
      image: 'https://via.placeholder.com/200x150'
    },
    {
      id: 2,
      name: 'D구역 - 호수 뷰',
      price: 70000,
      rating: 4.9,
      image: 'https://via.placeholder.com/200x150'
    },
    {
      id: 3,
      name: 'E구역 - 별빛 테라스',
      price: 55000,
      rating: 4.8,
      image: 'https://via.placeholder.com/200x150'
    }
  ];

  const posts = [
    {
      id: 1,
      title: '주말 캠핑 메이트 구합니다!',
      category: '메이트 찾기',
      date: '2026-02-01',
      replies: 5
    },
    {
      id: 2,
      title: '겨울 캠핑 꿀팁 공유',
      category: '정보 공유',
      date: '2026-01-28',
      replies: 12
    }
  ];

  return (
    <div className="my-activity-page">
      <div className="container">
        <h1>나의 활동</h1>

        <div className="activity-tabs">
          <button
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            <FiStar />
            리뷰 ({reviews.length})
          </button>
          <button
            className={activeTab === 'wishlist' ? 'active' : ''}
            onClick={() => setActiveTab('wishlist')}
          >
            <FiHeart />
            찜 ({wishlist.length})
          </button>
          <button
            className={activeTab === 'posts' ? 'active' : ''}
            onClick={() => setActiveTab('posts')}
          >
            <FiMessageSquare />
            게시글 ({posts.length})
          </button>
        </div>

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="tab-content">
            <div className="reviews-grid">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div>
                      <h3>{review.site}</h3>
                      <div className="review-rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FiStar
                            key={i}
                            fill={i < review.rating ? 'gold' : 'none'}
                            color={i < review.rating ? 'gold' : '#ccc'}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {review.images.length > 0 && (
                    <div className="review-images">
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt="리뷰 이미지" />
                      ))}
                    </div>
                  )}
                  <div className="review-actions">
                    <button className="btn btn-sm btn-outline">
                      <FiEdit /> 수정
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <FiTrash2 /> 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="tab-content">
            <div className="wishlist-grid">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-card">
                  <div className="wishlist-image">
                    <img src={item.image} alt={item.name} />
                    <button className="remove-wishlist">
                      <FiHeart fill="red" color="red" />
                    </button>
                  </div>
                  <div className="wishlist-info">
                    <h3>{item.name}</h3>
                    <div className="wishlist-rating">
                      <FiStar fill="gold" color="gold" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="wishlist-footer">
                      <span className="price">{item.price.toLocaleString()}원</span>
                      <button className="btn btn-primary btn-sm">예약하기</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="tab-content">
            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <div className="post-category">{post.category}</div>
                  <h3>{post.title}</h3>
                  <div className="post-meta">
                    <span>{post.date}</span>
                    <span>댓글 {post.replies}</span>
                  </div>
                  <div className="post-actions">
                    <button className="btn btn-sm btn-outline">
                      <FiEdit /> 수정
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <FiTrash2 /> 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivity;
