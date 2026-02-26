// // import React, { createContext, useContext, useState, useEffect } from 'react';

// // const CartContext = createContext();

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error('useCart must be used within a CartProvider');
// //   }
// //   return context;
// // };

// // export const CartProvider = ({ children }) => {
// //   const [cartItems, setCartItems] = useState([]);

// //   useEffect(() => {
// //     // 로컬 스토리지에서 장바구니 복원
// //     const savedCart = localStorage.getItem('cart');
// //     if (savedCart) {
// //       setCartItems(JSON.parse(savedCart));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     // 장바구니 변경시 로컬 스토리지에 저장
// //     localStorage.setItem('cart', JSON.stringify(cartItems));
// //   }, [cartItems]);

// //   const addToCart = (item) => {
// //     const existingItem = cartItems.find(i => i.id === item.id);
    
// //     if (existingItem) {
// //       setCartItems(cartItems.map(i => 
// //         i.id === item.id 
// //           ? { ...i, quantity: i.quantity + 1 }
// //           : i
// //       ));
// //     } else {
// //       setCartItems([...cartItems, { ...item, quantity: 1 }]);
// //     }
// //   };

// //   const removeFromCart = (itemId) => {
// //     setCartItems(cartItems.filter(item => item.id !== itemId));
// //   };

// //   const updateQuantity = (itemId, quantity) => {
// //     if (quantity <= 0) {
// //       removeFromCart(itemId);
// //     } else {
// //       setCartItems(cartItems.map(item =>
// //         item.id === itemId
// //           ? { ...item, quantity }
// //           : item
// //       ));
// //     }
// //   };

// //   const clearCart = () => {
// //     setCartItems([]);
// //   };

// //   const totalAmount = cartItems.reduce(
// //     (sum, item) => sum + (item.price * item.quantity),
// //     0
// //   );

// //   const totalItems = cartItems.reduce(
// //     (sum, item) => sum + item.quantity,
// //     0
// //   );

// //   const value = {
// //     cartItems,
// //     addToCart,
// //     removeFromCart,
// //     updateQuantity,
// //     clearCart,
// //     totalAmount,
// //     totalItems
// //   };

// //   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// // };


// // import React, { createContext, useContext, useReducer, useCallback } from 'react';

// // const CartContext = createContext();

// // const cartReducer = (state, action) => {
// //   switch (action.type) {
// //     case 'ADD_TO_CART':
// //       const existingItem = state.find(item => item.id === action.payload.id);
// //       if (existingItem) {
// //         return state.map(item =>
// //           item.id === action.payload.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //       }
// //       return [...state, { ...action.payload, quantity: 1 }];

// //     case 'UPDATE_QUANTITY':
// //       return state.map(item =>
// //         item.id === action.payload.id
// //           ? { 
// //               ...item, 
// //               quantity: Math.max(1, action.payload.quantity) 
// //             }
// //           : item
// //       ).filter(item => item.quantity > 0);

// //     case 'REMOVE_FROM_CART':
// //       return state.filter(item => item.id !== action.payload.id);

// //     case 'CLEAR_CART':
// //       return [];

// //     default:
// //       return state;
// //   }
// // };

// // export const CartProvider = ({ children }) => {
// //   const [cartItems, dispatch] = useReducer(cartReducer, []);

// //   const addToCart = useCallback((item) => {
// //     console.log('addToCart called:', item); // 디버깅용
// //     dispatch({ type: 'ADD_TO_CART', payload: item });
// //   }, []);

// //   const updateQuantity = useCallback((id, quantity) => {
// //     console.log('updateQuantity:', id, quantity); // 디버깅용
// //     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
// //   }, []);

// //   const removeFromCart = useCallback((id) => {
// //     console.log('removeFromCart:', id); // 디버깅용
// //     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
// //   }, []);

// //   const clearCart = useCallback(() => {
// //     dispatch({ type: 'CLEAR_CART' });
// //   }, []);

// //   const totalAmount = cartItems.reduce((sum, item) => 
// //     sum + (item.price * item.quantity), 0
// //   );

// //   return (
// //     <CartContext.Provider value={{
// //       cartItems,
// //       addToCart,
// //       updateQuantity,
// //       removeFromCart,
// //       clearCart,
// //       totalAmount
// //     }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error('useCart must be used within CartProvider');
// //   }
// //   return context;
// // };


// import React, { createContext, useContext, useReducer, useEffect } from 'react';

// const CartContext = createContext();

// const cartReducer = (state, action) => {
//   console.log('Cart Reducer:', action.type, action.payload); // ✅ 디버깅
  
//   switch (action.type) {
    
//     case 'INIT_CART':  // ✅ 이 케이스 추가!
//       return action.payload || [];

//     case 'ADD_TO_CART':
//       const existing = state.find(item => item.id === action.payload.id);
//       if (existing) {
//         return state.map(item =>
//           item.id === action.payload.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...state, { ...action.payload, quantity: 1 }];
    
//     case 'UPDATE_QUANTITY':
//       return state.map(item =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       ).filter(item => item.quantity > 0);
    
//     case 'REMOVE_FROM_CART':
//       return state.filter(item => item.id !== action.payload.id);
    
//     case 'CLEAR_CART':
//       return [];
    
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [cartItems, dispatch] = useReducer(cartReducer, []);

//   // ✅ localStorage 동기화
//   useEffect(() => {
//     const savedCart = localStorage.getItem('campingCart');
//     if (savedCart) {
//       const parsedCart = JSON.parse(savedCart);
//       dispatch({ type: 'INIT_CART', payload: parsedCart }); // ✅ INIT_CART dispatch
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('campingCart', JSON.stringify(cartItems));
//     console.log('Cart saved:', cartItems); // ✅ 디버깅
//   }, [cartItems]);

//   const addToCart = (item) => {
//     console.log('🔥 addToCart:', item); // ✅ 필수 디버깅
//     dispatch({ type: 'ADD_TO_CART', payload: item });
//   };

//   const updateQuantity = (id, quantity) => {
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   };

//   const removeFromCart = (id) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//   };

//   const clearCart = () => {
//     dispatch({ type: 'CLEAR_CART' });
//   };

//   const totalAmount = cartItems.reduce((sum, item) => 
//     sum + (item.price * item.quantity), 0
//   );

//   const value = {
//     cartItems,
//     addToCart,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     totalAmount
//   };

//   console.log('CartContext value:', value); // ✅ 상태 확인

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within CartProvider!');
//   }
//   return context;
// };


import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log('🔥 Cart Reducer:', action.type, action.payload);
  
  switch (action.type) {
    case 'INIT_CART':
      return action.payload || [];
      
    case 'ADD_TO_CART':
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.id);
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id);
    
    case 'CLEAR_CART':
      return [];
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // ✅ localStorage에서 초기 상태 로드
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const savedCart = localStorage.getItem('campingCart');
    console.log('🔵 Initial Load from localStorage:', savedCart);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ cartItems 변경시 localStorage에 저장
  useEffect(() => {
    console.log('💾 Saving to localStorage:', cartItems);
    localStorage.setItem('campingCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    console.log('🛒 addToCart called:', item);
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const updateQuantity = (id, quantity) => {
    console.log('🔢 updateQuantity:', id, quantity);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    console.log('🗑️ removeFromCart:', id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const clearCart = () => {
    console.log('🧹 clearCart called');
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('campingCart');
  };

  const totalAmount = cartItems.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount
  };

  console.log('📦 CartContext value:', {
    itemCount: cartItems.length,
    totalAmount,
    items: cartItems.map(i => i.name)
  });

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider!');
  }
  return context;
};
