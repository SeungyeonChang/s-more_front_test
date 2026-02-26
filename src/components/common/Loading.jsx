import React from 'react';
import './Loading.css';

const Loading = ({ fullScreen = false }) => {
  return (
    <div className={`loading-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
      <p>로딩중...</p>
    </div>
  );
};

export default Loading;
