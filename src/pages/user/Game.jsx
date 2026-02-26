// // import React, { useState } from 'react';
// // // Game.jsx 상단 import 부분 수정
// // import { FiAward, FiMapPin, FiTarget } from 'react-icons/fi';
// // import '../../styles/Game.css';

// // const Game = () => {
// //   const [activeGame, setActiveGame] = useState(null);
// //   const [rpsChoice, setRpsChoice] = useState(null);
// //   const [rpsResult, setRpsResult] = useState(null);
// //   const [score, setScore] = useState(0);

// //   const games = [
// //     {
// //       id: 'treasure',
// //       title: '보물찾기',
// //       icon: '🗺️',
// //       description: '캠핑장 곳곳에 숨겨진 보물을 찾아보세요!',
// //       points: 500
// //     },
// //     {
// //       id: 'rps',
// //       title: '가위바위보',
// //       icon: '✊',
// //       description: 'AI와 가위바위보 게임을 즐겨보세요!',
// //       points: 100
// //     },
// //     {
// //       id: 'quiz',
// //       title: '캠핑 퀴즈',
// //       icon: '❓',
// //       description: '캠핑 상식을 테스트해보세요!',
// //       points: 300
// //     }
// //   ];

// //   const treasureLocations = [
// //     { id: 1, name: 'A구역 근처', hint: '큰 나무 아래', found: false },
// //     { id: 2, name: '중앙 광장', hint: '벤치 밑', found: true },
// //     { id: 3, name: '야외극장', hint: '스크린 뒤편', found: false },
// //     { id: 4, name: '계곡 산책로', hint: '다리 근처', found: false }
// //   ];

// //   const rankings = [
// //     { rank: 1, name: '캠핑왕', points: 5000, badge: '🥇' },
// //     { rank: 2, name: '아웃도어러', points: 4500, badge: '🥈' },
// //     { rank: 3, name: '자연인', points: 4000, badge: '🥉' },
// //     { rank: 4, name: '김캠핑', points: score || 3500, badge: '🏆' },
// //     { rank: 5, name: '텐트마스터', points: 3000, badge: '⭐' }
// //   ];

// //   const playRPS = (choice) => {
// //     const choices = ['rock', 'paper', 'scissors'];
// //     const aiChoice = choices[Math.floor(Math.random() * 3)];
// //     setRpsChoice(choice);

// //     let result = '';
// //     if (choice === aiChoice) {
// //       result = 'draw';
// //     } else if (
// //       (choice === 'rock' && aiChoice === 'scissors') ||
// //       (choice === 'paper' && aiChoice === 'rock') ||
// //       (choice === 'scissors' && aiChoice === 'paper')
// //     ) {
// //       result = 'win';
// //       setScore(score + 100);
// //     } else {
// //       result = 'lose';
// //     }

// //     setRpsResult({ player: choice, ai: aiChoice, result });
// //   };

// //   const rpsEmoji = {
// //     rock: '✊',
// //     paper: '✋',
// //     scissors: '✌️'
// //   };

// //   return (
// //     <div className="game-page">
// //       <div className="container">
// //         {/* Header */}
// //         <div className="game-header">
// //           <h1>🎮 캠핑 게임</h1>
// //           <p>게임을 즐기고 포인트를 획득하세요!</p>
// //           <div className="user-points">
// //             <FiAward />
// //             <span>내 포인트: {score.toLocaleString()}P</span>
// //           </div>
// //         </div>

// //         {!activeGame ? (
// //           <>
// //             {/* Game Lobby */}
// //             <div className="game-lobby">
// //               <h2>게임 선택</h2>
// //               <div className="games-grid">
// //                 {games.map(game => (
// //                   <div
// //                     key={game.id}
// //                     className="game-card"
// //                     onClick={() => setActiveGame(game.id)}
// //                   >
// //                     <div className="game-icon">{game.icon}</div>
// //                     <h3>{game.title}</h3>
// //                     <p>{game.description}</p>
// //                     <div className="game-points">
// //                       <FiAward />
// //                       <span>최대 {game.points}P</span>
// //                     </div>
// //                     <button className="btn btn-primary">게임 시작</button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Rankings */}
// //             <div className="rankings-section">
// //               <h2>🏆 명예의 전당</h2>
// //               <div className="rankings-list">
// //                 {rankings.map(user => (
// //                   <div key={user.rank} className="ranking-item">
// //                     <span className="rank-badge">{user.badge}</span>
// //                     <span className="rank-number">#{user.rank}</span>
// //                     <span className="rank-name">{user.name}</span>
// //                     <span className="rank-points">{user.points.toLocaleString()}P</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <div className="game-container">
// //             <button
// //               className="btn btn-outline back-btn"
// //               onClick={() => {
// //                 setActiveGame(null);
// //                 setRpsResult(null);
// //               }}
// //             >
// //               ← 게임 목록
// //             </button>

// //             {/* Treasure Hunt */}
// //             {activeGame === 'treasure' && (
// //               <div className="treasure-game">
// //                 <h2>🗺️ 보물찾기</h2>
// //                 <p className="game-description">
// //                   캠핑장 곳곳에 숨겨진 보물을 찾아보세요!
// //                   각 보물을 찾으면 포인트를 획득할 수 있습니다.
// //                 </p>

// //                 <div className="treasure-locations">
// //                   {treasureLocations.map(location => (
// //                     <div
// //                       key={location.id}
// //                       className={`treasure-location ${location.found ? 'found' : ''}`}
// //                     >
// //                       <div className="location-header">
// //                         <FiMapPin />
// //                         <h3>{location.name}</h3>
// //                         {location.found && <span className="found-badge">발견!</span>}
// //                       </div>
// //                       <p className="location-hint">힌트: {location.hint}</p>
// //                       {!location.found && (
// //                         <button className="btn btn-primary btn-sm">
// //                           보물 찾기
// //                         </button>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <div className="treasure-progress">
// //                   <p>
// //                     발견한 보물: {treasureLocations.filter(l => l.found).length} / {treasureLocations.length}
// //                   </p>
// //                   <div className="progress-bar">
// //                     <div
// //                       className="progress-fill"
// //                       style={{
// //                         width: `${(treasureLocations.filter(l => l.found).length / treasureLocations.length) * 100}%`
// //                       }}
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Rock Paper Scissors */}
// //             {activeGame === 'rps' && (
// //               <div className="rps-game">
// //                 <h2>✊ 가위바위보</h2>
// //                 <p className="game-description">
// //                   AI와 가위바위보 대결! 이기면 100P를 획득합니다.
// //                 </p>

