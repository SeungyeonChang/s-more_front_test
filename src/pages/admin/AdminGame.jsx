import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiUsers, FiPlay, FiPause, FiCheckCircle, FiClock, FiAward, FiTrendingUp } from 'react-icons/fi';
import '../../styles/AdminGame.css';

const AdminGame = () => {
  const [activeTab, setActiveTab] = useState('tournaments');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBracketModal, setShowBracketModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);

  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      title: '주말 가위바위보 토너먼트',
      gameType: 'rps',
      status: 'recruiting',
      startTime: '2026-02-08 19:00',
      maxPlayers: 16,
      currentPlayers: 12,
      prize: '치킨 세트',
      createdAt: '2026-02-04',
      participants: [
        { id: 1, name: '김캠핑', siteNumber: 'A-12', checkIn: '2026-02-07' },
        { id: 2, name: '이자연', siteNumber: 'B-05', checkIn: '2026-02-07' },
        { id: 3, name: '박야외', siteNumber: 'C-08', checkIn: '2026-02-07' },
        { id: 4, name: '최텐트', siteNumber: 'A-15', checkIn: '2026-02-07' },
        { id: 5, name: '정글램핑', siteNumber: 'D-03', checkIn: '2026-02-07' },
        { id: 6, name: '강산책', siteNumber: 'B-11', checkIn: '2026-02-07' },
        { id: 7, name: '윤바베큐', siteNumber: 'A-07', checkIn: '2026-02-07' },
        { id: 8, name: '장낚시', siteNumber: 'C-14', checkIn: '2026-02-07' },
        { id: 9, name: '조등산', siteNumber: 'B-09', checkIn: '2026-02-07' },
        { id: 10, name: '한별빛', siteNumber: 'D-06', checkIn: '2026-02-07' },
        { id: 11, name: '송호수', siteNumber: 'A-18', checkIn: '2026-02-07' },
        { id: 12, name: '임숲속', siteNumber: 'C-02', checkIn: '2026-02-07' }
      ]
    },
    {
      id: 2,
      title: '행운의 사다리타기',
      gameType: 'ladder',
      status: 'recruiting',
      startTime: '2026-02-09 15:00',
      maxPlayers: 8,
      currentPlayers: 6,
      prize: '캠핑용품 세트',
      createdAt: '2026-02-05',
      participants: [
        { id: 1, name: '김캠핑', siteNumber: 'A-12', checkIn: '2026-02-08' },
        { id: 2, name: '이자연', siteNumber: 'B-05', checkIn: '2026-02-08' },
        { id: 3, name: '박야외', siteNumber: 'C-08', checkIn: '2026-02-08' },
        { id: 4, name: '최텐트', siteNumber: 'A-15', checkIn: '2026-02-08' },
        { id: 5, name: '정글램핑', siteNumber: 'D-03', checkIn: '2026-02-08' },
        { id: 6, name: '강산책', siteNumber: 'B-11', checkIn: '2026-02-08' }
      ]
    },
    {
      id: 3,
      title: '평일 가위바위보 대회',
      gameType: 'rps',
      status: 'ongoing',
      startTime: '2026-02-06 14:00',
      maxPlayers: 8,
      currentPlayers: 8,
      prize: '커피 쿠폰',
      createdAt: '2026-02-04',
      currentRound: '준결승',
      participants: [
        { id: 1, name: '김캠핑', siteNumber: 'A-12', checkIn: '2026-02-05', status: 'playing' },
        { id: 2, name: '이자연', siteNumber: 'B-05', checkIn: '2026-02-05', status: 'eliminated' },
        { id: 3, name: '박야외', siteNumber: 'C-08', checkIn: '2026-02-05', status: 'playing' },
        { id: 4, name: '최텐트', siteNumber: 'A-15', checkIn: '2026-02-05', status: 'eliminated' },
        { id: 5, name: '정글램핑', siteNumber: 'D-03', checkIn: '2026-02-05', status: 'playing' },
        { id: 6, name: '강산책', siteNumber: 'B-11', checkIn: '2026-02-05', status: 'eliminated' },
        { id: 7, name: '윤바베큐', siteNumber: 'A-07', checkIn: '2026-02-05', status: 'playing' },
        { id: 8, name: '장낚시', siteNumber: 'C-14', checkIn: '2026-02-05', status: 'eliminated' }
      ]
    },
    {
      id: 4,
      title: '1월 가위바위보 챔피언십',
      gameType: 'rps',
      status: 'completed',
      startTime: '2026-01-28 18:00',
      maxPlayers: 16,
      currentPlayers: 16,
      prize: '바비큐 세트',
      createdAt: '2026-01-25',
      winner: '김캠핑',
      participants: []
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    gameType: 'rps',
    startTime: '',
    maxPlayers: 8,
    prize: ''
  });

  const [statistics, setStatistics] = useState({
    totalTournaments: 15,
    activeTournaments: 3,
    totalParticipants: 78,
    completedTournaments: 12
  });

  // 토너먼트 생성
  const handleCreateTournament = (e) => {
    e.preventDefault();
    
    const newTournament = {
      id: tournaments.length + 1,
      ...formData,
      status: 'recruiting',
      currentPlayers: 0,
      createdAt: new Date().toISOString().split('T')[0],
      participants: []
    };

    setTournaments([newTournament, ...tournaments]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      gameType: 'rps',
      startTime: '',
      maxPlayers: 8,
      prize: ''
    });
    alert('토너먼트가 생성되었습니다!');
  };

  // 토너먼트 삭제
  const handleDelete = (id) => {
    if (window.confirm('이 토너먼트를 삭제하시겠습니까?')) {
      setTournaments(tournaments.filter(t => t.id !== id));
      alert('토너먼트가 삭제되었습니다.');
    }
  };

  // 토너먼트 시작
  const handleStartTournament = (id) => {
    const tournament = tournaments.find(t => t.id === id);
    if (tournament.currentPlayers < 4) {
      alert('최소 4명 이상의 참가자가 필요합니다.');
      return;
    }
    
    if (window.confirm('토너먼트를 시작하시겠습니까?')) {
      setTournaments(tournaments.map(t => 
        t.id === id ? { ...t, status: 'ongoing', currentRound: '1라운드' } : t
      ));
      alert('토너먼트가 시작되었습니다!');
    }
  };

  // 토너먼트 일시정지
  const handlePauseTournament = (id) => {
    if (window.confirm('토너먼트를 일시정지하시겠습니까?')) {
      setTournaments(tournaments.map(t => 
        t.id === id ? { ...t, status: 'paused' } : t
      ));
    }
  };

  // 토너먼트 종료
  const handleCompleteTournament = (id) => {
    if (window.confirm('토너먼트를 종료하시겠습니까?')) {
      setTournaments(tournaments.map(t => 
        t.id === id ? { ...t, status: 'completed' } : t
      ));
      alert('토너먼트가 종료되었습니다.');
    }
  };

  // 대진표 보기
  const viewBracket = (tournament) => {
    setSelectedTournament(tournament);
    setShowBracketModal(true);
  };

  // 상태 뱃지
  const getStatusBadge = (status) => {
    const badges = {
      recruiting: { text: '모집중', class: 'status-recruiting' },
      ongoing: { text: '진행중', class: 'status-ongoing' },
      paused: { text: '일시정지', class: 'status-paused' },
      completed: { text: '종료', class: 'status-completed' }
    };
    return badges[status] || badges.recruiting;
  };

  // 게임 타입
  const getGameIcon = (gameType) => {
    return gameType === 'rps' ? '✊✋✌️' : '🪜';
  };

  const getGameName = (gameType) => {
    return gameType === 'rps' ? '가위바위보' : '사다리타기';
  };

  return (
    <div className="admin-game">
      <div className="page-header">
        <div>
          <h1>🎮 게임 토너먼트 관리</h1>
          <p>캠핑장 게임 대회 운영 및 관리</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <FiPlus />
          새 토너먼트 생성
        </button>
      </div>

      {/* Statistics */}
      <div className="game-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <span className="stat-label">전체 토너먼트</span>
            <span className="stat-value">{statistics.totalTournaments}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <FiPlay />
          </div>
          <div className="stat-content">
            <span className="stat-label">진행중인 대회</span>
            <span className="stat-value">{statistics.activeTournaments}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>
          <div className="stat-content">
            <span className="stat-label">총 참가자 수</span>
            <span className="stat-value">{statistics.totalParticipants}</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon completed">
            <FiCheckCircle />
          </div>
          <div className="stat-content">
            <span className="stat-label">완료된 대회</span>
            <span className="stat-value">{statistics.completedTournaments}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'tournaments' ? 'active' : ''}`}
          onClick={() => setActiveTab('tournaments')}
        >
          전체 토너먼트
        </button>
        <button
          className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          진행중
        </button>
        <button
          className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          종료됨
        </button>
      </div>

      {/* Tournament List */}
      <div className="tournaments-table">
        <table>
          <thead>
            <tr>
              <th>대회명</th>
              <th>게임</th>
              <th>상태</th>
              <th>시작 시간</th>
              <th>참가자</th>
              <th>상품</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {tournaments
              .filter(t => {
                if (activeTab === 'ongoing') return t.status === 'ongoing' || t.status === 'paused';
                if (activeTab === 'completed') return t.status === 'completed';
                return true;
              })
              .map(tournament => {
                const statusBadge = getStatusBadge(tournament.status);
                
                return (
                  <tr key={tournament.id}>
                    <td>
                      <div className="tournament-title-cell">
                        <span className="tournament-icon">{getGameIcon(tournament.gameType)}</span>
                        <div>
                          <strong>{tournament.title}</strong>
                          {tournament.currentRound && (
                            <span className="current-round">{tournament.currentRound}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="game-badge">{getGameName(tournament.gameType)}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.text}
                      </span>
                    </td>
                    <td>{tournament.startTime}</td>
                    <td>
                      <div className="participants-info">
                        <FiUsers />
                        <span>{tournament.currentPlayers} / {tournament.maxPlayers}</span>
                      </div>
                    </td>
                    <td>
                      <span className="prize-badge">
                        <FiAward />
                        {tournament.prize}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {tournament.status === 'recruiting' && (
                          <button
                            className="action-btn start"
                            onClick={() => handleStartTournament(tournament.id)}
                            title="시작"
                          >
                            <FiPlay />
                          </button>
                        )}
                        {tournament.status === 'ongoing' && (
                          <>
                            <button
                              className="action-btn pause"
                              onClick={() => handlePauseTournament(tournament.id)}
                              title="일시정지"
                            >
                              <FiPause />
                            </button>
                            <button
                              className="action-btn complete"
                              onClick={() => handleCompleteTournament(tournament.id)}
                              title="종료"
                            >
                              <FiCheckCircle />
                            </button>
                          </>
                        )}
                        {(tournament.status === 'ongoing' || tournament.status === 'completed') && (
                          <button
                            className="action-btn view"
                            onClick={() => viewBracket(tournament)}
                            title="대진표"
                          >
                            <FiUsers />
                          </button>
                        )}
                        <button
                          className="action-btn edit"
                          onClick={() => {
                            setFormData(tournament);
                            setShowCreateModal(true);
                          }}
                          title="수정"
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(tournament.id)}
                          title="삭제"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Tournament Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{formData.id ? '토너먼트 수정' : '새 토너먼트 생성'}</h2>
              <button className="close-btn" onClick={() => setShowCreateModal(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleCreateTournament} className="modal-body">
              <div className="form-group">
                <label>대회명 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 주말 가위바위보 토너먼트"
                  required
                />
              </div>

              <div className="form-group">
                <label>게임 타입 *</label>
                <select
                  value={formData.gameType}
                  onChange={(e) => setFormData({ ...formData, gameType: e.target.value })}
                >
                  <option value="rps">가위바위보</option>
                  <option value="ladder">사다리타기</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>시작 시간 *</label>
                  <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>최대 인원 *</label>
                  <select
                    value={formData.maxPlayers}
                    onChange={(e) => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) })}
                  >
                    <option value="4">4명</option>
                    <option value="8">8명</option>
                    <option value="16">16명</option>
                    <option value="32">32명</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>우승 상품 *</label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                  placeholder="예: 치킨 세트, 캠핑용품 등"
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowCreateModal(false)}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  {formData.id ? '수정하기' : '생성하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bracket Modal */}
      {showBracketModal && selectedTournament && (
        <div className="modal-overlay" onClick={() => setShowBracketModal(false)}>
          <div className="modal-content bracket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>대진표 - {selectedTournament.title}</h2>
              <button className="close-btn" onClick={() => setShowBracketModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="participants-list">
                <h3>참가자 목록 ({selectedTournament.participants.length}명)</h3>
                <div className="participants-grid">
                  {selectedTournament.participants.map((participant, index) => (
                    <div key={participant.id} className="participant-card">
                      <div className="participant-number">{index + 1}</div>
                      <div className="participant-info">
                        <strong>{participant.name}</strong>
                        <span className="site-number">{participant.siteNumber}</span>
                      </div>
                      {participant.status && (
                        <span className={`participant-status ${participant.status}`}>
                          {participant.status === 'playing' ? '진행중' : '탈락'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedTournament.status === 'completed' && selectedTournament.winner && (
                <div className="winner-section">
                  <h3>🏆 우승자</h3>
                  <div className="winner-card">
                    <div className="winner-icon">👑</div>
                    <div className="winner-info">
                      <h4>{selectedTournament.winner}</h4>
                      <p>상품: {selectedTournament.prize}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGame;
