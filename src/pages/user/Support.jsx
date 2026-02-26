import React, { useState } from 'react';
import { FiBell, FiHelpCircle, FiPhone, FiMail, FiFileText } from 'react-icons/fi';
import '../../styles/Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('notices');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const notices = [
    {
      id: 1,
      title: '설 연휴 운영 안내',
      date: '2026-02-01',
      category: '운영',
      important: true,
      content: '설 연휴 기간(2월 9일~11일) 정상 운영됩니다.'
    },
    {
      id: 2,
      title: '겨울 캠핑 안전 수칙 안내',
      date: '2026-01-28',
      category: '안전',
      important: false,
      content: '겨울철 안전한 캠핑을 위한 주의사항을 확인해주세요.'
    },
    {
      id: 3,
      title: '새로운 메뉴 출시 안내',
      date: '2026-01-25',
      category: '메뉴',
      important: false,
      content: '겨울 특선 메뉴가 새롭게 출시되었습니다.'
    }
  ];

  const faqs = [
    {
      id: 1,
      category: '예약',
      question: '예약은 언제부터 가능한가요?',
      answer: '예약은 3개월 전부터 가능합니다. 주말 및 공휴일은 일찍 예약하시는 것을 권장드립니다.'
    },
    {
      id: 2,
      category: '예약',
      question: '예약 취소 및 환불 정책은 어떻게 되나요?',
      answer: '3일 전까지는 100% 환불, 2일 전까지는 50% 환불, 1일 전부터는 환불이 불가능합니다.'
    },
    {
      id: 3,
      category: '시설',
      question: '애완동물 동반이 가능한가요?',
      answer: '네, 가능합니다. 단, 목줄 착용 필수이며 배변봉투를 지참해주셔야 합니다.'
    },
    {
      id: 4,
      category: '시설',
      question: '전기 사용이 가능한가요?',
      answer: '모든 사이트에서 전기 사용이 가능합니다. 콘센트는 사이트당 2개가 제공됩니다.'
    },
    {
      id: 5,
      category: '이용',
      question: '체크인/체크아웃 시간은 언제인가요?',
      answer: '체크인은 14:00부터, 체크아웃은 12:00까지입니다.'
    },
    {
      id: 6,
      category: '이용',
      question: '샤워실이 있나요?',
      answer: '네, 남녀 구분된 샤워실이 있으며 24시간 온수가 제공됩니다.'
    }
  ];

  const terms = [
    {
      id: 1,
      title: '이용약관',
      icon: <FiFileText />
    },
    {
      id: 2,
      title: '개인정보처리방침',
      icon: <FiFileText />
    },
    {
      id: 3,
      title: '환불규정',
      icon: <FiFileText />
    },
    {
      id: 4,
      title: '캠핑장 이용규칙',
      icon: <FiFileText />
    }
  ];

  return (
    <div className="support-page">
      <div className="container">
        <h1>고객지원</h1>

        {/* Tabs */}
        <div className="support-tabs">
          <button
            className={activeTab === 'notices' ? 'active' : ''}
            onClick={() => setActiveTab('notices')}
          >
            <FiBell />
            공지사항
          </button>
          <button
            className={activeTab === 'faq' ? 'active' : ''}
            onClick={() => setActiveTab('faq')}
          >
            <FiHelpCircle />
            FAQ
          </button>
          <button
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => setActiveTab('contact')}
          >
            <FiPhone />
            문의하기
          </button>
          <button
            className={activeTab === 'terms' ? 'active' : ''}
            onClick={() => setActiveTab('terms')}
          >
            <FiFileText />
            약관
          </button>
        </div>

        {/* Notices Tab */}
        {activeTab === 'notices' && (
          <div className="notices-section">
            <div className="notices-list">
              {notices.map(notice => (
                <div key={notice.id} className="notice-card">
                  <div className="notice-header">
                    {notice.important && (
                      <span className="important-badge">중요</span>
                    )}
                    <span className="notice-category">{notice.category}</span>
                    <span className="notice-date">{notice.date}</span>
                  </div>
                  <h3>{notice.title}</h3>
                  <p>{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="faq-section">
            <div className="faq-categories">
              <button className="category-btn active">전체</button>
              <button className="category-btn">예약</button>
              <button className="category-btn">시설</button>
              <button className="category-btn">이용</button>
            </div>

            <div className="faq-list">
              {faqs.map(faq => (
                <div
                  key={faq.id}
                  className={`faq-item ${expandedFaq === faq.id ? 'expanded' : ''}`}
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <div className="faq-question">
                    <span className="faq-category-tag">{faq.category}</span>
                    <h3>Q. {faq.question}</h3>
                    <span className="faq-toggle">{expandedFaq === faq.id ? '−' : '+'}</span>
                  </div>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>A. {faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="contact-section">
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <FiPhone />
                </div>
                <h3>전화 문의</h3>
                <p>1588-0000</p>
                <span>평일 09:00 - 18:00</span>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  <FiMail />
                </div>
                <h3>이메일 문의</h3>
                <p>support@camping.com</p>
                <span>24시간 접수 가능</span>
              </div>

              <div className="contact-card">
                <div className="contact-icon">
                  💬
                </div>
                <h3>채팅 상담</h3>
                <p>AI 챗봇</p>
                <button className="btn btn-primary">채팅 시작</button>
              </div>
            </div>

            <div className="inquiry-form">
              <h2>1:1 문의하기</h2>
              <form>
                <div className="form-group">
                  <label>문의 유형</label>
                  <select>
                    <option>예약 문의</option>
                    <option>시설 문의</option>
                    <option>결제/환불</option>
                    <option>기타</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>제목</label>
                  <input type="text" placeholder="제목을 입력하세요" />
                </div>

                <div className="form-group">
                  <label>내용</label>
                  <textarea rows="6" placeholder="문의 내용을 입력하세요"></textarea>
                </div>

                <div className="form-group">
                  <label>이메일</label>
                  <input type="email" placeholder="답변 받으실 이메일을 입력하세요" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  문의하기
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Terms Tab */}
        {activeTab === 'terms' && (
          <div className="terms-section">
            <div className="terms-grid">
              {terms.map(term => (
                <div key={term.id} className="term-card">
                  <div className="term-icon">{term.icon}</div>
                  <h3>{term.title}</h3>
                  <button className="btn btn-outline">보기</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
