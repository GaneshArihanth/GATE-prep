import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { FaHome, FaChartLine, FaBook, FaQuestionCircle, FaDatabase, FaSignOutAlt } from 'react-icons/fa';
import './Navigation.css';

const Navigation = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Successfully logged out!");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again!");
    }
  };

  // Don't show navigation on landing, login, and register pages
  if (["/", "/login", "/register"].includes(location.pathname)) {
    return null;
  }

  const navLinks = [
    { path: '/home', icon: <FaHome />, text: 'Home' },
    { path: '/dashboard', icon: <FaChartLine />, text: 'Dashboard' },
    { path: '/problems', icon: <FaDatabase />, text: 'Problems' },
    { path: '/quiz', icon: <FaQuestionCircle />, text: 'Quiz' }
  ];

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/home" className="nav-logo">
          GATE Prep
        </Link>

        <div className="nav-links">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          ))}
        </div>

        <div className="user-section">
          {user && (
            <>
              <div className="user-info">
                <div className="user-avatar">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="user-name">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
