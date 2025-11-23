import { Link } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { Web3Context } from '../context/Web3Context';
import ThemeToggle from './ThemeToggle';
import '../styles/ThemeToggle.css';

const Navbar = () => {
  const { isAdmin, currentAccount, logout } = useContext(Web3Context);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const moreMenuRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainMenuItems = [
    { to: '/', label: 'Trang chủ', icon: 'ri-home-line' },
    { to: '/vote', label: 'Bỏ phiếu', icon: 'ri-checkbox-line' },
    { to: '/results', label: 'Kết quả', icon: 'ri-bar-chart-line' },
  ];

  const moreMenuItems = [
    { to: '/claim', label: 'Nhận token', icon: 'ri-coin-line' },
    { to: '/faq', label: 'FAQ', icon: 'ri-question-line' },
    ...(currentAccount ? [{ to: '/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' }] : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Quản trị', icon: 'ri-settings-3-line' }] : []),
  ];

  return (
    <>
      <nav className="navbar-modern">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-icon">
              <img src="/assets/qnu-logo.png" alt="QNU" onError={(e) => (e.target.style.display = 'none')} />
            </div>
            <span className="logo-text">QNU Voting</span>
            {isAdmin && <span className="admin-badge">Admin</span>}
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            {mainMenuItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link">
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="dropdown" ref={moreMenuRef}>
              <button className="nav-link dropdown-toggle" onClick={() => setMoreMenuOpen(!moreMenuOpen)}>
                <i className="ri-more-line"></i>
                <span>Thêm</span>
                <i className={`ri-arrow-down-s-line arrow ${moreMenuOpen ? 'open' : ''}`}></i>
              </button>
              {moreMenuOpen && (
                <div className="dropdown-menu">
                  {moreMenuItems.map((item) => (
                    <Link key={item.to} to={item.to} className="dropdown-item" onClick={() => setMoreMenuOpen(false)}>
                      <i className={item.icon}></i>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <ThemeToggle />

            {currentAccount ? (
              <div className="dropdown" ref={userMenuRef}>
                <button className="user-menu-btn" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <div className="wallet-avatar">
                    <i className="ri-wallet-3-line"></i>
                  </div>
                  <span className="wallet-address">{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
                  <i className={`ri-arrow-down-s-line arrow ${userMenuOpen ? 'open' : ''}`}></i>
                </button>
                {userMenuOpen && (
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-header">
                      <div className="wallet-avatar-large">
                        <i className="ri-wallet-3-line"></i>
                      </div>
                      <div className="wallet-info">
                        <span className="wallet-label">Ví của bạn</span>
                        <span className="wallet-full">{currentAccount.slice(0, 10)}...{currentAccount.slice(-8)}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/dashboard" className="dropdown-item" onClick={() => setUserMenuOpen(false)}>
                      <i className="ri-dashboard-line"></i>
                      <span>Dashboard</span>
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-btn" onClick={() => { logout(); setUserMenuOpen(false); }}>
                      <i className="ri-logout-box-line"></i>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="connect-wallet-btn">
                <i className="ri-wallet-3-line"></i>
                <span>Kết nối ví</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {mainMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="mobile-menu-divider"></div>
              {moreMenuItems.map((item) => (
                <Link key={item.to} to={item.to} className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Remix Icon CDN */}
      <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
    </>
  );
};

export default Navbar;