// //                 <div className="rps-choices">
// //                   <button
// //                     className="rps-btn"
// //                     onClick={() => playRPS('rock')}
// //                   >
// //                     ✊<br/>바위
// //                   </button>
// //                   <button
// //                     className="rps-btn"
// //                     onClick={() => playRPS('scissors')}
// //                   >
// //                     ✌️<br/>가위
// //                   </button>
// //                   <button
// //                     className="rps-btn"
// //                     onClick={() => playRPS('paper')}
// //                   >
// //                     ✋<br/>보
// //                   </button>
// //                 </div>

// //                 {rpsResult && (
// //                   <div className="rps-result">
// //                     <div className="result-display">
// //                       <div className="player-choice">
// //                         <span>나</span>
// //                         <div className="choice-emoji">{rpsEmoji[rpsResult.player]}</div>
// //                       </div>
// //                       <div className="vs">VS</div>
// //                       <div className="ai-choice">
// //                         <span>AI</span>
// //                         <div className="choice-emoji">{rpsEmoji[rpsResult.ai]}</div>
// //                       </div>
// //                     </div>
// //                     <div className={`result-text ${rpsResult.result}`}>
// //                       {rpsResult.result === 'win' && '🎉 승리! +100P'}
// //                       {rpsResult.result === 'lose' && '😢 패배!'}
// //                       {rpsResult.result === 'draw' && '🤝 무승부!'}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* Quiz Game */}
// //             {activeGame === 'quiz' && (
// //               <div className="quiz-game">
// //                 <h2>❓ 캠핑 퀴즈</h2>
// //                 <p className="game-description">
// //                   캠핑 상식을 테스트해보세요! 정답을 맞히면 포인트를 획득합니다.
// //                 </p>

// //                 <div className="quiz-card">
// //                   <h3>Q. 캠핑장에서 가장 중요한 안전 수칙은?</h3>
// //                   <div className="quiz-options">
// //                     <button className="quiz-option">화기 안전 관리</button>
// //                     <button className="quiz-option">쓰레기 분리수거</button>
// //                     <button className="quiz-option">정숙 시간 준수</button>
// //                     <button className="quiz-option">애완동물 관리</button>
// //                   </div>
// //                 </div>

// //                 <div className="quiz-progress">
// //                   <p>문제: 1 / 10</p>
// //                   <div className="progress-bar">
// //                     <div className="progress-fill" style={{ width: '10%' }} />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Game;


// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { FiUsers, FiTrendingUp, FiAward, FiClock, FiX } from 'react-icons/fi';
// import '../../styles/Game.css';

// const Game = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('tournament');
//   const [tournaments, setTournaments] = useState([
//     {
//       id: 1,
//       title: '주말 가위바위보 토너먼트',
//       gameType: 'rps',
//       status: 'recruiting',
//       startTime: '2026-02-08 19:00',
//       maxPlayers: 16,
//       currentPlayers: 12,
//       prize: '치킨 세트',
//       registered: false,
//       description: '주말 저녁 가위바위보 토너먼트에 참여하세요! 우승자에게는 맛있는 치킨 세트를 드립니다.',
//       rules: [
//         '토너먼트 시작 10분 전까지 입장해야 합니다',
//         '가위바위보는 3번 중 2번 이기는 방식입니다',
//         '무승부 시 재경기를 진행합니다',
//         '시간 내 입장하지 않으면 자동 패배 처리됩니다'
//       ],
//       participants: ['김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산악', '임호수', '송계곡', '윤바람', '한별빛', '조나무', '배구름']
//     },
//     {
//       id: 2,
//       title: '행운의 사다리타기',
//       gameType: 'ladder',
//       status: 'recruiting',
//       startTime: '2026-02-09 15:00',
//       maxPlayers: 8,
//       currentPlayers: 6,
//       prize: '캠핑용품 세트',
//       registered: false,
//       description: '행운의 사다리타기로 멋진 캠핑용품을 받아가세요!',
//       rules: [
//         '참가자 전원이 동시에 사다리를 선택합니다',
//         '당첨자는 1명이며, 우승 상품을 받습니다',
//         '2등~3등에게는 소정의 기념품을 드립니다',
//         '공정한 진행을 위해 랜덤 알고리즘을 사용합니다'
//       ],
//       participants: ['김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산악']
//     },
//     {
//       id: 3,
//       title: '평일 가위바위보 대회',
//       gameType: 'rps',
//       status: 'ongoing',
//       startTime: '2026-02-06 14:00',
//       maxPlayers: 8,
//       currentPlayers: 8,
//       prize: '커피 쿠폰',
//       registered: true,
//       description: '평일 오후 간단한 가위바위보 게임으로 즐거운 시간을 보내세요!',
//       rules: [
//         '토너먼트 시작 10분 전까지 입장해야 합니다',
//         '가위바위보는 3번 중 2번 이기는 방식입니다',
//         '무승부 시 재경기를 진행합니다',
//         '시간 내 입장하지 않으면 자동 패배 처리됩니다'
//       ],
//       participants: ['김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산악', '임호수', '송계곡']
//     }
//   ]);

//   const [selectedTournament, setSelectedTournament] = useState(null);
//   const [showGameModal, setShowGameModal] = useState(false);
//   const [currentGame, setCurrentGame] = useState(null);
  
//   const [myMatches, setMyMatches] = useState([
//     {
//       id: 1,
//       tournamentId: 3,
//       tournamentTitle: '평일 가위바위보 대회',
//       gameType: 'rps',
//       round: '준결승',
//       opponent: '김캠핑',
//       status: 'waiting',
//       scheduledTime: '2026-02-06 14:30'
//     }
//   ]);

//   // 가위바위보 게임 상태
//   const [rpsGame, setRpsGame] = useState({
//     myChoice: null,
//     opponentChoice: null,
//     myScore: 0,
//     opponentScore: 0,
//     round: 1,
//     result: null,
//     isPlaying: false
//   });

//   // 사다리타기 게임 상태
//   const [ladderGame, setLadderGame] = useState({
//     selectedLadder: null,
//     result: null,
//     isRevealed: false,
//     ladders: Array(8).fill(null).map((_, i) => ({
//       id: i + 1,
//       prize: i === 0 ? '🏆 1등 - 캠핑용품 세트' : i === 1 ? '🥈 2등 - 캠핑 의자' : i === 2 ? '🥉 3등 - 텀블러' : '참가상'
//     }))
//   });

//   // 토너먼트 신청
//   const handleRegister = (tournamentId) => {
//     if (!user) {
//       alert('로그인이 필요합니다.');
//       return;
//     }

//     setTournaments(tournaments.map(t => 
//       t.id === tournamentId 
//         ? { ...t, registered: true, currentPlayers: t.currentPlayers + 1 }
//         : t
//     ));
//     setSelectedTournament(null);
//     alert('토너먼트 신청이 완료되었습니다!');
//   };

//   // 토너먼트 취소
//   const handleCancel = (tournamentId) => {
//     setTournaments(tournaments.map(t => 
//       t.id === tournamentId 
//         ? { ...t, registered: false, currentPlayers: t.currentPlayers - 1 }
//         : t
//     ));
//     alert('토너먼트 신청이 취소되었습니다.');
//   };

