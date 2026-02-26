// import React, { useState } from 'react';
// import { FiThumbsUp, FiMessageCircle, FiSearch, FiImage, FiUsers } from 'react-icons/fi';
// import '../../styles/Community.css';

// const Community = () => {
//   const [activeTab, setActiveTab] = useState('gallery');
//   const [searchTerm, setSearchTerm] = useState('');

//   const reviews = [
//     {
//       id: 1,
//       user: '김캠핑',
//       avatar: '👤',
//       site: 'A구역 - 산 전망',
//       rating: 5,
//       date: '2026-02-01',
//       content: '정말 좋은 경험이었습니다! 전망도 좋고 시설도 깨끗해요.',
//       images: [
//         'https://via.placeholder.com/300x200',
//         'https://via.placeholder.com/300x200',
//         'https://via.placeholder.com/300x200'
//       ],
//       likes: 24,
//       comments: 5
//     },
//     {
//       id: 2,
//       user: '이자연',
//       avatar: '👤',
//       site: 'B구역 - 계곡 전망',
//       rating: 4,
//       date: '2026-01-28',
//       content: '계곡 소리가 너무 좋았어요. 아이들이 정말 좋아했습니다.',
//       images: [
//         'https://via.placeholder.com/300x200'
//       ],
//       likes: 18,
//       comments: 3
//     },
//     {
//       id: 3,
//       user: '박야외',
//       avatar: '👤',
//       site: 'E구역 - 별빛 테라스',
//       rating: 5,
//       date: '2026-01-25',
//       content: '별 관측에 최적화된 장소! 별빛이 정말 아름다웠어요.',
//       images: [
//         'https://via.placeholder.com/300x200',
//         'https://via.placeholder.com/300x200'
//       ],
//       likes: 32,
//       comments: 8
//     }
//   ];

//   const mates = [
//     {
//       id: 1,
//       user: '최캠핑',
//       avatar: '👤',
//       title: '이번 주말 A구역 캠핑 메이트 구합니다',
//       date: '2026-02-03',
//       members: '2/4명',
//       tags: ['주말', 'A구역', '초보환영'],
//       description: '20대 직장인 2명이서 갑니다. 같이 바비큐 하실 분 환영!',
//       likes: 8,
//       comments: 12
//     },
//     {
//       id: 2,
//       user: '강텐트',
//       avatar: '👤',
//       title: '가족 캠핑 메이트 찾아요',
//       date: '2026-02-02',
//       members: '4/6명',
//       tags: ['가족', 'F구역', '어린이'],
//       description: '초등학생 자녀가 있는 가족 캠핑 메이트를 찾습니다.',
//       likes: 15,
//       comments: 7
//     },
//     {
//       id: 3,
//       user: '윤아웃도어',
//       avatar: '👤',
//       title: '낚시 좋아하시는 분 구해요',
//       date: '2026-02-01',
//       members: '3/4명',
//       tags: ['낚시', 'B구역'],
//       description: '계곡에서 낚시하며 캠핑 즐기실 분!',
//       likes: 6,
//       comments: 4
//     }
//   ];

//   return (
//     <div className="community-page">
//       <div className="container">
//         {/* Header */}
//         <div className="community-header">
//           <h1>👥 커뮤니티</h1>
//           <p>캠핑 경험을 공유하고 메이트를 찾아보세요</p>
//         </div>

//         {/* Search Bar */}
//         <div className="search-section">
//           <div className="search-bar">
//             <FiSearch />
//             <input
//               type="text"
//               placeholder="검색어를 입력하세요..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button className="btn btn-primary">
//             <FiImage />
//             후기 작성
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="community-tabs">
//           <button
//             className={activeTab === 'gallery' ? 'active' : ''}
//             onClick={() => setActiveTab('gallery')}
//           >
//             <FiImage />
//             후기 갤러리
//           </button>
//           <button
//             className={activeTab === 'mates' ? 'active' : ''}
//             onClick={() => setActiveTab('mates')}
//           >
//             <FiUsers />
//             캠핑 메이트
//           </button>
//         </div>

