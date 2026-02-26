// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load user from localStorage
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   // 일반 사용자 로그인
//   const login = (email, password) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const userData = {
//           id: Date.now(),
//           name: '김민수',
//           email: email,
//           role: 'user',
//           token: 'mock_token_' + Date.now(),
//           avatar: `https://i.pravatar.cc/150?u=${email}`
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//         resolve(userData);
//       }, 1000);
//     });
//   };

//   // 회원가입
//   const signup = (name, email, password, phone) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const userData = {
//           id: Date.now(),
//           name: name,
//           email: email,
//           phone: phone,
//           role: 'user',
//           token: 'mock_token_' + Date.now(),
//           avatar: `https://i.pravatar.cc/150?u=${email}`
//         };
//         localStorage.setItem('user', JSON.stringify(userData));
//         setUser(userData);
//         resolve(userData);
//       }, 1000);
//     });
//   };

//   // 관리자 로그인
//   const adminLogin = (email, password) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         // 관리자 계정 검증 (데모용)
//         if (email === 'admin@camping.com' && password === 'admin123') {
//           const adminData = {
//             id: 1,
//             name: '관리자',
//             email: email,
//             role: 'admin',
//             token: 'admin_token_' + Date.now(),
//             avatar: 'https://i.pravatar.cc/150?u=admin'
//           };
//           localStorage.setItem('user', JSON.stringify(adminData));
//           setUser(adminData);
//           resolve(adminData);
//         } else {
//           reject(new Error('관리자 인증에 실패했습니다.'));
//         }
//       }, 1000);
//     });
//   };

//   // 로그아웃
//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const value = {
//     user,
//     loading,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin',
//     login,
//     signup,
//     adminLogin,
//     logout
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * ✅ 통합 로그인 함수 (수정)
   * - 이메일에 따라 자동으로 role 구분
   * - { success, user } 형식으로 반환
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // ✅ 관리자 계정 체크
        if (email === 'admin@camping.com' && password === 'admin123') {
          const adminData = {
            id: 1,
            name: '관리자',
            email: email,
            role: 'admin',
            token: 'admin_token_' + Date.now(),
            avatar: 'https://i.pravatar.cc/150?u=admin'
          };
          localStorage.setItem('user', JSON.stringify(adminData));
          setUser(adminData);
          resolve({
            success: true,
            user: adminData
          });
        }
        // ✅ 일반 사용자 계정 체크
        else if (email === 'user@example.com' && password === 'user123') {
          const userData = {
            id: Date.now(),
            name: '김민수',
            email: email,
            role: 'user',
            token: 'mock_token_' + Date.now(),
            avatar: `https://i.pravatar.cc/150?u=${email}`
          };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          resolve({
            success: true,
            user: userData
          });
        }
        // ❌ 로그인 실패
        else {
          resolve({
            success: false,
            message: '이메일 또는 비밀번호가 올바르지 않습니다.'
          });
        }
      }, 1000);
    });
  };

  // 회원가입
  const signup = (name, email, password, phone) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Date.now(),
          name: name,
          email: email,
          phone: phone,
          role: 'user',
          token: 'mock_token_' + Date.now(),
          avatar: `https://i.pravatar.cc/150?u=${email}`
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        resolve({
          success: true,
          user: userData
        });
      }, 1000);
    });
  };

  // ✅ 관리자 로그인 (기존 유지, 하위 호환성)
  const adminLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@camping.com' && password === 'admin123') {
          const adminData = {
            id: 1,
            name: '관리자',
            email: email,
            role: 'admin',
            token: 'admin_token_' + Date.now(),
            avatar: 'https://i.pravatar.cc/150?u=admin'
          };
          localStorage.setItem('user', JSON.stringify(adminData));
          setUser(adminData);
          resolve({
            success: true,
            user: adminData
          });
        } else {
          reject(new Error('관리자 인증에 실패했습니다.'));
        }
      }, 1000);
    });
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    adminLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