//   // 경기 입장
//   const handleEnterMatch = (match) => {
//     setCurrentGame(match);
//     setShowGameModal(true);
    
//     if (match.gameType === 'rps') {
//       setRpsGame({
//         myChoice: null,
//         opponentChoice: null,
//         myScore: 0,
//         opponentScore: 0,
//         round: 1,
//         result: null,
//         isPlaying: false
//       });
//     } else {
//       setLadderGame({
//         ...ladderGame,
//         selectedLadder: null,
//         result: null,
//         isRevealed: false
//       });
//     }
//   };

//   // 가위바위보 선택
//   const handleRPSChoice = (choice) => {
//     const choices = ['rock', 'paper', 'scissors'];
//     const opponentChoice = choices[Math.floor(Math.random() * 3)];
    
//     setRpsGame(prev => ({
//       ...prev,
//       myChoice: choice,
//       opponentChoice: opponentChoice,
//       isPlaying: true
//     }));

//     setTimeout(() => {
//       const result = getWinner(choice, opponentChoice);
//       let newMyScore = rpsGame.myScore;
//       let newOpponentScore = rpsGame.opponentScore;

//       if (result === 'win') newMyScore++;
//       else if (result === 'lose') newOpponentScore++;

//       setRpsGame(prev => ({
//         ...prev,
//         myScore: newMyScore,
//         opponentScore: newOpponentScore,
//         result: result
//       }));

//       // 3판 2선승제
//       setTimeout(() => {
//         if (newMyScore === 2 || newOpponentScore === 2) {
//           alert(newMyScore === 2 ? '🎉 승리했습니다!' : '😢 패배했습니다.');
//           setShowGameModal(false);
//         } else {
//           setRpsGame(prev => ({
//             ...prev,
//             myChoice: null,
//             opponentChoice: null,
//             result: null,
//             round: prev.round + 1,
//             isPlaying: false
//           }));
//         }
//       }, 2000);
//     }, 1500);
//   };

//   const getWinner = (my, opponent) => {
//     if (my === opponent) return 'draw';
//     if (
//       (my === 'rock' && opponent === 'scissors') ||
//       (my === 'paper' && opponent === 'rock') ||
//       (my === 'scissors' && opponent === 'paper')
//     ) {
//       return 'win';
//     }
//     return 'lose';
//   };

//   // 사다리 선택
//   const handleLadderChoice = (ladderId) => {
//     if (ladderGame.selectedLadder) return;

//     setLadderGame(prev => ({
//       ...prev,
//       selectedLadder: ladderId
//     }));

//     setTimeout(() => {
//       // 랜덤으로 결과 결정
//       const winningLadder = Math.floor(Math.random() * 8) + 1;
//       setLadderGame(prev => ({
//         ...prev,
//         result: winningLadder,
//         isRevealed: true
//       }));

//       setTimeout(() => {
//         if (ladderId === winningLadder) {
//           alert('🎉 축하합니다! 당첨되셨습니다!');
//         } else {
//           alert('아쉽게 떨어졌습니다. 다음 기회에!');
//         }
//         setShowGameModal(false);
//       }, 3000);
//     }, 2000);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       recruiting: { text: '모집중', class: 'status-recruiting' },
//       ongoing: { text: '진행중', class: 'status-ongoing' },
//       completed: { text: '종료', class: 'status-completed' }
//     };
//     return badges[status] || badges.recruiting;
//   };

//   const getGameIcon = (gameType) => {
//     return gameType === 'rps' ? '✊✋✌️' : '🪜';
//   };

//   const getGameName = (gameType) => {
//     return gameType === 'rps' ? '가위바위보' : '사다리타기';
//   };

//   const getRPSIcon = (choice) => {
//     const icons = {
//       rock: '✊',
//       paper: '✋',
//       scissors: '✌️'
//     };
//     return icons[choice] || '❓';
//   };

//   return (
//     <div className="game-page">
//       <div className="game-header">
//         <h1>🎮 캠핑장 게임 토너먼트</h1>
//         <p>손님 여러분과 함께하는 즐거운 게임 대회!</p>
//       </div>

//       {/* Tabs */}
//       <div className="game-tabs">
//         <button
//           className={`tab ${activeTab === 'tournament' ? 'active' : ''}`}
//           onClick={() => setActiveTab('tournament')}
//         >
//           <FiUsers />
//           토너먼트 목록
//         </button>
//         <button
//           className={`tab ${activeTab === 'myMatch' ? 'active' : ''}`}
//           onClick={() => setActiveTab('myMatch')}
//         >
//           <FiTrendingUp />
//           내 경기
//         </button>
//         <button
//           className={`tab ${activeTab === 'history' ? 'active' : ''}`}
//           onClick={() => setActiveTab('history')}
//         >
//           <FiAward />
//           대회 기록
//         </button>
//       </div>

//       {/* Tournament List */}
//       {activeTab === 'tournament' && (
//         <div className="tournament-list">
//           {tournaments.map(tournament => {
//             const statusBadge = getStatusBadge(tournament.status);
//             const isFull = tournament.currentPlayers >= tournament.maxPlayers;

//             return (
//               <div key={tournament.id} className="tournament-card">
//                 <div className="tournament-header">
//                   <div className="tournament-icon">
//                     {getGameIcon(tournament.gameType)}
//                   </div>
//                   <div className="tournament-info">
//                     <h3>{tournament.title}</h3>
//                     <span className="game-type">{getGameName(tournament.gameType)}</span>
//                   </div>
//                   <span className={`status-badge ${statusBadge.class}`}>
//                     {statusBadge.text}
//                   </span>
//                 </div>

//                 <div className="tournament-details">
//                   <div className="detail-item">
//                     <FiClock />
//                     <div>
//                       <span className="label">시작 시간</span>
//                       <span className="value">{tournament.startTime}</span>
//                     </div>
//                   </div>
//                   <div className="detail-item">
//                     <FiUsers />
//                     <div>
//                       <span className="label">참가 인원</span>
//                       <span className="value">
//                         {tournament.currentPlayers} / {tournament.maxPlayers}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="detail-item">
//                     <FiAward />
//                     <div>
//                       <span className="label">우승 상품</span>
//                       <span className="value prize">{tournament.prize}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="tournament-progress">
//                   <div
//                     className="progress-bar"
//                     style={{
//                       width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%`
//                     }}
//                   />
//                 </div>

