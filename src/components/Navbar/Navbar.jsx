import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import Search from '../Search/Search'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartAmount, token ,setToken, cartItems, food_list, url, currency } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setMenu('home');
    } else if (location.pathname === '/product') {
      setMenu('Product');
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>Home</Link>
        <a href='/product' onClick={() => setMenu("Product")} className={`${menu === "Product" ? "active" : ""}`}>Product</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <i className="fas fa-search navbar-icon" onClick={() => setShowSearch(true)} style={{cursor: 'pointer'}}></i>
        <div className='navbar-cart-container'>
          <Link to='/cart' className='navbar-search-icon'>
            <i className="fas fa-shopping-cart navbar-icon"></i>
            {Object.values(cartItems).reduce((total, quantity) => total + quantity, 0) > 0 && (
              <div className="cart-count">{Object.values(cartItems).reduce((total, quantity) => total + quantity, 0)}</div>
            )}
          </Link>
          
          <div className='cart-preview'>
            <h4>Cart Items</h4>
            {Object.keys(cartItems).length > 0 ? (
              <div className='cart-preview-items'>
                {food_list.filter(item => cartItems[item._id] > 0).slice(0, 3).map(item => (
                  <div key={item._id} className='cart-preview-item'>
                    <img src={url+"/images/"+item.image} alt={item.name} />
                    <div className='cart-preview-info'>
                      <p>{item.name}</p>
                      <span>{cartItems[item._id]} x {currency}{item.price}</span>
                    </div>
                  </div>
                ))}
                {Object.keys(cartItems).filter(id => cartItems[id] > 0).length > 3 && (
                  <p className='more-items'>+{Object.keys(cartItems).filter(id => cartItems[id] > 0).length - 3} more items</p>
                )}
                <div className='cart-preview-total'>
                  <strong>Total: {currency}{getTotalCartAmount()}</strong>
                </div>
              </div>
            ) : (
              <p className='empty-cart'>Your cart is empty</p>
            )}
          </div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
              <hr />
              <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
            </ul>
          </div>
        }

      </div>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  )
}

export default Navbar
