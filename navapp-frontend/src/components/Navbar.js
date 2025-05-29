import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Saved during login

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white'
        }}>
            <div>
                <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
                    Dashboard
                </Link>
            </div>
            <div>
        <span style={{ marginRight: '15px' }}>
          Welcome, <strong>{user?.email?.split('@')[0]}</strong>
        </span>
                <button onClick={handleLogout} style={{
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
