import React, { useState } from 'react'
import Navbar from './Components/navbar/navbar'
import Home from './Components/pages/home'
import Leads from './Components/pages/leads'
import Activities from './Components/pages/activities'
import Tasks from './Components/pages/tasks'
import Lists from './Components/pages/lists'
import Analytics from './Components/pages/analytics'

const App = () => {
  const [currentPage, setCurrentPage] = useState('home')

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'leads':
        return <Leads />
      case 'activities':
        return <Activities />
      case 'tasks':
        return <Tasks />
      case 'lists':
        return <Lists />
      case 'analytics':
        return <Analytics />
      case 'smart-views':
        return <Leads />
      case 'lead-management':
        return <Home onNavigate={handleNavigation} />
      case 'marketing':
        return <Home onNavigate={handleNavigation} />
      case 'content-library':
        return <Home onNavigate={handleNavigation} />
      case 'workflow':
        return <Home onNavigate={handleNavigation} />
      case 'apps':
        return <Home onNavigate={handleNavigation} />
      default:
        return <Home onNavigate={handleNavigation} />
    }
  }

  return (
    <>
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      {renderPage()}
    </>
  )
}

export default App
