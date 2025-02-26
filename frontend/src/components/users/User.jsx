import { useState, useEffect } from 'react'
import axios from "axios"
import { CircularProgress, Avatar } from '@mui/material'

const User = ({batch}) => {
  const [toppers, setToppers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/cse/v1/students/getToppers/${batch}`)
        setToppers(response.data)
        setError(null)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError("Failed to fetch toppers data")
      } finally {
        setLoading(false)
      }
    }
    fetchToppers()
  }, [])

  return (
    <section className='mt-8'>
      {loading ? (
        <div className="flex justify-center"><CircularProgress/></div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div className="flex justify-between items-center gap-8">
          {/* Left Side - Aptitude Topper */}
          <div className="w-[400px] bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={toppers[0]?.cover || '/default-avatar.png'}
                alt={toppers[0]?.name}
                className="w-12 h-12 border-2 border-blue-500"
              />
              <div>
                <h3 className="text-lg text-white font-semibold">{toppers[0]?.name}</h3>
                <p className="text-sm text-gray-400">Aptitude Topper</p>
                <p className="text-xs text-gray-500">{toppers[0]?.univNo}</p>
                <p className="text-sm text-yellow-400 mt-1">{toppers[0]?.greets}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Leetcode Topper */}
          <div className="w-[400px] bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={toppers[1]?.cover || '/default-avatar.png'}
                alt={toppers[1]?.name}
                className="w-12 h-12 border-2 border-blue-500"
              />
              <div>
                <h3 className="text-lg text-white font-semibold">{toppers[1]?.name}</h3>
                <p className="text-sm text-gray-400">LeetCode Topper</p>
                <p className="text-xs text-gray-500">{toppers[1]?.univNo}</p>
                <p className="text-sm text-yellow-400 mt-1">{toppers[1]?.greets}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default User