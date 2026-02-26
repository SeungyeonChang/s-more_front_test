import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Auth from './pages/user/Auth';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// User Pages
import Home from './pages/user/Home';
import Reservation from './pages/user/Reservation';
import Menu from './pages/user/Menu';
import Cart from './pages/user/Cart';
import Facilities from './pages/user/Facilities';
import MyPage from './pages/user/MyPage';
import MyReservations from './pages/user/MyReservations';
import MyBenefits from './pages/user/MyBenefits';
import Settings from './pages/user/Settings';
import AIHub from './pages/user/AIHub';
import MovieHub from './pages/user/MovieHub';
import MovieDetail from './pages/user/MovieDetail';
import MovieBooking from './pages/user/MovieBooking';
import MoviePaymentComplete from './pages/user/MoviePaymentComplete';
import Game from './pages/user/Game';
import Community from './pages/user/Community';
import Chatbot from './pages/user/Chatbot';
import Support from './pages/user/Support';
import Parking from './pages/user/Parking';
import Weather from './pages/user/Weather';
import Map from './pages/user/Map';
import Notifications from './pages/user/Notifications';
import SiteList from './pages/user/SiteList';
import SiteDetail from './pages/user/SiteDetail';
import Payment from './pages/user/Payment';
import BookingComplete from './pages/user/BookingComplete';
import MyActivity from './pages/user/MyActivity';

// Admin Pages
import Dashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminReservations from './pages/admin/AdminReservations';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSites from './pages/admin/AdminSites';
import AdminOrders from './pages/admin/AdminOrders';
// Admin Pages import 섹션에 추가
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAI from './pages/admin/AdminAI';
import AdminChat from './pages/admin/AdminChat';
import AdminParking from './pages/admin/AdminParking';
import AdminMap from './pages/admin/AdminMap';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminContent from './pages/admin/AdminContent';
import AdminBackup from './pages/admin/AdminBackup';
import AdminGame from './pages/admin/AdminGame';
import AdminMovie from './pages/admin/AdminMovie';

import './styles/global.css';
import VisitingInfo from './pages/user/VisitingInfo';
import MenuBooking from './pages/user/MenuBooking';
import MenuPaymentComplete from './pages/user/MenuPaymentComplete';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏕️</div>
          <p>로딩중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* User Routes */}
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />

              {/* Reservation Routes */}
              {/* <Route path="reservation" element={<Reservation />} /> */}
              <Route path="sites" element={<SiteList />} />
              <Route path="sites/:id" element={<SiteDetail />} />
              <Route path="payment" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              <Route path="booking-complete" element={
                <ProtectedRoute>
                  <BookingComplete />
                </ProtectedRoute>
              } />

              <Route path="/facilities" element={<Facilities />} />
              
              {/* Menu & Cart */}
              <Route path="menu" element={<Menu />} />
              <Route path="cart" element={<Cart />} />
              
              {/* MyPage Routes */}
              <Route path="mypage" element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              } />
              <Route path="mypage/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="mypage/activity" element={
                <ProtectedRoute>
                  <MyActivity />
                </ProtectedRoute>
              } />

              <Route path="/mypage/reservations" element={<MyReservations />} />

              <Route path="/mypage/benefits" element={<MyBenefits />} />
              
              {/* Entertainment Routes */}
              <Route path="ai-hub" element={<AIHub />} />
              <Route path="movies" element={<MovieHub />} />
              <Route path="/movies/:movieId" element={<MovieDetail />} />
              {/* <Route path="/movies/:movieId/book/:scheduleId" element={<MovieBooking />} /> */}
              <Route path="/movies/:movieId/book" element={<MovieBooking />} />
              <Route path="/movies/payment/complete" element={<MoviePaymentComplete />} />
              <Route path="/menues/book" element={<MenuBooking />} />
              <Route path="/menues/payment/complete" element={<MenuPaymentComplete />} />
              <Route path="game" element={<Game />} />
              <Route path="/visiting-info" element={<VisitingInfo />} />
              
              {/* Community Routes */}
              <Route path="community" element={<Community />} />
              
              {/* Service Routes */}
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="support" element={<Support />} />
              <Route path="parking" element={<Parking />} />
              <Route path="weather" element={<Weather />} />
              <Route path="map" element={<Map />} />
              
              {/* Notifications */}
              <Route path="notifications" element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reservations" element={<AdminReservations />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="sites" element={<AdminSites />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="reports" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="ai" element={<AdminAI />} />
              <Route path="chat" element={<AdminChat />} />
              <Route path="parking" element={<AdminParking />} />
              <Route path="map" element={<AdminMap />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="backup" element={<AdminBackup />} />
              <Route path="game" element={<AdminGame />} />
              <Route path="movie" element={<AdminMovie />} />
            </Route>

            {/* 404 Not Found - 항상 맨 마지막에 위치 */}
            <Route path="*" element={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                background: '#f5f5f5'
              }}>
                <h1 style={{ fontSize: '72px', marginBottom: '16px', color: '#4CAF50' }}>404</h1>
                <p style={{ fontSize: '24px', marginBottom: '8px', fontWeight: '600' }}>
                  페이지를 찾을 수 없습니다
                </p>
                <p style={{ fontSize: '16px', color: '#757575', marginBottom: '32px' }}>
                  요청하신 페이지가 존재하지 않습니다.
                </p>
                <a href="/" style={{
                  padding: '12px 32px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}>
                  홈으로 돌아가기
                </a>
              </div>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
