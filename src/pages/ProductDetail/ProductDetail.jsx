import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ProductDetail.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { food_list, cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const foundProduct = food_list.find(item => item._id === id)
    setProduct(foundProduct)
  }, [id, food_list])

  if (!product) {
    return <div className="product-detail-loading">Loading...</div>
  }

  return (
    <div className='product-detail'>
      <button className='back-btn' onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className='product-detail-container'>
        <div className='product-detail-image'>
          <img src={url+"/images/"+product.image} alt={product.name} />
        </div>
        
        <div className='product-detail-info'>
          <h1>{product.name}</h1>
          <div className='product-rating'>
            <img src={assets.rating_starts} alt="rating" />
          </div>
          <p className='product-price'>${product.price}</p>
          <p className='product-description'>{product.description}</p>
          <p className='product-category'>Category: {product.category}</p>
          
          <div className='product-actions'>
            {!cartItems[id] ? (
              <button className='add-to-cart-btn' onClick={() => addToCart(id)}>
                Add to Cart
              </button>
            ) : (
              <div className='product-counter'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove" />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="add" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail