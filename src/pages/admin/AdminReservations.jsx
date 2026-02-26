import React, { useState } from 'react';
import { FiCalendar, FiSearch, FiFilter, FiDownload, FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import '../../styles/AdminReservations.css';
import '../../styles/AdminModal.css';

// 1. 사이트 목록
const SITE_OPTIONS = [
  'A구역 - 사이트 1', 'A구역 - 사이트 5', 'A구역 - 사이트 8',
  'B구역 - 사이트 1', 'B구역 - 사이트 8',
  'C구역 - 사이트 6', 'D구역 - 사이트 12', 
  'E구역 - 사이트 3', 'F구역 - 사이트 2'
];

const AdminReservations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // --- 페이징 상태 추가 ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  // --- 데이터 (페이징 확인을 위해 12개로 증량) ---
  const [reservations, setReservations] = useState([
    { id: 'RES-001', customer: '김캠핑', email: 'kim@example.com', phone: '010-1234-5678', site: 'A구역 - 사이트 5', checkIn: '2026-02-15', checkOut: '2026-02-16', guests: 4, amount: 50000, status: 'confirmed', createdAt: '2026-02-01' },
    { id: 'RES-002', customer: '이자연', email: 'lee@example.com', phone: '010-2345-6789', site: 'B구역 - 사이트 8', checkIn: '2026-02-16', checkOut: '2026-02-17', guests: 2, amount: 60000, status: 'pending', createdAt: '2026-02-02' },
    { id: 'RES-003', customer: '박야외', email: 'park@example.com', phone: '010-3456-7890', site: 'E구역 - 사이트 3', checkIn: '2026-02-14', checkOut: '2026-02-15', guests: 6, amount: 55000, status: 'confirmed', createdAt: '2026-01-28' },
    { id: 'RES-004', customer: '최캠핑', email: 'choi@example.com', phone: '010-4567-8901', site: 'D구역 - 사이트 12', checkIn: '2026-02-17', checkOut: '2026-02-18', guests: 4, amount: 70000, status: 'pending', createdAt: '2026-02-03' },
    { id: 'RES-005', customer: '정텐트', email: 'jung@example.com', phone: '010-5678-9012', site: 'C구역 - 사이트 6', checkIn: '2026-02-13', checkOut: '2026-02-14', guests: 2, amount: 45000, status: 'completed', createdAt: '2026-01-25' },
    { id: 'RES-006', customer: '강캠프', email: 'kang@example.com', phone: '010-6789-0123', site: 'F구역 - 사이트 2', checkIn: '2026-02-20', checkOut: '2026-02-21', guests: 5, amount: 65000, status: 'confirmed', createdAt: '2026-02-04' },
    { id: 'RES-007', customer: '윤아웃도어', email: 'yoon@example.com', phone: '010-7890-1234', site: 'A구역 - 사이트 8', checkIn: '2026-01-30', checkOut: '2026-01-31', guests: 3, amount: 50000, status: 'cancelled', createdAt: '2026-01-20' },
    { id: 'RES-008', customer: '이하늘', email: 'sky@example.com', phone: '010-8888-9999', site: 'B구역 - 사이트 1', checkIn: '2026-02-22', checkOut: '2026-02-23', guests: 4, amount: 55000, status: 'confirmed', createdAt: '2026-02-05' },
    { id: 'RES-009', customer: '조산책', email: 'cho@example.com', phone: '010-1111-2222', site: 'A구역 - 사이트 1', checkIn: '2026-02-25', checkOut: '2026-02-26', guests: 2, amount: 40000, status: 'pending', createdAt: '2026-02-06' },
    { id: 'RES-010', customer: '한바다', email: 'han@example.com', phone: '010-3333-4444', site: 'C구역 - 사이트 6', checkIn: '2026-02-28', checkOut: '2026-03-01', guests: 3, amount: 50000, status: 'confirmed', createdAt: '2026-02-07' },
    { id: 'RES-011', customer: '오별밤', email: 'oh@example.com', phone: '010-5555-6666', site: 'D구역 - 사이트 12', checkIn: '2026-03-05', checkOut: '2026-03-07', guests: 4, amount: 120000, status: 'pending', createdAt: '2026-02-08' },
    { id: 'RES-012', customer: '임새벽', email: 'lim@example.com', phone: '010-7777-8888', site: 'E구역 - 사이트 3', checkIn: '2026-03-10', checkOut: '2026-03-11', guests: 2, amount: 60000, status: 'confirmed', createdAt: '2026-02-09' }
  ]);

  const [formValues, setFormValues] = useState({
    customer: '', email: '', phone: '', site: '', checkIn: '', checkOut: '', guests: 1, amount: 0
  });

  // --- 필터링 로직 ---
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // --- 페이징 계산 로직 ---
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const pagedData = filteredReservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status) => {
    const badges = {
      confirmed: { text: '확정', class: 'status-confirmed' },
      pending: { text: '대기', class: 'status-pending' },
      completed: { text: '완료', class: 'status-completed' },
      cancelled: { text: '취소', class: 'status-cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const handleStatusChange = (id, newStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status: newStatus } : res
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 이 예약을 삭제하시겠습니까?')) {
      setReservations(prev => prev.filter(res => res.id !== id));
      // 삭제 후 데이터가 줄어들어 현재 페이지가 총 페이지보다 커지면 조정
      if (pagedData.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    }
  };

  const handleEditClick = (reservation) => {
    setIsEditMode(true);
    setSelectedReservation(reservation);
    setFormValues({ ...reservation });
    setShowModal(true);
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setFormValues({ customer: '', email: '', phone: '', site: '', checkIn: '', checkOut: '', guests: 1, amount: 0 });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setReservations(prev => prev.map(res => 
        res.id === selectedReservation.id ? { ...res, ...formValues } : res
      ));
    } else {
      const id = `RES-${String(reservations.length + 1).padStart(3, '0')}`;
      const createdAt = new Date().toISOString().split('T')[0];
      setReservations([{ ...formValues, id, status: 'pending', createdAt }, ...reservations]);
      setCurrentPage(1); // 새 예약 추가 시 첫 페이지로 이동
    }
    setShowModal(false);
  };

  return (
    <div className="admin-reservations">
      <div className="page-header">
        <div>
          <h1>예약 관리</h1>
          <p>전체 {filteredReservations.length}건의 예약 (현재 {currentPage}페이지)</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline"><FiDownload /> 내보내기</button>
          <button className="btn btn-primary" onClick={handleAddClick}><FiPlus /> 새 예약 추가</button>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="고객명, 이메일, 예약번호로 검색..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
          />
        </div>
        <div className="filter-group">
          <FiFilter />
          <select value={statusFilter} onChange={(e) => {setStatusFilter(e.target.value); setCurrentPage(1);}}>
            <option value="all">전체 상태</option>
            <option value="confirmed">확정</option>
            <option value="pending">대기</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>예약번호</th>
                <th>고객 정보</th>
                <th>사이트</th>
                <th>기간/인원</th>
                <th>금액</th>
                <th>상태</th>
                <th>등록일</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map(reservation => {
                const badge = getStatusBadge(reservation.status);
                return (
                  <tr key={reservation.id}>
                    <td><strong className="reservation-id">{reservation.id}</strong></td>
                    <td>
                      <div className="customer-info">
                        <strong>{reservation.customer}</strong>
                        <span className="customer-contact">{reservation.email}</span>
                        <span className="customer-contact">{reservation.phone}</span>
                      </div>
                    </td>
                    <td>{reservation.site}</td>
                    <td>
                      <div className="date-info">
                        <span>{reservation.checkIn} ~ {reservation.checkOut}</span>
                        <span className="guest-count">({reservation.guests}명)</span>
                      </div>
                    </td>
                    <td className="amount-cell">₩{reservation.amount.toLocaleString()}</td>
                    <td>
                      <select
                        className={`status-select ${badge.class}`}
                        value={reservation.status}
                        onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                      >
                        <option value="confirmed">확정</option>
                        <option value="pending">대기</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </select>
                    </td>
                    <td>{reservation.createdAt}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit" onClick={() => handleEditClick(reservation)}><FiEdit /></button>
                        <button className="action-btn delete" onClick={() => handleDelete(reservation.id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- 페이징 버튼 UI 추가 --- */}
        <div className="pagination">
          <button 
            className="pagination-btn" 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i} 
              className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`} 
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            className="pagination-btn" 
            disabled={currentPage === totalPages || totalPages === 0} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            다음
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditMode ? '예약 정보 수정' : '새 예약 추가'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>고객명 *</label>
                    <input type="text" name="customer" required value={formValues.customer} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>이메일 *</label>
                    <input type="email" name="email" required value={formValues.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>전화번호 *</label>
                    <input type="tel" name="phone" required value={formValues.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>사이트 *</label>
                    <select name="site" required value={formValues.site} onChange={handleInputChange}>
                      <option value="">선택하세요</option>
                      {SITE_OPTIONS.map(site => (
                        <option key={site} value={site}>{site}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>체크인 *</label>
                    <input type="date" name="checkIn" required value={formValues.checkIn} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>체크아웃 *</label>
                    <input type="date" name="checkOut" required value={formValues.checkOut} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>인원 *</label>
                    <input type="number" name="guests" min="1" required value={formValues.guests} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>금액 *</label>
                    <input type="number" name="amount" required value={formValues.amount} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>취소</button>
                <button type="submit" className="btn btn-primary">{isEditMode ? '수정 완료' : '예약 추가'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;