//                 <div className="tournament-actions">
//                   {tournament.status === 'recruiting' && (
//                     <>
//                       {tournament.registered ? (
//                         <button
//                           className="btn btn-outline"
//                           onClick={() => handleCancel(tournament.id)}
//                         >
//                           신청 취소
//                         </button>
//                       ) : (
//                         <button
//                           className="btn btn-primary"
//                           onClick={() => handleRegister(tournament.id)}
//                           disabled={isFull}
//                         >
//                           {isFull ? '정원 마감' : '참가 신청'}
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => setSelectedTournament(tournament)}
//                       >
//                         상세 보기
//                       </button>
//                     </>
//                   )}
//                   {tournament.status === 'ongoing' && (
//                     <button className="btn btn-primary">
//                       대진표 보기
//                     </button>
//                   )}
//                   {tournament.status === 'completed' && (
//                     <button className="btn btn-outline">
//                       결과 보기
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* My Matches */}
//       {activeTab === 'myMatch' && (
//         <div className="my-matches">
//           {myMatches.length > 0 ? (
//             myMatches.map(match => (
//               <div key={match.id} className="match-card">
//                 <div className="match-header">
//                   <h3>{match.tournamentTitle}</h3>
//                   <span className="round-badge">{match.round}</span>
//                 </div>
//                 <div className="match-vs">
//                   <div className="player me">
//                     <div className="player-avatar">👤</div>
//                     <span>{user?.name || '나'}</span>
//                   </div>
//                   <div className="vs">VS</div>
//                   <div className="player opponent">
//                     <div className="player-avatar">👤</div>
//                     <span>{match.opponent}</span>
//                   </div>
//                 </div>
//                 <div className="match-info">
//                   <FiClock />
//                   <span>경기 시간: {match.scheduledTime}</span>
//                 </div>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleEnterMatch(match)}
//                 >
//                   경기 입장
//                 </button>
//               </div>
//             ))
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon">🎮</div>
//               <h3>예정된 경기가 없습니다</h3>
//               <p>토너먼트에 참가하여 경기를 시작하세요!</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* History */}
//       {activeTab === 'history' && (
//         <div className="history-section">
//           <div className="stats-cards">
//             <div className="stat-card">
//               <div className="stat-icon">🏆</div>
//               <div className="stat-content">
//                 <span className="stat-label">우승 횟수</span>
//                 <span className="stat-value">2</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">🎯</div>
//               <div className="stat-content">
//                 <span className="stat-label">참가 대회</span>
//                 <span className="stat-value">5</span>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">📊</div>
//               <div className="stat-content">
//                 <span className="stat-label">승률</span>
//                 <span className="stat-value">68%</span>
//               </div>
//             </div>
//           </div>

//           <div className="history-list">
//             <h3>최근 대회 기록</h3>
//             <div className="history-item">
//               <div className="history-date">2026-02-05</div>
//               <div className="history-content">
//                 <h4>주말 가위바위보 토너먼트</h4>
//                 <span className="result win">🏆 우승</span>
//               </div>
//               <div className="history-prize">치킨 세트</div>
//             </div>
//             <div className="history-item">
//               <div className="history-date">2026-02-03</div>
//               <div className="history-content">
//                 <h4>행운의 사다리타기</h4>
//                 <span className="result second">🥈 준우승</span>
//               </div>
//               <div className="history-prize">캠핑용품</div>
//             </div>
//             <div className="history-item">
//               <div className="history-date">2026-02-01</div>
//               <div className="history-content">
//                 <h4>평일 가위바위보 대회</h4>
//                 <span className="result lose">참가</span>
//               </div>
//               <div className="history-prize">-</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tournament Detail Modal */}
//       {selectedTournament && (
//         <div className="modal-overlay" onClick={() => setSelectedTournament(null)}>
//           <div className="modal-content tournament-detail-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setSelectedTournament(null)}>
//               <FiX />
//             </button>

//             <div className="modal-header">
//               <div className="tournament-icon-large">
//                 {getGameIcon(selectedTournament.gameType)}
//               </div>
//               <h2>{selectedTournament.title}</h2>
//               <span className={`status-badge ${getStatusBadge(selectedTournament.status).class}`}>
//                 {getStatusBadge(selectedTournament.status).text}
//               </span>
//             </div>

//             <div className="modal-body">
//               <div className="detail-section">
//                 <h3>대회 정보</h3>
//                 <p className="description">{selectedTournament.description}</p>
//                 <div className="info-grid">
//                   <div className="info-item">
//                     <FiClock />
//                     <div>
//                       <span className="label">시작 시간</span>
//                       <span className="value">{selectedTournament.startTime}</span>
//                     </div>
//                   </div>
//                   <div className="info-item">
//                     <FiUsers />
//                     <div>
//                       <span className="label">참가 인원</span>
//                       <span className="value">
//                         {selectedTournament.currentPlayers} / {selectedTournament.maxPlayers}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="info-item">
//                     <FiAward />
//                     <div>
//                       <span className="label">우승 상품</span>
//                       <span className="value prize">{selectedTournament.prize}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h3>대회 규칙</h3>
//                 <ul className="rules-list">
//                   {selectedTournament.rules.map((rule, index) => (
//                     <li key={index}>{rule}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="detail-section">
//                 <h3>참가자 목록 ({selectedTournament.participants.length}명)</h3>
//                 <div className="participants-grid">
//                   {selectedTournament.participants.map((participant, index) => (
//                     <div key={index} className="participant-item">
//                       <span className="participant-number">{index + 1}</span>
//                       <span className="participant-name">{participant}</span>
//                     </div>
//                   ))}
//                   {Array(selectedTournament.maxPlayers - selectedTournament.participants.length)
//                     .fill(null)
//                     .map((_, index) => (
//                       <div key={`empty-${index}`} className="participant-item empty">
//                         <span className="participant-number">{selectedTournament.participants.length + index + 1}</span>
//                         <span className="participant-name">대기중...</span>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>

//             <div className="modal-footer">
//               {selectedTournament.registered ? (
//                 <button
//                   className="btn btn-outline btn-lg"
//                   onClick={() => {
//                     handleCancel(selectedTournament.id);
//                     setSelectedTournament(null);
//                   }}
//                 >
//                   신청 취소
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-primary btn-lg"
//                   onClick={() => handleRegister(selectedTournament.id)}
//                   disabled={selectedTournament.currentPlayers >= selectedTournament.maxPlayers}
//                 >
//                   {selectedTournament.currentPlayers >= selectedTournament.maxPlayers ? '정원 마감' : '참가 신청'}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Game Play Modal */}
//       {showGameModal && currentGame && (
//         <div className="modal-overlay" onClick={() => setShowGameModal(false)}>
//           <div className="modal-content game-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="modal-close" onClick={() => setShowGameModal(false)}>
//               <FiX />
//             </button>

//             {currentGame.gameType === 'rps' ? (
//               // 가위바위보 게임
//               <div className="rps-game">
//                 <div className="game-header">
//                   <h2>가위바위보 대결</h2>
//                   <div className="game-round">Round {rpsGame.round}</div>
//                 </div>

