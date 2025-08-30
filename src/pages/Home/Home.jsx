import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category,setCategory] = useState("All")

  return (
    <>
      <Header/>
      <FoodDisplay category={category} isHome={true}/>
    </>
  )
}

export default Home
