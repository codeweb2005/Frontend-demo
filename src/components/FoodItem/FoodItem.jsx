import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image.startsWith('data:') ? image : url+"/images/"+image} alt="" />
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p onClick={() => navigate(`/product/${id}`)} style={{cursor: 'pointer'}}>{name}</p>
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">{currency}{price}</p>
                {!cartItems || !cartItems[id]
                ?<button className='add-to-cart-btn' onClick={() => addToCart(id)}>Add to Cart</button>
                :<div className="food-item-counter">
                        <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems ? cartItems[id] : 0}</p>
                        <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}

export default FoodItem
