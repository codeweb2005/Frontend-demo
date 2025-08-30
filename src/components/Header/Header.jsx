import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Discover Amazing Technology Here</h2>
                <p>Choose from our diverse collection of premium tech products featuring cutting-edge innovation and competitive prices. Our mission is to bring you the best technology experience with quality devices that enhance your digital lifestyle.</p>
                <button onClick={() => navigate('/product')}>View Products</button>
            </div>
        </div>
    )
}

export default Header
