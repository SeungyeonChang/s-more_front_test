import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ChatbotButton from '../components/chatbot/ChatbotButton';
import './UserLayout.css';

const UserLayout = () => {
  return (
    <div className="user-layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  );
};

export default UserLayout;
