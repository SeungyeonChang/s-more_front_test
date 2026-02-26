import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiPlus, FiMinus, FiSearch } from 'react-icons/fi';
import '../../styles/Menu.css';

const Menu = () => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: '전체', icon: '🍽️' },
    { id: 'food', name: '음식', icon: '🍔' },
    { id: 'drink', name: '음료', icon: '🥤' },
    { id: 'snack', name: '간식', icon: '🍿' },
    { id: 'camping', name: '캠핑용품', icon: '⛺' },
    { id: 'set', name: '세트메뉴', icon: '🎁' }
  ];

  const menuItems = [
    {
      id: 1,
      name: '프리미엄 BBQ 세트',
      category: 'set',
      price: 45000,
      image: 'https://via.placeholder.com/300x300',
      description: '소고기, 돼지고기, 야채 포함',
      popular: true,
      stock: 20
    },
    {
      id: 2,
      name: '캠핑 도시락',
      category: 'food',
      price: 12000,
      image: 'https://via.placeholder.com/300x300',
      description: '영양 가득한 한식 도시락',
      popular: false,
      stock: 15
    },
    {
      id: 3,
      name: '생수 (2L)',
      category: 'drink',
      price: 2000,
      image: 'https://via.placeholder.com/300x300',
      description: '깨끗한 생수',
      popular: true,
      stock: 50
    },
    {
      id: 4,
      name: '캠핑 의자',
      category: 'camping',
      price: 35000,
      image: 'https://via.placeholder.com/300x300',
      description: '접이식 편안한 의자',
      popular: false,
      stock: 8
    },
    {
      id: 5,
      name: '마시멜로우 세트',
      category: 'snack',
      price: 8000,
      image: 'https://via.placeholder.com/300x300',
      description: '캠프파이어용 마시멜로우',
      popular: true,
      stock: 30
    },
    {
      id: 6,
      name: '패밀리 BBQ 세트',
      category: 'set',
      price: 80000,
      image: 'https://via.placeholder.com/300x300',
      description: '4-6인용 대용량 BBQ 세트',
      popular: true,
      stock: 10
    },
    {
      id: 7,
      name: '소주',
      category: 'drink',
      price: 4000,
      image: 'https://via.placeholder.com/300x300',
      description: '참이슬',
      popular: false,
      stock: 40
    },
    {
      id: 8,
      name: '랜턴',
      category: 'camping',
      price: 25000,
      image: 'https://via.placeholder.com/300x300',
      description: 'LED 캠핑 랜턴',
      popular: false,
      stock: 12
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchCategory = category === 'all' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="menu-page">
      <div className="container">
        <div className="menu-header">
          <div>
            <h1>메뉴 주문</h1>
            <p>캠핑에 필요한 모든 것을 주문하세요</p>
          </div>
          <div className="cart-button-wrapper">
            <button 
              className="cart-button"
              onClick={() => document.getElementById('cart-sidebar').classList.toggle('open')}
            >
              <FiShoppingCart />
              <span>장바구니</span>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="search-bar">
          <FiSearch />
          <input
            type="text"
            placeholder="메뉴 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map(item => {
            const quantity = getCartQuantity(item.id);
            return (
              <div key={item.id} className="menu-card">
                {item.popular && <div className="popular-badge">인기</div>}
                {item.stock < 5 && <div className="stock-badge">품절임박</div>}
                
                <div className="menu-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="menu-info">
                  <h3>{item.name}</h3>
                  <p className="menu-description">{item.description}</p>
                  <div className="menu-footer">
                    <span className="price">{item.price.toLocaleString()}원</span>
                    <span className="stock">재고: {item.stock}개</span>
                  </div>
                  
                  {quantity === 0 ? (
                    <button 
                      className="btn btn-primary btn-block"
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                    >
                      {item.stock === 0 ? '품절' : '장바구니 담기'}
                    </button>
                  ) : (
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, quantity - 1)}>
                        <FiMinus />
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        disabled={quantity >= item.stock}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      <div id="cart-sidebar" className="cart-sidebar">
        <div className="cart-header">
          <h2>장바구니</h2>
          <button 
            className="close-btn"
            onClick={() => document.getElementById('cart-sidebar').classList.remove('open')}
          >
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <FiShoppingCart size={48} />
              <p>장바구니가 비어있습니다</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">{item.price.toLocaleString()}원</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <FiPlus />
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>총 금액</span>
              <span className="total-price">
                {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}원
              </span>
            </div>
            <button 
              className="btn btn-primary btn-block"
              onClick={() => {
                  document.getElementById('cart-sidebar').classList.remove('open');
                  window.location.href = '/menues/book'; // 또는 navigate('/menues/book')
                }}
            >
              주문하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
