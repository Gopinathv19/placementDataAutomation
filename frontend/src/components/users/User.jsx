import React, { useState, useEffect } from 'react'
import axios from "axios"
import "./users.css"
import { CircularProgress, Avatar } from '@mui/material'

const User = ({ sectionData }) => {
  const [toppers, setToppers] = useState(sectionData || [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        setLoading(true)
        // Change to http instead of https
        const response = await axios.get("http://localhost:8080/cse/toppers")
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
    <section className='users grid'>
      {loading ? (
        <div className="loading"><CircularProgress/></div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        toppers.map((value, index) => (
          <div className='cardBox flexSB' key={value.univNo || index}>
            <div className='img'>
              <Avatar
                src={value.cover || '/default-avatar.png'}
                alt={value.name}
                sx={{ width: 60, height: 60 }}
                className="profile-avatar"
              />
            </div>
            <div className='title'>
              <h3>{value.name}</h3>
              <h4>{value.title}</h4>
              <p>{value.univNo}</p>
              <span>{value.greets}</span>
            </div>
          </div>
        ))
      )}
    </section>
  )
}

export default User