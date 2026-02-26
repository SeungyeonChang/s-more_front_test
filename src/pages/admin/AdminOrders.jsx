import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiPackage } from 'react-icons/fi';
import '../../styles/AdminOrders.css';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      customer: '김캠핑',
      items: ['프리미엄 BBQ 세트', '생수 2L x 2'],
      quantity: 3,
      total: 49000,
      status: 'delivered',
      orderDate: '2026-01-20',
      deliveryDate: '2026-01-21'
    },
    {
      id: 'ORD-002',
      customer: '이자연',
      items: ['캠핑 도시락'],
      quantity: 2,
      total: 24000,
      status: 'preparing',
      orderDate: '2026-02-04',
      deliveryDate: null
    },
    {
      id: 'ORD-003',
      customer: '박야외',
      items: ['마시멜로우 세트', '핫초코 믹스'],
      quantity: 2,
      total: 18000,
      status: 'shipping',
      orderDate: '2026-02-03',
      deliveryDate: null
    },
    {
      id: 'ORD-004',
      customer: '최캠핑',
      items: ['프리미엄 BBQ 세트', '캠핑 도시락', '생수 2L x 4'],
      quantity: 6,
      total: 73000,
      status: 'pending',
      orderDate: '2026-02-04',
      deliveryDate: null
    },
    {
      id: 'ORD-005',
      customer: '정텐트',
      items: ['캠핑 도시락', '마시멜로우 세트'],
      quantity: 2,
      total: 20000,
      status: 'delivered',
      orderDate: '2026-01-15',
      deliveryDate: '2026-01-16'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: '주문 접수', class: 'status-pending' },
      preparing: { text: '준비 중', class: 'status-preparing' },
      shipping: { text: '배송 중', class: 'status-shipping' },
      delivered: { text: '배송 완료', class: 'status-delivered' },
      cancelled: { text: '취소됨', class: 'status-cancelled' }
    };
    return badges[status] || badges.pending;
  };

  const handleStatusChange = (id, newStatus) => {
    console.log(`주문 ${id}의 상태를 ${newStatus}로 변경`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-orders">
      <div className="page-header">
        <div>
          <h1>주문 관리</h1>
          <p>전체 {orders.length}건의 주문</p>
        </div>
        <button className="btn btn-outline">
          <FiDownload />
          내보내기
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="고객명 또는 주문번호로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">전체 상태</option>
            <option value="pending">주문 접수</option>
            <option value="preparing">준비 중</option>
            <option value="shipping">배송 중</option>
            <option value="delivered">배송 완료</option>
            <option value="cancelled">취소됨</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="order-stats">
        <div className="stat-box">
          <FiPackage />
          <div>
            <span className="stat-label">주문 접수</span>
            <span className="stat-value pending">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
        </div>
        <div className="stat-box">
          <FiPackage />
          <div>
            <span className="stat-label">준비 중</span>
            <span className="stat-value preparing">
              {orders.filter(o => o.status === 'preparing').length}
            </span>
          </div>
        </div>
        <div className="stat-box">
          <FiPackage />
          <div>
            <span className="stat-label">배송 중</span>
            <span className="stat-value shipping">
              {orders.filter(o => o.status === 'shipping').length}
            </span>
          </div>
        </div>
        <div className="stat-box">
          <FiPackage />
          <div>
            <span className="stat-label">배송 완료</span>
            <span className="stat-value delivered">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>주문번호</th>
                <th>고객명</th>
                <th>주문 상품</th>
                <th>수량</th>
                <th>금액</th>
                <th>상태</th>
                <th>주문일</th>
                <th>배송일</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr key={order.id}>
                    <td>
                      <strong className="order-id">{order.id}</strong>
                    </td>
                    <td>{order.customer}</td>
                    <td>
                      <div className="items-list">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="item-name">
                            {item}
                            {idx < order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{order.quantity}개</td>
                    <td className="amount-cell">
                      ₩{order.total.toLocaleString()}
                    </td>
                    <td>
                      <select
                        className={`status-select ${badge.class}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">주문 접수</option>
                        <option value="preparing">준비 중</option>
                        <option value="shipping">배송 중</option>
                        <option value="delivered">배송 완료</option>
                        <option value="cancelled">취소됨</option>
                      </select>
                    </td>
                    <td>{order.orderDate}</td>
                    <td>{order.deliveryDate || '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">이전</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">다음</button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
