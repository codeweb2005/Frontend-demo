import React, { useState, useContext } from 'react'
import './Search.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { assets } from '../../assets/assets'

const Search = ({ showSearch, setShowSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { food_list } = useContext(StoreContext)

  const filteredProducts = food_list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!showSearch) return null

  return (
    <div className='search-overlay'>
      <div className='search-container'>
        <div className='search-header'>
          <div className='search-input-container'>
            <img src={assets.search_icon} alt="search" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <img 
            src={assets.cross_icon} 
            alt="close" 
            className='close-btn'
            onClick={() => setShowSearch(false)}
          />
        </div>
        
        <div className='search-results'>
          {searchTerm && (
            <p className='results-count'>
              {filteredProducts.length} results found for "{searchTerm}"
            </p>
          )}
          
          <div className='search-products-grid'>
            {searchTerm ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map(item => (
                  <FoodItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    desc={item.description}
                    price={item.price}
                    image={item.image}
                  />
                ))
              ) : (
                <p className='no-results'>No products found</p>
              )
            ) : (
              <p className='search-placeholder'>Start typing to search products...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search