//                 <div className="game-score">
//                   <div className="score-item me">
//                     <span className="player-name">{user?.name || '나'}</span>
//                     <span className="score">{rpsGame.myScore}</span>
//                   </div>
//                   <div className="score-divider">:</div>
//                   <div className="score-item opponent">
//                     <span className="score">{rpsGame.opponentScore}</span>
//                     <span className="player-name">{currentGame.opponent}</span>
//                   </div>
//                 </div>

//                 <div className="game-field">
//                   <div className="player-choice me">
//                     <div className="choice-display">
//                       {rpsGame.myChoice ? getRPSIcon(rpsGame.myChoice) : '❓'}
//                     </div>
//                     <span>{user?.name || '나'}</span>
//                   </div>

//                   {rpsGame.result && (
//                     <div className={`game-result ${rpsGame.result}`}>
//                       {rpsGame.result === 'win' && '승리!'}
//                       {rpsGame.result === 'lose' && '패배!'}
//                       {rpsGame.result === 'draw' && '무승부!'}
//                     </div>
//                   )}

//                   <div className="player-choice opponent">
//                     <div className="choice-display">
//                       {rpsGame.opponentChoice ? getRPSIcon(rpsGame.opponentChoice) : '❓'}
//                     </div>
//                     <span>{currentGame.opponent}</span>
//                   </div>
//                 </div>

//                 {!rpsGame.isPlaying && !rpsGame.result && (
//                   <div className="rps-choices">
//                     <button
//                       className="choice-btn"
//                       onClick={() => handleRPSChoice('rock')}
//                     >
//                       ✊<br />바위
//                     </button>
//                     <button
//                       className="choice-btn"
//                       onClick={() => handleRPSChoice('scissors')}
//                     >
//                       ✌️<br />가위
//                     </button>
//                     <button
//                       className="choice-btn"
//                       onClick={() => handleRPSChoice('paper')}
//                     >
//                       ✋<br />보
//                     </button>
//                   </div>
//                 )}

//                 {rpsGame.isPlaying && !rpsGame.result && (
//                   <div className="waiting-message">
//                     상대방이 선택 중입니다...
//                   </div>
//                 )}
//               </div>
//             ) : (
//               // 사다리타기 게임
//               <div className="ladder-game">
//                 <div className="game-header">
//                   <h2>행운의 사다리타기</h2>
//                   <p>사다리를 선택하세요!</p>
//                 </div>

//                 <div className="ladder-container">
//                   <div className="ladder-grid">
//                     {ladderGame.ladders.map((ladder) => (
//                       <div
//                         key={ladder.id}
//                         className={`ladder-item ${
//                           ladderGame.selectedLadder === ladder.id ? 'selected' : ''
//                         } ${
//                           ladderGame.isRevealed && ladderGame.result === ladder.id ? 'winner' : ''
//                         } ${
//                           ladderGame.isRevealed && ladderGame.selectedLadder === ladder.id && ladderGame.result !== ladder.id ? 'loser' : ''
//                         }`}
//                         onClick={() => handleLadderChoice(ladder.id)}
//                       >
//                         <div className="ladder-number">{ladder.id}</div>
//                         <div className="ladder-line"></div>
//                         {ladderGame.isRevealed && (
//                           <div className="ladder-prize">{ladder.prize}</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {ladderGame.selectedLadder && !ladderGame.isRevealed && (
//                     <div className="waiting-message">
//                       결과를 확인하는 중...
//                     </div>
//                   )}

//                   {ladderGame.isRevealed && (
//                     <div className={`game-result ${ladderGame.selectedLadder === ladderGame.result ? 'win' : 'lose'}`}>
//                       {ladderGame.selectedLadder === ladderGame.result ? '🎉 당첨!' : '😢 아쉽네요!'}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Game;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiUsers, FiTrendingUp, FiAward, FiClock, FiX, FiCheckCircle } from 'react-icons/fi';
import '../../styles/Game.css';

