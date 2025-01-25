import React, { useState, useEffect} from "react"
// import { useNavigate } from "react-router-dom"
import SettingsIcon from "@mui/icons-material/Settings"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import axios from "axios"
import "./head.css"


const Head = ({ dark, setMode }) => {
  // const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let timeoutId = null;
    
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get(`http://localhost:8080/cse/search`, {
          params: { q: searchTerm }
        })
        setSearchResults(response.data)
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to fetch search results')
      } finally {
        setIsLoading(false)
      }
    }

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fetchSearchResults()
    }, 300)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [searchTerm])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleResultClick = (result) => {
    setSearchTerm('');
    setSearchResults([]);
    // navigate(`/profile/${result.universityNo}`);
  }

  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            <div className='logo'>
              <img src='./assets/images/logo.png' alt='' />
            </div>
          </div>
          <div className='right flexCenter'>
            <div className='search flexCenter'>
              <input 
                type='text' 
                placeholder='Search by name, roll no, or university no...' 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <SearchOutlinedIcon className='iconHead' />
              {isLoading && <div className="search-loading">Loading...</div>}
              {error && <div className="search-error">{error}</div>}
              {!isLoading && !error && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((result) => (
                    <div 
                      key={result.universityNo} 
                      className="search-result-item"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="result-name">{result.name}</div>
                      <div className="result-details">
                        <span>Roll No: {result.rollNo}</span>
                        <span>•</span>
                        <span>University No: {result.universityNo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setMode(!dark)}>
              <SettingsIcon className='iconHead' />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head