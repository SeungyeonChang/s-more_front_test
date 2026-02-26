import React, { useState } from 'react';
import { FiCpu, FiMessageSquare, FiTrendingUp, FiUsers, FiZap } from 'react-icons/fi';
import '../../styles/AdminAI.css';

const AdminAI = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', content: 'AI 관리 시스템에 오신 것을 환영합니다. 무엇을 도와드릴까요?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const aiFeatures = [
    {
      id: 1,
      icon: <FiTrendingUp />,
      title: '예약 예측',
      description: '과거 데이터 기반 예약률 예측',
      status: 'active',
      accuracy: 94
    },
    {
      id: 2,
      icon: <FiUsers />,
      title: '고객 분석',
      description: '고객 행동 패턴 분석 및 세분화',
      status: 'active',
      accuracy: 89
    },
    {
      id: 3,
      icon: <FiMessageSquare />,
      title: '챗봇 응답',
      description: '자동 고객 응대 시스템',
      status: 'active',
      accuracy: 92
    },
    {
      id: 4,
      icon: <FiZap />,
      title: '가격 최적화',
      description: '수요 기반 동적 가격 책정',
      status: 'training',
      accuracy: 87
    }
  ];

  const predictions = [
    { date: '2026-02-10', prediction: 85, actual: 82, confidence: 95 },
    { date: '2026-02-11', prediction: 78, actual: 80, confidence: 92 },
    { date: '2026-02-12', prediction: 92, actual: 90, confidence: 97 },
    { date: '2026-02-13', prediction: 88, actual: null, confidence: 94 },
    { date: '2026-02-14', prediction: 95, actual: null, confidence: 96 }
  ];

  const insights = [
    {
      id: 1,
      type: 'warning',
      title: '주말 예약률 급증 예상',
      description: '이번 주말 예약률이 평소보다 30% 높을 것으로 예상됩니다.',
      impact: 'high',
      confidence: 96
    },
    {
      id: 2,
      type: 'info',
      title: 'VIP 고객 증가 추세',
      description: '최근 2주간 VIP 등급 전환이 15% 증가했습니다.',
      impact: 'medium',
      confidence: 88
    },
    {
      id: 3,
      type: 'success',
      title: '고객 만족도 상승',
      description: '리뷰 분석 결과 만족도가 지난달 대비 12% 향상되었습니다.',
      impact: 'positive',
      confidence: 92
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      content: inputMessage
    };

    setChatMessages([...chatMessages, userMessage]);
    setInputMessage('');

    // 시뮬레이션된 AI 응답
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: 'ai',
        content: `"${inputMessage}"에 대한 분석을 완료했습니다. 현재 시스템 상태는 정상이며, 예측 정확도는 94%입니다.`
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="admin-ai">
      <div className="page-header">
        <div>
          <h1>🤖 AI 관리</h1>
          <p>인공지능 기반 예측 및 분석 시스템</p>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="ai-features">
        {aiFeatures.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <div className="feature-content">
              <div className="feature-header">
                <h3>{feature.title}</h3>
                <span className={`status-badge ${feature.status}`}>
                  {feature.status === 'active' ? '활성' : '학습중'}
                </span>
              </div>
              <p>{feature.description}</p>
              <div className="accuracy-bar">
                <div className="accuracy-label">정확도</div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ width: `${feature.accuracy}%` }}
                  />
                </div>
                <div className="accuracy-value">{feature.accuracy}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ai-content">
        {/* AI Chat */}
        <div className="ai-card chat-card">
          <div className="card-header">
            <h2>AI 어시스턴트</h2>
          </div>
          <div className="chat-messages">
            {chatMessages.map(msg => (
              <div key={msg.id} className={`message ${msg.type}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input
              type="text"
              placeholder="AI에게 질문하세요..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              전송
            </button>
          </form>
        </div>

        {/* Predictions */}
        <div className="ai-card">
          <div className="card-header">
            <h2>예약률 예측</h2>
          </div>
          <div className="predictions-list">
            {predictions.map((pred, idx) => (
              <div key={idx} className="prediction-item">
                <div className="pred-date">{pred.date}</div>
                <div className="pred-bars">
                  <div className="pred-bar predicted">
                    <div
                      className="bar-fill"
                      style={{ width: `${pred.prediction}%` }}
                    />
                    <span className="bar-label">예측: {pred.prediction}%</span>
                  </div>
                  {pred.actual && (
                    <div className="pred-bar actual">
                      <div
                        className="bar-fill"
                        style={{ width: `${pred.actual}%` }}
                      />
                      <span className="bar-label">실제: {pred.actual}%</span>
                    </div>
                  )}
                </div>
                <div className="confidence">
                  신뢰도: {pred.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="ai-card insights-card">
          <div className="card-header">
            <h2>AI 인사이트</h2>
          </div>
          <div className="insights-list">
            {insights.map(insight => (
              <div key={insight.id} className={`insight-item ${insight.type}`}>
                <div className="insight-header">
                  <strong>{insight.title}</strong>
                  <span className="confidence-badge">
                    {insight.confidence}% 확신
                  </span>
                </div>
                <p>{insight.description}</p>
                <div className={`impact-badge ${insight.impact}`}>
                  영향도: {insight.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAI;