const Game = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tournament');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showBracketModal, setShowBracketModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false); // 게임 플레이 모달
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null); // 현재 진행중인 매치
  
  // 게임 상태
  const [gameType, setGameType] = useState(null); // 'rps' or 'ladder'
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'result'
  const [myChoice, setMyChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [roundScore, setRoundScore] = useState({ me: 0, opponent: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);
  const [winner, setWinner] = useState(null);

  // 사다리타기 상태
  const [ladderPosition, setLadderPosition] = useState(null);
  const [ladderResult, setLadderResult] = useState(null);
  
  // ... 기존 tournaments, myMatches 코드 유지 ...

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
      registered: false,
      description: '주말을 즐겁게! 가위바위보로 승부를 가려보세요!',
      rules: [
        '16강 토너먼트 방식',
        '1:1 가위바위보 3판 2선승제',
        '준결승부터는 5판 3선승제',
        '시간 내 미입장시 자동 패배'
      ],
      participants: [
        '김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산책',
        '윤바베큐', '장낚시', '조등산', '한별빛', '송호수', '임숲속'
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
      registered: false,
      description: '행운을 시험해보세요! 사다리타기로 상품을 받아가세요!',
      rules: [
        '8명 동시 진행',
        '1등부터 8등까지 차등 상품',
        '공정한 추첨을 위해 관리자 진행',
        '참가자는 번호만 선택'
      ],
      participants: [
        '김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산책'
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
      registered: true,
      description: '평일 오후, 간단한 가위바위보 게임!',
      rules: [
        '8강 토너먼트',
        '3판 2선승제',
        '결승전은 5판 3선승제'
      ],
      participants: [
        '김캠핑', '이자연', '박야외', '최텐트', '정글램핑', '강산책', '윤바베큐', '장낚시'
      ],
      bracket: {
        round: '준결승',
        matches: [
          {
            id: 1,
            round: '8강',
            player1: '김캠핑',
            player2: '이자연',
            winner: '김캠핑',
            score: '2:1',
            completed: true
          },
          {
            id: 2,
            round: '8강',
            player1: '박야외',
            player2: '최텐트',
            winner: '박야외',
            score: '2:0',
            completed: true
          },
          {
            id: 3,
            round: '8강',
            player1: '정글램핑',
            player2: '강산책',
            winner: '정글램핑',
            score: '2:1',
            completed: true
          },
          {
            id: 4,
            round: '8강',
            player1: '윤바베큐',
            player2: '장낚시',
            winner: '윤바베큐',
            score: '2:0',
            completed: true
          },
          {
            id: 5,
            round: '준결승',
            player1: '김캠핑',
            player2: '박야외',
            winner: null,
            score: null,
            completed: false,
            isMyMatch: true
          },
          {
            id: 6,
            round: '준결승',
            player1: '정글램핑',
            player2: '윤바베큐',
            winner: null,
            score: null,
            completed: false
          }
        ]
      }
    }
  ]);

  const [myMatches, setMyMatches] = useState([
    {
      id: 1,
      tournamentId: 3,
      tournamentTitle: '평일 가위바위보 대회',
      gameType: 'rps',
      round: '준결승',
      opponent: '박야외',
      status: 'waiting',
      scheduledTime: '2026-02-06 14:30'
    }
  ]);

  // 경기 입장
  const enterMatch = (match) => {
    setCurrentMatch(match);
    setGameType(match.gameType);
    setGameState('waiting');
    setMyChoice(null);
    setOpponentChoice(null);
    setRoundScore({ me: 0, opponent: 0 });
    setCurrentRound(1);
    setMaxRounds(match.round === '결승' ? 5 : 3);
    setWinner(null);
    setShowGameModal(true);
    setShowBracketModal(false);
  };

  // 가위바위보 선택
  const handleRPSChoice = (choice) => {
    if (gameState !== 'waiting') return;

    setMyChoice(choice);
    setGameState('playing');

    // AI 선택 시뮬레이션
    setTimeout(() => {
      const choices = ['rock', 'paper', 'scissors'];
      const aiChoice = choices[Math.floor(Math.random() * choices.length)];
      setOpponentChoice(aiChoice);

      // 승자 판정
      const result = determineRPSWinner(choice, aiChoice);
      
      setTimeout(() => {
        if (result === 'win') {
          const newScore = { ...roundScore, me: roundScore.me + 1 };
          setRoundScore(newScore);
          
          if (newScore.me >= Math.ceil(maxRounds / 2)) {
            setWinner('me');
            setGameState('result');
          } else {
            proceedToNextRound();
          }
        } else if (result === 'lose') {
          const newScore = { ...roundScore, opponent: roundScore.opponent + 1 };
          setRoundScore(newScore);
          
          if (newScore.opponent >= Math.ceil(maxRounds / 2)) {
            setWinner('opponent');
            setGameState('result');
          } else {
            proceedToNextRound();
          }
        } else {
          proceedToNextRound();
        }
      }, 1500);
    }, 1000);
  };

  // 가위바위보 승패 판정
  const determineRPSWinner = (myChoice, opponentChoice) => {
    if (myChoice === opponentChoice) return 'draw';
    
    if (
      (myChoice === 'rock' && opponentChoice === 'scissors') ||
      (myChoice === 'paper' && opponentChoice === 'rock') ||
      (myChoice === 'scissors' && opponentChoice === 'paper')
    ) {
      return 'win';
    }
    
    return 'lose';
  };

  // 다음 라운드로
  const proceedToNextRound = () => {
    setTimeout(() => {
      setCurrentRound(currentRound + 1);
      setMyChoice(null);
      setOpponentChoice(null);
      setGameState('waiting');
    }, 2000);
  };

  // 사다리타기 번호 선택
  const handleLadderChoice = (position) => {
    setLadderPosition(position);
    setGameState('playing');

    // 사다리타기 결과 시뮬레이션
    setTimeout(() => {
      const results = [
        { rank: 1, prize: '🏆 1등 - 캠핑용품 세트' },
        { rank: 2, prize: '🥈 2등 - 치킨 세트' },
        { rank: 3, prize: '🥉 3등 - 커피 쿠폰' },
        { rank: 4, prize: '🎁 4등 - 음료수' },
        { rank: 5, prize: '🎁 5등 - 과자' },
        { rank: 6, prize: '🎁 6등 - 사탕' },
        { rank: 7, prize: '😢 7등 - 다음 기회에' },
        { rank: 8, prize: '😢 8등 - 다음 기회에' }
      ];
      
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setLadderResult(randomResult);
      setGameState('result');
    }, 3000);
  };

  // 게임 종료 후 처리
  const closeGameModal = () => {
    setShowGameModal(false);
    setCurrentMatch(null);
    setGameType(null);
    setGameState('waiting');
  };

  // 가위바위보 아이콘
  const getRPSIcon = (choice) => {
    const icons = {
      rock: '✊',
      paper: '✋',
      scissors: '✌️'
    };
    return icons[choice] || '❓';
  };

  const getRPSName = (choice) => {
    const names = {
      rock: '바위',
      paper: '보',
      scissors: '가위'
    };
    return names[choice] || '';
  };

  // ... 기존 함수들 유지 (handleRegister, handleCancel 등) ...

  const handleRegister = (tournamentId) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    setTournaments(tournaments.map(t => 
      t.id === tournamentId 
        ? { 
            ...t, 
            registered: true, 
            currentPlayers: t.currentPlayers + 1,
            participants: [...t.participants, user.name || '참가자']
          }
        : t
    ));
    alert('토너먼트 신청이 완료되었습니다!');
  };

  const handleCancel = (tournamentId) => {
    setTournaments(tournaments.map(t => 
      t.id === tournamentId 
        ? { 
            ...t, 
            registered: false, 
            currentPlayers: t.currentPlayers - 1,
            participants: t.participants.filter(p => p !== (user.name || '참가자'))
          }
        : t
    ));
    alert('토너먼트 신청이 취소되었습니다.');
  };

  const openDetailModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowDetailModal(true);
  };

  const openBracketModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowBracketModal(true);
  };

  const getStatusBadge = (status) => {
    const badges = {
      recruiting: { text: '모집중', class: 'status-recruiting' },
      ongoing: { text: '진행중', class: 'status-ongoing' },
      completed: { text: '종료', class: 'status-completed' }
    };
    return badges[status] || badges.recruiting;
  };

  const getGameIcon = (gameType) => {
    return gameType === 'rps' ? '✊✋✌️' : '🪜';
  };

  const getGameName = (gameType) => {
    return gameType === 'rps' ? '가위바위보' : '사다리타기';
  };

  return (
    <div className="game-page">
      {/* 기존 코드 유지 - 헤더, 탭, 토너먼트 리스트 등 */}
      <div className="game-header">
        <h1>🎮 캠핑장 게임 토너먼트</h1>
        <p>손님 여러분과 함께하는 즐거운 게임 대회!</p>
      </div>

      <div className="game-tabs">
        <button
          className={`tab ${activeTab === 'tournament' ? 'active' : ''}`}
          onClick={() => setActiveTab('tournament')}
        >
          <FiUsers />
          토너먼트 목록
        </button>
        <button
          className={`tab ${activeTab === 'myMatch' ? 'active' : ''}`}
          onClick={() => setActiveTab('myMatch')}
        >
          <FiTrendingUp />
          내 경기
        </button>
        <button
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FiAward />
          대회 기록
        </button>
      </div>

      {/* Tournament List - 기존 코드 유지 */}
      {activeTab === 'tournament' && (
        <div className="tournament-list">
          {tournaments.map(tournament => {
            const statusBadge = getStatusBadge(tournament.status);
            const isFull = tournament.currentPlayers >= tournament.maxPlayers;

            return (
              <div key={tournament.id} className="tournament-card">
                <div className="tournament-header">
                  <div className="tournament-icon">
                    {getGameIcon(tournament.gameType)}
                  </div>
                  <div className="tournament-info">
                    <h3>{tournament.title}</h3>
                    <span className="game-type">{getGameName(tournament.gameType)}</span>
                  </div>
                  <span className={`status-badge ${statusBadge.class}`}>
                    {statusBadge.text}
                  </span>
                </div>

                <div className="tournament-details">
                  <div className="detail-item">
                    <FiClock />
                    <div>
                      <span className="label">시작 시간</span>
                      <span className="value">{tournament.startTime}</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FiUsers />
                    <div>
                      <span className="label">참가 인원</span>
                      <span className="value">
                        {tournament.currentPlayers} / {tournament.maxPlayers}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FiAward />
                    <div>
                      <span className="label">우승 상품</span>
                      <span className="value prize">{tournament.prize}</span>
                    </div>
                  </div>
                </div>

                <div className="tournament-progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%`
                    }}
                  />
                </div>

                <div className="tournament-actions">
                  {tournament.status === 'recruiting' && (
                    <>
                      {tournament.registered ? (
                        <button
                          className="btn btn-outline"
                          onClick={() => handleCancel(tournament.id)}
                        >
                          신청 취소
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleRegister(tournament.id)}
                          disabled={isFull}
                        >
                          {isFull ? '정원 마감' : '참가 신청'}
                        </button>
                      )}
                      <button
                        className="btn btn-secondary"
                        onClick={() => openDetailModal(tournament)}
                      >
                        상세 보기
                      </button>
                    </>
                  )}
                  {tournament.status === 'ongoing' && (
                    <>
                      <button 
                        className="btn btn-primary"
                        onClick={() => openBracketModal(tournament)}
                      >
                        대진표 보기
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openDetailModal(tournament)}
                      >
                        상세 보기
                      </button>
                    </>
                  )}
                  {tournament.status === 'completed' && (
                    <>
                      <button 
                        className="btn btn-outline"
                        onClick={() => openBracketModal(tournament)}
                      >
                        결과 보기
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => openDetailModal(tournament)}
                      >
                        상세 보기
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* My Matches */}
      {activeTab === 'myMatch' && (
        <div className="my-matches">
          {myMatches.length > 0 ? (
            myMatches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <h3>{match.tournamentTitle}</h3>
                  <span className="round-badge">{match.round}</span>
                </div>
                <div className="match-vs">
                  <div className="player me">
                    <div className="player-avatar">👤</div>
                    <span>{user?.name || '나'}</span>
                  </div>
                  <div className="vs">VS</div>
                  <div className="player opponent">
                    <div className="player-avatar">👤</div>
                    <span>{match.opponent}</span>
                  </div>
                </div>
                <div className="match-info">
                  <FiClock />
                  <span>경기 시간: {match.scheduledTime}</span>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => enterMatch(match)}
                >
                  경기 입장
                </button>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎮</div>
              <h3>예정된 경기가 없습니다</h3>
              <p>토너먼트에 참가하여 경기를 시작하세요!</p>
            </div>
          )}
        </div>
      )}

      {/* History - 기존 코드 유지 */}
      {activeTab === 'history' && (
        <div className="history-section">
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <span className="stat-label">우승 횟수</span>
                <span className="stat-value">2</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-label">참가 대회</span>
                <span className="stat-value">5</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-label">승률</span>
                <span className="stat-value">68%</span>
              </div>
            </div>
          </div>

          <div className="history-list">
            <h3>최근 대회 기록</h3>
            <div className="history-item">
              <div className="history-date">2026-02-05</div>
              <div className="history-content">
                <h4>주말 가위바위보 토너먼트</h4>
                <span className="result win">🏆 우승</span>
              </div>
              <div className="history-prize">치킨 세트</div>
            </div>
            <div className="history-item">
              <div className="history-date">2026-02-03</div>
              <div className="history-content">
                <h4>행운의 사다리타기</h4>
                <span className="result second">🥈 준우승</span>
              </div>
              <div className="history-prize">캠핑용품</div>
            </div>
            <div className="history-item">
              <div className="history-date">2026-02-01</div>
              <div className="history-content">
                <h4>평일 가위바위보 대회</h4>
                <span className="result lose">참가</span>
              </div>
              <div className="history-prize">-</div>
            </div>
          </div>
        </div>
      )}

      {/* 기존 모달들 유지 - Detail Modal, Bracket Modal */}
      {showDetailModal && selectedTournament && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTournament.title}</h2>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <div className="detail-badge">
                  <span className="badge-icon">{getGameIcon(selectedTournament.gameType)}</span>
                  <span className="badge-text">{getGameName(selectedTournament.gameType)}</span>
                </div>
                <p className="tournament-description">{selectedTournament.description}</p>
              </div>

              <div className="detail-section">
                <h3>대회 정보</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">시작 시간</span>
                    <span className="info-value">{selectedTournament.startTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">참가 인원</span>
                    <span className="info-value">
                      {selectedTournament.currentPlayers} / {selectedTournament.maxPlayers}명
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">우승 상품</span>
                    <span className="info-value prize">{selectedTournament.prize}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">진행 상태</span>
                    <span className={`info-value ${getStatusBadge(selectedTournament.status).class}`}>
                      {getStatusBadge(selectedTournament.status).text}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>경기 규칙</h3>
                <ul className="rules-list">
                  {selectedTournament.rules.map((rule, index) => (
                    <li key={index}>
                      <FiCheckCircle />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>참가자 목록 ({selectedTournament.participants.length}명)</h3>
                <div className="participants-grid">
                  {selectedTournament.participants.map((participant, index) => (
                    <div key={index} className="participant-item">
                      <div className="participant-avatar">👤</div>
                      <span>{participant}</span>
                    </div>
                  ))}
                  {Array.from({ length: selectedTournament.maxPlayers - selectedTournament.participants.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="participant-item empty">
                      <div className="participant-avatar">❓</div>
                      <span>대기중...</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedTournament.status === 'recruiting' && (
                selectedTournament.registered ? (
                  <button
                    className="btn btn-outline btn-large"
                    onClick={() => {
                      handleCancel(selectedTournament.id);
                      setShowDetailModal(false);
                    }}
                  >
                    신청 취소
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-large"
                    onClick={() => {
                      handleRegister(selectedTournament.id);
                      setShowDetailModal(false);
                    }}
                    disabled={selectedTournament.currentPlayers >= selectedTournament.maxPlayers}
                  >
                    참가 신청하기
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {showBracketModal && selectedTournament && selectedTournament.bracket && (
        <div className="modal-overlay" onClick={() => setShowBracketModal(false)}>
          <div className="modal-content bracket-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>대진표 - {selectedTournament.title}</h2>
              <button className="close-btn" onClick={() => setShowBracketModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="bracket-container">
                <div className="bracket-round">
                  <h3 className="round-title">8강</h3>
                  {selectedTournament.bracket.matches
                    .filter(m => m.round === '8강')
                    .map(match => (
                      <div key={match.id} className={`bracket-match ${match.completed ? 'completed' : ''}`}>
                        <div className={`bracket-player ${match.winner === match.player1 ? 'winner' : ''}`}>
                          <span>{match.player1}</span>
                          {match.winner === match.player1 && <FiCheckCircle />}
                        </div>
                        <div className="bracket-score">
                          {match.score || 'VS'}
                        </div>
                        <div className={`bracket-player ${match.winner === match.player2 ? 'winner' : ''}`}>
                          <span>{match.player2}</span>
                          {match.winner === match.player2 && <FiCheckCircle />}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="bracket-round">
                  <h3 className="round-title">준결승</h3>
                  {selectedTournament.bracket.matches
                    .filter(m => m.round === '준결승')
                    .map(match => (
                      <div 
                        key={match.id} 
                        className={`bracket-match ${match.completed ? 'completed' : ''} ${match.isMyMatch ? 'my-match' : ''}`}
                      >
                        <div className={`bracket-player ${match.winner === match.player1 ? 'winner' : ''}`}>
                          <span>{match.player1}</span>
                          {match.winner === match.player1 && <FiCheckCircle />}
                        </div>
                        <div className="bracket-score">
                          {match.score || 'VS'}
                        </div>
                        <div className={`bracket-player ${match.winner === match.player2 ? 'winner' : ''}`}>
                          <span>{match.player2}</span>
                          {match.winner === match.player2 && <FiCheckCircle />}
                        </div>
                        {match.isMyMatch && !match.completed && (
                          <button 
                            className="enter-match-btn"
                            onClick={() => enterMatch({
                              id: match.id,
                              tournamentId: selectedTournament.id,
                              tournamentTitle: selectedTournament.title,
                              gameType: selectedTournament.gameType,
                              round: match.round,
                              opponent: match.player2,
                              status: 'ready'
                            })}
                          >
                            경기 입장
                          </button>
                        )}
                      </div>
                    ))}
                </div>

                <div className="bracket-round">
                  <h3 className="round-title">결승</h3>
                  <div className="bracket-match waiting">
                    <div className="bracket-player">
                      <span>준결승 승자</span>
                    </div>
                    <div className="bracket-score">VS</div>
                    <div className="bracket-player">
                      <span>준결승 승자</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🎮 게임 플레이 모달 (새로 추가) */}
      {showGameModal && currentMatch && (
        <div className="modal-overlay game-overlay">
          <div className="modal-content game-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header game-header">
              <div>
                <h2>{currentMatch.tournamentTitle}</h2>
                <p className="game-round">{currentMatch.round}</p>
              </div>
              <button className="close-btn" onClick={closeGameModal}>
                <FiX />
              </button>
            </div>

            <div className="modal-body game-body">
              {/* 가위바위보 게임 */}
              {gameType === 'rps' && (
                <div className="rps-game">
                  {/* 스코어보드 */}
                  <div className="score-board">
                    <div className="score-item me">
                      <span className="player-name">{user?.name || '나'}</span>
                      <span className="score">{roundScore.me}</span>
                    </div>
                    <div className="round-info">
                      <span>Round {currentRound} / {maxRounds}</span>
                    </div>
                    <div className="score-item opponent">
                      <span className="score">{roundScore.opponent}</span>
                      <span className="player-name">{currentMatch.opponent}</span>
                    </div>
                  </div>

                  {/* 게임 영역 */}
                  <div className="game-area">
                    {gameState === 'waiting' && (
                      <div className="choice-section">
                        <h3>선택하세요!</h3>
                        <div className="rps-choices">
                          <button
                            className="rps-choice-btn"
                            onClick={() => handleRPSChoice('rock')}
                          >
                            <span className="choice-icon">✊</span>
                            <span className="choice-name">바위</span>
                          </button>
                          <button
                            className="rps-choice-btn"
                            onClick={() => handleRPSChoice('scissors')}
                          >
                            <span className="choice-icon">✌️</span>
                            <span className="choice-name">가위</span>
                          </button>
                          <button
                            className="rps-choice-btn"
                            onClick={() => handleRPSChoice('paper')}
                          >
                            <span className="choice-icon">✋</span>
                            <span className="choice-name">보</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {gameState === 'playing' && (
                      <div className="playing-section">
                        <div className="vs-container">
                          <div className="player-choice">
                            <div className="choice-icon-large">
                              {getRPSIcon(myChoice)}
                            </div>
                            <span>{user?.name || '나'}</span>
                          </div>
                          <div className="vs-text">VS</div>
                          <div className="player-choice">
                            <div className="choice-icon-large">
                              {opponentChoice ? getRPSIcon(opponentChoice) : '❓'}
                            </div>
                            <span>{currentMatch.opponent}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {gameState === 'result' && (
                      <div className="result-section">
                        <div className="result-icon">
                          {winner === 'me' ? '🏆' : '😢'}
                        </div>
                        <h2 className={`result-text ${winner === 'me' ? 'win' : 'lose'}`}>
                          {winner === 'me' ? '승리!' : '패배!'}
                        </h2>
                        <p className="result-score">
                          최종 스코어: {roundScore.me} : {roundScore.opponent}
                        </p>
                        <button 
                          className="btn btn-primary btn-large"
                          onClick={closeGameModal}
                        >
                          확인
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 사다리타기 게임 */}
              {gameType === 'ladder' && (
                <div className="ladder-game">
                  {gameState === 'waiting' && (
                    <div className="ladder-choice-section">
                      <h3>번호를 선택하세요!</h3>
                      <p className="ladder-description">
                        1번부터 8번 중 하나를 선택하면<br />
                        자동으로 사다리를 타고 내려갑니다!
                      </p>
                      <div className="ladder-positions">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <button
                            key={num}
                            className="ladder-position-btn"
                            onClick={() => handleLadderChoice(num)}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {gameState === 'playing' && (
                    <div className="ladder-playing">
                      <div className="ladder-animation">
                        <div className="ladder-icon">🪜</div>
                        <p>사다리를 타고 내려가는 중...</p>
                        <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}

                  {gameState === 'result' && ladderResult && (
                    <div className="ladder-result-section">
                      <div className="result-icon-large">
                        {ladderResult.rank <= 3 ? '🎉' : '😊'}
                      </div>
                      <h2 className="ladder-result-title">
                        {ladderResult.prize}
                      </h2>
                      <p className="ladder-result-description">
                        선택한 번호: {ladderPosition}번
                      </p>
                      <button 
                        className="btn btn-primary btn-large"
                        onClick={closeGameModal}
                      >
                        확인
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
