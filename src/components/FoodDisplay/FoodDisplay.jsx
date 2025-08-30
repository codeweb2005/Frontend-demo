import React, { useContext, useState, useEffect } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const FoodDisplay = ({category, isHome}) => {

  const {food_list} = useContext(StoreContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // Filter products by category
  const filteredProducts = food_list.filter(item => 
    category === "All" || category === item.category
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = isHome ? filteredProducts.slice(0, 10) : filteredProducts.slice(startIndex, endIndex);

  return (
    <div className='food-display' id='food-display'>
      {isHome && (
        <div className='food-display-header'>
          <h2>Featured Products</h2>
          <button className='view-all-btn' onClick={() => navigate('/product')}>View All</button>
        </div>
      )}
      <div className={`food-display-list ${isHome ? 'home-background' : ''}`}>
        {currentProducts.map((item) => (
          <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
        ))}
      </div>
      
      {!isHome && totalPages > 1 && (
        <div className='pagination'>
          <button 
            className='pagination-btn' 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className='pagination-btn'
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default FoodDisplay
