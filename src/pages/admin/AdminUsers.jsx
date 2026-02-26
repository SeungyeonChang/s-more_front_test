import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUserPlus, FiEdit, FiTrash2, FiMail, FiShield } from 'react-icons/fi';
import '../../styles/AdminUsers.css';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: '김캠핑',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      role: 'user',
      status: 'active',
      points: 15000,
      reservations: 8,
      joinDate: '2025-01-15',
      lastLogin: '2026-02-04'
    },
    {
      id: 2,
      name: '이자연',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      role: 'user',
      status: 'active',
      points: 8000,
      reservations: 4,
      joinDate: '2025-03-20',
      lastLogin: '2026-02-03'
    },
    {
      id: 3,
      name: '박야외',
      email: 'park@example.com',
      phone: '010-3456-7890',
      role: 'vip',
      status: 'active',
      points: 25000,
      reservations: 15,
      joinDate: '2024-11-10',
      lastLogin: '2026-02-04'
    },
    {
      id: 4,
      name: '관리자',
      email: 'admin@camping.com',
      phone: '010-0000-0000',
      role: 'admin',
      status: 'active',
      points: 0,
      reservations: 0,
      joinDate: '2024-01-01',
      lastLogin: '2026-02-04'
    },
    {
      id: 5,
      name: '최캠핑',
      email: 'choi@example.com',
      phone: '010-4567-8901',
      role: 'user',
      status: 'inactive',
      points: 3000,
      reservations: 2,
      joinDate: '2025-09-05',
      lastLogin: '2025-12-20'
    },
    {
      id: 6,
      name: '정텐트',
      email: 'jung@example.com',
      phone: '010-5678-9012',
      role: 'user',
      status: 'active',
      points: 12000,
      reservations: 7,
      joinDate: '2025-04-12',
      lastLogin: '2026-02-02'
    }
  ];

  const getRoleBadge = (role) => {
    const badges = {
      admin: { text: '관리자', class: 'role-admin' },
      vip: { text: 'VIP', class: 'role-vip' },
      user: { text: '일반', class: 'role-user' }
    };
    return badges[role] || badges.user;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: '활성', class: 'status-active' },
      inactive: { text: '비활성', class: 'status-inactive' },
      suspended: { text: '정지', class: 'status-suspended' }
    };
    return badges[status] || badges.active;
  };

  const handleRoleChange = (id, newRole) => {
    console.log(`사용자 ${id}의 역할을 ${newRole}로 변경`);
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      console.log(`사용자 ${id} 삭제`);
    }
  };

  const handleSendEmail = (email) => {
    console.log(`${email}로 이메일 보내기`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="admin-users">
      <div className="page-header">
        <div>
          <h1>회원 관리</h1>
          <p>전체 {users.length}명의 회원</p>
        </div>
        <button className="btn btn-primary">
          <FiUserPlus />
          회원 추가
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="이름 또는 이메일로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FiFilter />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">전체 등급</option>
            <option value="admin">관리자</option>
            <option value="vip">VIP</option>
            <option value="user">일반</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="user-stats">
        <div className="stat-box">
          <span className="stat-label">전체 회원</span>
          <span className="stat-value">{users.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">활성 회원</span>
          <span className="stat-value active">
            {users.filter(u => u.status === 'active').length}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">VIP 회원</span>
          <span className="stat-value vip">
            {users.filter(u => u.role === 'vip').length}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">이번 달 가입</span>
          <span className="stat-value">
            {users.filter(u => u.joinDate.startsWith('2026-02')).length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>회원 정보</th>
                <th>연락처</th>
                <th>등급</th>
                <th>상태</th>
                <th>포인트</th>
                <th>예약수</th>
                <th>가입일</th>
                <th>최근 로그인</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => {
                const roleBadge = getRoleBadge(user.role);
                const statusBadge = getStatusBadge(user.status);
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name[0]}
                        </div>
                        <div>
                          <strong>{user.name}</strong>
                          <span className="user-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <select
                        className={`role-select ${roleBadge.class}`}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.role === 'admin'}
                      >
                        <option value="admin">관리자</option>
                        <option value="vip">VIP</option>
                        <option value="user">일반</option>
                      </select>
                    </td>
                    <td>
                      <span className={`status-badge ${statusBadge.class}`}>
                        {statusBadge.text}
                      </span>
                    </td>
                    <td className="points-cell">{user.points.toLocaleString()}P</td>
                    <td>{user.reservations}건</td>
                    <td>{user.joinDate}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn email"
                          title="이메일 보내기"
                          onClick={() => handleSendEmail(user.email)}
                        >
                          <FiMail />
                        </button>
                        <button className="action-btn edit" title="수정">
                          <FiEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          title="삭제"
                          onClick={() => handleDelete(user.id)}
                          disabled={user.role === 'admin'}
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

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">이전</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">다음</button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
