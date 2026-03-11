import React, { useState } from 'react'
// import Sidebar from './Components/sidebar/sidebar'
import Navbar from './Components/navbar/navbar'
import Home from './pages/home'
import SmartViews from './pages/smartviews'
import Leads from './pages/leads'
import Lists from './pages/lists'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'smart-views':
        return <SmartViews />
      case 'leads':
        return <Leads />
        case 'lists':
        return <Lists />
      case 'dashboard':
        return <Home />
      default:
        return <Home />
    }
  }

  return (
    <>
      <Navbar onNavigate={handleNavigation} />
      {renderPage()}

    </>
  )
}

export default App
