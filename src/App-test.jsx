import React from 'react'
import './App.css'
import CategoryChart from './components/category-chart/categoryChart'
import Balance from './components/balance indicator/balance'


const App = () => {
  return (
    <>
      <div>
      <Balance/>
      <CategoryChart/>
      </div>
    </>
  )
}

export default App;