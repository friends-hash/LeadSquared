import React, { useState } from 'react'
// import Sidebar from './Components/sidebar/sidebar'
import Navbar from './Components/navbar/navbar'
import Home from './pages/home'
import SmartViews from './pages/smartviews'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'smart-views':
        return <SmartViews />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      {/* <Sidebar /> */}
      {renderPage()}

    </>
  )
}

export default App
