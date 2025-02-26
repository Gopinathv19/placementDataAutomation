import { useState, useEffect} from "react"
import MaterialUISwitch from "@mui/material/Switch"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import axios from "axios"

const Head = ({ dark, setMode, onProfileSelect, onBatchChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [batch, setBatch] = useState('2026')

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
        const response = await axios.get(`/cse/v1/students/search`, {
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
    onProfileSelect(result);
  }

  const handleBatchChange = (event) => {
    const selectedBatch = event.target.value;
    setBatch(selectedBatch);
    onBatchChange(selectedBatch);
  };

  return (
    <section className='head'>
      <div className='container flex justify-between items-center'>
        <div className='logo'>
          <img src='./assets/images/logo.png' alt='' />
        </div>
        
        <div className='flex items-center gap-4'>
          <div className='search relative'>
            <input 
              type='text' 
              placeholder='Search by name, roll no, or university no...' 
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-[400px] px-4 py-2 border border-gray-300 rounded-md bg-gray-800 text-white placeholder-gray-400"
            />
            <SearchOutlinedIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-72 overflow-y-auto mt-1">
                {searchResults.map((result) => (
                  <div 
                    key={result.universityNo} 
                    className="px-4 py-3 cursor-pointer hover:bg-gray-700 border-b border-gray-700"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="font-medium text-white mb-1">{result.name}</div>
                    <div className="text-sm text-gray-400 flex gap-2 items-center">
                      <span>Roll No: {result.rollNo}</span>
                      <span>•</span>
                      <span>University No: {result.universityNo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Loading and Error States */}
            {isLoading && (
              <div className="absolute top-full left-0 right-0 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-center text-gray-400 mt-1">
                Loading...
              </div>
            )}
            {error && (
              <div className="absolute top-full left-0 right-0 px-4 py-2 bg-red-900 border border-red-700 rounded-md text-center text-red-200 mt-1">
                {error}
              </div>
            )}
          </div>

          <select value={batch} onChange={handleBatchChange} className="bg-gray-800 text-white p-2 rounded">
            <option value="2026">Batch 2026</option>
            <option value="2027">Batch 2027</option>
          </select>

          <MaterialUISwitch
            checked={dark}
            onChange={() => setMode(!dark)}
            sx={{ m: 1 }}
          />
        </div>
      </div>
    </section>
  )
}

export default Head