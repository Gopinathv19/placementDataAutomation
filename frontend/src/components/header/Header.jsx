import { useState } from "react"
import PropTypes from 'prop-types'
import Head from "../head/Head"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import GroupIcon from '@mui/icons-material/Group';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const Header = ({ dark, setMode, onProfileSelect,onBatchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <div className={`${dark ? 'bg-gray-900' : 'bg-gray-100'} shadow-lg`}>
      <Head 
        dark={dark} 
        setMode={setMode} 
        onProfileSelect={onProfileSelect}
        onBatchChange={onBatchChange}
      />
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2 text-blue-500 hover:text-blue-400 transition-colors duration-200">
                <LocalFireDepartmentIcon className="h-8 w-8" />
                <span className="text-lg font-semibold text-gray">Performance Tracker</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <a href="/" className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <span>Section A</span>
                </a>
                <a href="/" className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <span>Section B</span>
                </a>
                <a href="/" className="group flex items-center text-gray-300 hover:text-white transition-colors duration-200">
                  <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  <span>Section C</span>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="group flex items-center text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200"
              >
                <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500" />
                <span>Section A</span>
              </a>
              <a
                href="/"
                className="group flex items-center text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200"
              >
                <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500" />
                <span>Section B</span>
              </a>
              <a
                href="/"
                className="group flex items-center text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200"
              >
                <GroupIcon className="mr-2 text-gray-400 group-hover:text-blue-500" />
                <span>Section C</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

Header.propTypes = {
  dark: PropTypes.bool.isRequired,
  setMode: PropTypes.func.isRequired,
  onProfileSelect: PropTypes.func.isRequired,
  onBatchChange:PropTypes.func.isRequired
}

export default Header
