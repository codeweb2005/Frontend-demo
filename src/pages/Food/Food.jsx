import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Food = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <ExploreMenu setCategory={setCategory} category={category}/>
      <FoodDisplay category={category}/>
    </>
  )
}

export default Food
