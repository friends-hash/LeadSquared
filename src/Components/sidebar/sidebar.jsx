import React from 'react'
import { Menu, House} from 'lucide-react'
import './sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <header className='menu-header'>
                <Menu />
            </header>
            <ul>
                <li>
                    <a href="#">  <House /></a>
                </li>

            </ul>
        </div>
        <div className="bottom"></div>
    </div>
  )
}

export default Sidebar
