import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    const {user, logOut} = useContext(AuthContext)
   
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                 user?.uid? <button className='logOut-button' onClick={logOut}>Log Out</button>: <> <Link to="/login">Login</Link>
                 <Link to="/signup">sign up</Link></>
                }
               
            </div>
        </nav>
    );
};

export default Header;