//         {/* Gallery Tab */}
//         {activeTab === 'gallery' && (
//           <div className="gallery-section">
//             <div className="reviews-grid">
//               {reviews.map(review => (
//                 <div key={review.id} className="review-card">
//                   <div className="review-header">
//                     <div className="review-user">
//                       <div className="user-avatar">{review.avatar}</div>
//                       <div className="user-info">
//                         <strong>{review.user}</strong>
//                         <span className="review-site">{review.site}</span>
//                       </div>
//                     </div>
//                     <div className="review-rating">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
//                           ⭐
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {review.images.length > 0 && (
//                     <div className={`review-images images-${review.images.length}`}>
//                       {review.images.map((img, idx) => (
//                         <img key={idx} src={img} alt={`리뷰 이미지 ${idx + 1}`} />
//                       ))}
//                     </div>
//                   )}

//                   <div className="review-content">
//                     <p>{review.content}</p>
//                     <span className="review-date">{review.date}</span>
//                   </div>

//                   <div className="review-actions">
//                     <button className="action-btn">
//                       <FiThumbsUp />
//                       <span>{review.likes}</span>
//                     </button>
//                     <button className="action-btn">
//                       <FiMessageCircle />
//                       <span>{review.comments}</span>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Mates Tab */}
//         {activeTab === 'mates' && (
//           <div className="mates-section">
//             <button className="btn btn-primary create-mate-btn">
//               <FiUsers />
//               메이트 모집하기
//             </button>

//             <div className="mates-list">
//               {mates.map(mate => (
//                 <div key={mate.id} className="mate-card">
//                   <div className="mate-header">
//                     <div className="mate-user">
//                       <div className="user-avatar">{mate.avatar}</div>
//                       <div className="user-info">
//                         <strong>{mate.user}</strong>
//                         <span className="mate-date">{mate.date}</span>
//                       </div>
//                     </div>
//                     <div className="mate-members">{mate.members}</div>
//                   </div>

//                   <h3 className="mate-title">{mate.title}</h3>
//                   <p className="mate-description">{mate.description}</p>

//                   <div className="mate-tags">
//                     {mate.tags.map((tag, idx) => (
//                       <span key={idx} className="tag">#{tag}</span>
//                     ))}
//                   </div>

//                   <div className="mate-actions">
//                     <button className="action-btn">
//                       <FiThumbsUp />
//                       <span>{mate.likes}</span>
//                     </button>
//                     <button className="action-btn">
//                       <FiMessageCircle />
//                       <span>{mate.comments}</span>
//                     </button>
//                     <button className="btn btn-primary btn-sm">참여하기</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Community;


import React, { useState } from 'react';
import { FiThumbsUp, FiMessageCircle, FiSearch, FiImage, FiUsers, FiEye, FiEdit3 } from 'react-icons/fi';
import '../../styles/Community.css';

const Community = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedMateId, setSelectedMateId] = useState(null);
  const [newComment, setNewComment] = useState('');

  // 후기 데이터 (댓글 추가)
  const reviews = [
    {
      id: 1,
      user: '김캠핑',
      avatar: '👤',
      site: 'A구역 - 산 전망',
      rating: 5,
      date: '2026-02-01',
      content: '정말 좋은 경험이었습니다! 전망도 좋고 시설도 깨끗해요.',
      images: ['https://via.placeholder.com/300x200/f0f8ff/4682b4', 'https://via.placeholder.com/300x200/f0f8ff/4682b4', 'https://via.placeholder.com/300x200/f0f8ff/4682b4'],
      likes: 24,
      comments: 5,
      commentsList: [
        { id: 1, user: '박야외', avatar: '👤', content: '전망 정말 좋죠! 저도 가보고 싶네요~', date: '2시간 전' },
        { id: 2, user: '이자연', avatar: '👤', content: '사진 너무 예쁘네요!', date: '5시간 전' }
      ]
    },
    {
      id: 2,
      user: '이자연',
      avatar: '👤',
      site: 'B구역 - 계곡 전망',
      rating: 4,
      date: '2026-01-28',
      content: '계곡 소리가 너무 좋았어요. 아이들이 정말 좋아했습니다.',
      images: ['https://via.placeholder.com/300x200/90ee90/228b22'],
      likes: 18,
      comments: 3,
      commentsList: [
        { id: 3, user: '최캠핑', avatar: '👤', content: '가족 캠핑에 딱 좋겠네요!', date: '1일 전' }
      ]
    }
  ];

  // 캠핑메이트 데이터
  const mates = [
    {
      id: 1,
      user: '최캠핑',
      avatar: '👤',
      title: '이번 주말 A구역 캠핑 메이트 구합니다',
      date: '2026-02-03',
      members: '2/4명',
      tags: ['주말', 'A구역', '초보환영'],
      description: '20대 직장인 2명이서 갑니다. 같이 바비큐 하실 분 환영!',
      likes: 8,
      comments: 12,
      commentsList: [
        { id: 4, user: '강텐트', avatar: '👤', content: '저도 관심있어요! 언제 가시나요?', date: '3시간 전' }
      ]
    }
  ];

  // 댓글 추가 함수
  const addComment = (postId) => {
    if (!newComment.trim()) return;
    
    const updatedPost = selectedPost.type === 'review' 
      ? reviews.find(r => r.id === postId)
      : mates.find(m => m.id === postId);
    
    updatedPost.commentsList.unshift({
      id: Date.now(),
      user: '나',
      avatar: '👤',
      content: newComment,
      date: '방금 전'
    });
    
    updatedPost.comments += 1;
    setNewComment('');
    // Force re-render
    setSelectedPost({ ...selectedPost });
  };

  // 캠핑메이트 신청 모달
  const MateApplyModal = ({ mateId, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      message: '',
      tentSize: '1인용',
      carType: '승용차'
    });

    const handleApply = () => {
      alert(`🎉 ${mates.find(m => m.id === mateId)?.title}에 신청 완료!\n\n신청자: ${formData.name}\n연락처: ${formData.phone}`);
      setShowApplyModal(false);
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="mate-apply-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>캠핑메이트 신청</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-body">
            <div className="mate-info">
              <h4>{mates.find(m => m.id === mateId)?.title}</h4>
              <p className="mate-members">{mates.find(m => m.id === mateId)?.members}</p>
            </div>

            <div className="form-group">
              <label>이름</label>
              <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="실명을 입력해주세요"
              />
            </div>

            <div className="form-group">
              <label>연락처</label>
              <input 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="010-1234-5678"
              />
            </div>

            <div className="form-group">
              <label>텐트 크기</label>
              <select 
                value={formData.tentSize}
                onChange={(e) => setFormData({...formData, tentSize: e.target.value})}
              >
                <option>1인용</option>
                <option>2인용</option>
                <option>4인용</option>
                <option>RV</option>
              </select>
            </div>

            <div className="form-group">
              <label>차종</label>
              <select 
                value={formData.carType}
                onChange={(e) => setFormData({...formData, carType: e.target.value})}
              >
                <option>승용차</option>
                <option>SUV</option>
                <option>RV/캠핑카</option>
                <option>도보/셔틀</option>
              </select>
            </div>

            <div className="form-group">
              <label>인사말</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="같이 캠핑하게 되어 기쁩니다! 간단한 자기소개와 함께..."
                rows="4"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>취소</button>
            <button 
              className="btn btn-primary"
              onClick={handleApply}
              disabled={!formData.name || !formData.phone}
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="community-page">
      <div className="container">
        {/* Header */}
        <div className="community-header">
          <h1>👥 커뮤니티</h1>
          <p>캠핑 경험을 공유하고 메이트를 찾아보세요</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">
            <FiImage />
            후기 작성
          </button>
        </div>

        {/* Tabs */}
        <div className="community-tabs">
          <button
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => setActiveTab('gallery')}
          >
            <FiImage />
            후기 갤러리
          </button>
          <button
            className={activeTab === 'mates' ? 'active' : ''}
            onClick={() => setActiveTab('mates')}
          >
            <FiUsers />
            캠핑 메이트
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="gallery-section">
            <div className="reviews-grid">
              {reviews.map(review => (
                <div key={review.id} className="review-card" onClick={() => setSelectedPost({type: 'review', data: review})}>
                  <div className="review-header">
                    <div className="review-user">
                      <div className="user-avatar">{review.avatar}</div>
                      <div className="user-info">
                        <strong>{review.user}</strong>
                        <span className="review-site">{review.site}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>

                  {review.images.length > 0 && (
                    <div className={`review-images images-${review.images.length}`}>
                      {review.images.map((img, idx) => (
                        <img key={idx} src={img} alt={`리뷰 이미지 ${idx + 1}`} />
                      ))}
                    </div>
                  )}

                  <div className="review-content">
                    <p>{review.content}</p>
                    <span className="review-date">{review.date}</span>
                  </div>

                  <div className="review-actions">
                    <button className="action-btn">
                      <FiThumbsUp />
                      <span>{review.likes}</span>
                    </button>
                    <button className="action-btn">
                      <FiMessageCircle />
                      <span>{review.comments}</span>
                    </button>
                    <FiEye className="detail-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mates Tab */}
        {activeTab === 'mates' && (
          <div className="mates-section">
            <button className="btn btn-primary create-mate-btn">
              <FiUsers />
              메이트 모집하기
            </button>

            <div className="mates-list">
              {mates.map(mate => (
                <div key={mate.id} className="mate-card" onClick={() => setSelectedPost({type: 'mate', data: mate})}>
                  <div className="mate-header">
                    <div className="mate-user">
                      <div className="user-avatar">{mate.avatar}</div>
                      <div className="user-info">
                        <strong>{mate.user}</strong>
                        <span className="mate-date">{mate.date}</span>
                      </div>
                    </div>
                    <div className="mate-members">{mate.members}</div>
                  </div>

                  <h3 className="mate-title">{mate.title}</h3>
                  <p className="mate-description">{mate.description}</p>

                  <div className="mate-tags">
                    {mate.tags.map((tag, idx) => (
                      <span key={idx} className="tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="mate-actions">
                    <button className="action-btn">
                      <FiThumbsUp />
                      <span>{mate.likes}</span>
                    </button>
                    <button className="action-btn">
                      <FiMessageCircle />
                      <span>{mate.comments}</span>
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMateId(mate.id);
                      setShowApplyModal(true);
                    }}>
                      참여하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 상세보기 모달 */}
      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="post-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPost.data.user}의 글</h2>
              <div className="modal-actions">
                <FiEdit3 className="modal-icon" />
                <button className="close-btn" onClick={() => setSelectedPost(null)}>×</button>
              </div>
            </div>

            <div className="modal-body">
              {selectedPost.type === 'review' && (
                <>
                  <div className="review-detail-content">{selectedPost.data.content}</div>
                  {selectedPost.data.images?.map((img, idx) => (
                    <img key={idx} src={img} alt="리뷰 이미지" className="detail-image" />
                  ))}
                </>
              )}
              {selectedPost.type === 'mate' && (
                <>
                  <h3>{selectedPost.data.title}</h3>
                  <p className="mate-detail-desc">{selectedPost.data.description}</p>
                  <div className="mate-detail-tags">
                    {selectedPost.data.tags.map((tag, idx) => (
                      <span key={idx} className="tag">#{tag}</span>
                    ))}
                  </div>
                </>
              )}

              {/* 댓글 섹션 */}
              <div className="comments-section">
                <div className="comments-header">
                  <h4>댓글 {selectedPost.data.commentsList.length}</h4>
                </div>
                <div className="comments-list">
                  {selectedPost.data.commentsList.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-user">
                        <span className="user-avatar">{comment.avatar}</span>
                        <span className="comment-author">{comment.user}</span>
                      </div>
                      <p className="comment-text">{comment.content}</p>
                      <span className="comment-date">{comment.date}</span>
                    </div>
                  ))}
                </div>

                <div className="comment-input">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 작성하세요..."
                    rows="3"
                  />
                  <button 
                    className="btn btn-primary" 
                    onClick={() => addComment(selectedPost.data.id)}
                    disabled={!newComment.trim()}
                  >
                    댓글 작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 캠핑메이트 신청 모달 */}
      {showApplyModal && selectedMateId && (
        <MateApplyModal 
          mateId={selectedMateId} 
          onClose={() => setShowApplyModal(false)} 
        />
      )}
    </div>
  );
};

export default Community;
