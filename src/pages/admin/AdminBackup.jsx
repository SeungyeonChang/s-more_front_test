import React, { useState } from 'react';
import { FiDownload, FiUpload, FiDatabase, FiRefreshCw, FiClock, FiCheck } from 'react-icons/fi';
import '../../styles/AdminBackup.css';

const AdminBackup = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const backupHistory = [
    {
      id: 1,
      date: '2026-02-04',
      time: '14:30',
      size: '245 MB',
      type: 'auto',
      status: 'completed',
      duration: '2분 15초'
    },
    {
      id: 2,
      date: '2026-02-03',
      time: '14:30',
      size: '243 MB',
      type: 'auto',
      status: 'completed',
      duration: '2분 10초'
    },
    {
      id: 3,
      date: '2026-02-02',
      time: '14:30',
      size: '241 MB',
      type: 'auto',
      status: 'completed',
      duration: '2분 18초'
    },
    {
      id: 4,
      date: '2026-02-01',
      time: '10:15',
      size: '240 MB',
      type: 'manual',
      status: 'completed',
      duration: '2분 05초'
    },
    {
      id: 5,
      date: '2026-02-01',
      time: '14:30',
      size: '240 MB',
      type: 'auto',
      status: 'completed',
      duration: '2분 12초'
    }
  ];

  const backupSettings = {
    autoBackup: true,
    frequency: 'daily',
    time: '14:30',
    retention: 30,
    location: 'cloud'
  };

  const handleBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert('백업이 완료되었습니다!');
    }, 3000);
  };

  const handleRestore = (id) => {
    if (window.confirm('이 백업으로 복원하시겠습니까? 현재 데이터는 덮어쓰기됩니다.')) {
      setIsRestoring(true);
      setTimeout(() => {
        setIsRestoring(false);
        alert('복원이 완료되었습니다!');
      }, 3000);
    }
  };

  const handleDownload = (id) => {
    console.log(`백업 ${id} 다운로드`);
    alert('백업 파일 다운로드를 시작합니다.');
  };

  return (
    <div className="admin-backup">
      <div className="page-header">
        <div>
          <h1>💾 백업 & 복원</h1>
          <p>데이터 백업 및 복원 관리</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleBackup}
          disabled={isBackingUp}
        >
          <FiDatabase />
          {isBackingUp ? '백업 중...' : '수동 백업'}
        </button>
      </div>

      {/* Status Cards */}
      <div className="backup-status">
        <div className="status-card">
          <div className="card-icon success">
            <FiCheck />
          </div>
          <div className="card-content">
            <h3>마지막 백업</h3>
            <p className="card-value">
              {backupHistory[0].date} {backupHistory[0].time}
            </p>
            <span className="card-label">자동 백업 완료</span>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon info">
            <FiDatabase />
          </div>
          <div className="card-content">
            <h3>백업 크기</h3>
            <p className="card-value">{backupHistory[0].size}</p>
            <span className="card-label">최근 백업 파일</span>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon warning">
            <FiClock />
          </div>
          <div className="card-content">
            <h3>다음 백업</h3>
            <p className="card-value">오늘 14:30</p>
            <span className="card-label">자동 백업 예정</span>
          </div>
        </div>

        <div className="status-card">
          <div className="card-icon primary">
            <FiRefreshCw />
          </div>
          <div className="card-content">
            <h3>보관 기간</h3>
            <p className="card-value">{backupSettings.retention}일</p>
            <span className="card-label">백업 파일 보관</span>
          </div>
        </div>
      </div>

      <div className="backup-content">
        {/* Backup Settings */}
        <div className="backup-card settings-card">
          <div className="card-header">
            <h2>백업 설정</h2>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <strong>자동 백업</strong>
                <span>시스템 자동 백업 활성화</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked={backupSettings.autoBackup} />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <strong>백업 주기</strong>
                <span>백업 실행 빈도</span>
              </div>
              <select defaultValue={backupSettings.frequency}>
                <option value="hourly">매시간</option>
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="monthly">매월</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <strong>백업 시간</strong>
                <span>자동 백업 실행 시간</span>
              </div>
              <input type="time" defaultValue={backupSettings.time} />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <strong>보관 기간</strong>
                <span>백업 파일 보관 일수</span>
              </div>
              <select defaultValue={backupSettings.retention}>
                <option value="7">7일</option>
                <option value="14">14일</option>
                <option value="30">30일</option>
                <option value="60">60일</option>
                <option value="90">90일</option>
              </select>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <strong>저장 위치</strong>
                <span>백업 파일 저장 위치</span>
              </div>
              <select defaultValue={backupSettings.location}>
                <option value="cloud">클라우드</option>
                <option value="local">로컬 서버</option>
                <option value="both">클라우드 + 로컬</option>
              </select>
            </div>
          </div>

          <button className="btn btn-primary">
            설정 저장
          </button>
        </div>

        {/* Backup History */}
        <div className="backup-card history-card">
          <div className="card-header">
            <h2>백업 기록</h2>
          </div>
          <div className="history-list">
            {backupHistory.map(backup => (
              <div key={backup.id} className="history-item">
                <div className="history-icon">
                  <FiDatabase />
                </div>
                <div className="history-info">
                  <div className="history-header">
                    <strong>{backup.date} {backup.time}</strong>
                    <span className={`type-badge ${backup.type}`}>
                      {backup.type === 'auto' ? '자동' : '수동'}
                    </span>
                  </div>
                  <div className="history-details">
                    <span>크기: {backup.size}</span>
                    <span>•</span>
                    <span>소요시간: {backup.duration}</span>
                    <span>•</span>
                    <span className="status-success">완료</span>
                  </div>
                </div>
                <div className="history-actions">
                  <button
                    className="action-btn restore"
                    onClick={() => handleRestore(backup.id)}
                    disabled={isRestoring}
                  >
                    <FiRefreshCw />
                    복원
                  </button>
                  <button
                    className="action-btn download"
                    onClick={() => handleDownload(backup.id)}
                  >
                    <FiDownload />
                    다운로드
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {(isBackingUp || isRestoring) && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <FiRefreshCw className="spinning" />
            <p>{isBackingUp ? '백업 중...' : '복원 중...'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBackup;
