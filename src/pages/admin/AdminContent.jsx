import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiImage, FiFileText, FiEye } from 'react-icons/fi';
import '../../styles/AdminContent.css';

const AdminContent = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const contents = [
    {
      id: 1,
      title: '캠핑장 이용 안내',
      category: 'notice',
      author: '관리자',
      views: 1234,
      createdAt: '2026-01-15',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: '겨울 캠핑 준비물 가이드',
      category: 'guide',
      author: '관리자',
      views: 2456,
      createdAt: '2026-01-20',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: '2월 이벤트 안내',
      category: 'event',
      author: '관리자',
      views: 876,
      createdAt: '2026-02-01',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      title: '시설 점검 공지',
      category: 'notice',
      author: '관리자',
      views: 543,
      createdAt: '2026-02-03',
      status: 'draft',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 5,
      title: '봄 시즌 요금 안내',
      category: 'notice',
      author: '관리자',
      views: 0,
      createdAt: '2026-02-04',
      status: 'scheduled',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 6,
      title: '캠핑 안전 수칙',
      category: 'guide',
      author: '관리자',
      views: 3210,
      createdAt: '2026-01-10',
      status: 'published',
      thumbnail: 'https://via.placeholder.com/300x200'
    }
  ];

  const categories = [
    { value: 'all', label: '전체', count: contents.length },
    { value: 'notice', label: '공지사항', count: contents.filter(c => c.category === 'notice').length },
    { value: 'guide', label: '가이드', count: contents.filter(c => c.category === 'guide').length },
    { value: 'event', label: '이벤트', count: contents.filter(c => c.category === 'event').length }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      published: { text: '게시됨', class: 'status-published' },
      draft: { text: '임시저장', class: 'status-draft' },
      scheduled: { text: '예약', class: 'status-scheduled' }
    };
    return badges[status] || badges.draft;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      notice: { text: '공지사항', class: 'category-notice' },
      guide: { text: '가이드', class: 'category-guide' },
      event: { text: '이벤트', class: 'category-event' }
    };
    return badges[category] || badges.notice;
  };

  const filteredContents = selectedCategory === 'all'
    ? contents
    : contents.filter(c => c.category === selectedCategory);

  const handleDelete = (id) => {
    if (window.confirm('이 콘텐츠를 삭제하시겠습니까?')) {
      console.log(`콘텐츠 ${id} 삭제`);
    }
  };

  return (
    <div className="admin-content">
      <div className="page-header">
        <div>
          <h1>📝 콘텐츠 관리</h1>
          <p>공지사항, 가이드 및 이벤트 관리</p>
        </div>
        <button className="btn btn-primary">
          <FiPlus />
          새 콘텐츠 작성
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`category-tab ${selectedCategory === cat.value ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            <span>{cat.label}</span>
            <span className="count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="content-stats">
        <div className="stat-box">
          <div className="stat-icon">
            <FiFileText />
          </div>
          <div className="stat-info">
            <span className="stat-label">전체 콘텐츠</span>
            <span className="stat-value">{contents.length}</span>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">
            <FiEye />
          </div>
          <div className="stat-info">
            <span className="stat-label">총 조회수</span>
            <span className="stat-value">
              {contents.reduce((sum, c) => sum + c.views, 0).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">
            <FiImage />
          </div>
          <div className="stat-info">
            <span className="stat-label">게시된 콘텐츠</span>
            <span className="stat-value">
              {contents.filter(c => c.status === 'published').length}
            </span>
          </div>
        </div>
      </div>

      {/* Contents Grid */}
      <div className="contents-grid">
        {filteredContents.map(content => {
          const statusBadge = getStatusBadge(content.status);
          const categoryBadge = getCategoryBadge(content.category);
          
          return (
            <div key={content.id} className="content-card">
              <div className="content-thumbnail">
                <img src={content.thumbnail} alt={content.title} />
                <div className="thumbnail-overlay">
                  <button className="overlay-btn">
                    <FiEye />
                    미리보기
                  </button>
                </div>
              </div>

              <div className="content-body">
                <div className="content-badges">
                  <span className={`badge ${categoryBadge.class}`}>
                    {categoryBadge.text}
                  </span>
                  <span className={`badge ${statusBadge.class}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <h3 className="content-title">{content.title}</h3>

                <div className="content-meta">
                  <div className="meta-item">
                    <span className="meta-label">작성자</span>
                    <span className="meta-value">{content.author}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">작성일</span>
                    <span className="meta-value">{content.createdAt}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">조회수</span>
                    <span className="meta-value">{content.views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="content-actions">
                  <button className="action-btn edit">
                    <FiEdit />
                    수정
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(content.id)}
                  >
                    <FiTrash2 />
                    삭제
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminContent;
