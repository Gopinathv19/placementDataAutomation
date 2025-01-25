import React, { useState, useEffect } from "react"
import "./Table.css"
import Common from "../../common/Common"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"

const TableData = ({ sectionData }) => {
  const [apptitudeScore, setApptitudeScore] = useState([])
  const [leetcodeScore, setLeetcodeScore] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Menu states
  const [aptitudeAnchorEl, setAptitudeAnchorEl] = useState(null)
  const [leetcodeAnchorEl, setLeetcodeAnchorEl] = useState(null)

  // Use sectionData for section-specific rankings
  // const data = sectionData || {} // Fallback for home page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Aptiresponse = await fetch("http://localhost:8080/cse/students/scores/apptitude")
        const aptiData = await Aptiresponse.json()
        const transformedAptiData = aptiData.map((item, index) => ({
          id: index + 1,
          name: item.name,
          universityNo: item.universityNo,
          score: ((item.test1 || 0) + (item.test2 || 0) + (item.test3 || 0)).toFixed(2)
        }))
        setApptitudeScore(transformedAptiData)

        const Leetcoderesponse = await fetch("http://localhost:8080/cse/students/scores/leetcode")
        const leetcodeData = await Leetcoderesponse.json()
        const transformedLeetcodeData = leetcodeData.map((item, index) => ({
          id: index + 1,
          name: item.name,
          easy: item.easy || 0,
          medium: item.medium || 0,
          hard: item.hard || 0,
          total: item.total || 0
        }))
        setLeetcodeScore(transformedLeetcodeData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Sort handlers for Aptitude
  const handleAptitudeMenuClick = (event) => {
    setAptitudeAnchorEl(event.currentTarget)
  }

  const handleAptitudeMenuClose = () => {
    setAptitudeAnchorEl(null)
  }

  const handleAptitudeSort = (order) => {
    const sortedData = [...apptitudeScore].sort((a, b) => {
      if (order === 'asc') {
        return parseFloat(a.score) - parseFloat(b.score)
      } else {
        return parseFloat(b.score) - parseFloat(a.score)
      }
    }).map((item, index) => ({ ...item, id: index + 1 }))
    setApptitudeScore(sortedData)
    handleAptitudeMenuClose()
  }

  // Sort handlers for Leetcode
  const handleLeetcodeMenuClick = (event) => {
    setLeetcodeAnchorEl(event.currentTarget)
  }

  const handleLeetcodeMenuClose = () => {
    setLeetcodeAnchorEl(null)
  }

  const handleLeetcodeSort = (order) => {
    const sortedData = [...leetcodeScore].sort((a, b) => {
      if (order === 'asc') {
        return parseFloat(a.total) - parseFloat(b.total)
      } else {
        return parseFloat(b.total) - parseFloat(a.total)
      }
    }).map((item, index) => ({ ...item, id: index + 1 }))
    setLeetcodeScore(sortedData)
    handleLeetcodeMenuClose()
  }

  if (loading) return <div className="loading"><CircularProgress /></div>
  if (error) return <div className="error">Error loading data</div>

  return (
    <>
      <section className='project'>
        <div className='table cardBox' style={{marginLeft: "-12px"}}>
          <Common 
            title='Aptitude Ranking'
            onMenuClick={handleAptitudeMenuClick}
            menuAnchorEl={aptitudeAnchorEl}
            onMenuClose={handleAptitudeMenuClose}
            onSortAsc={() => handleAptitudeSort('asc')}
            onSortDesc={() => handleAptitudeSort('desc')}
          />
          <div className='tableBox'>
            <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "none" }}>
              <Table
                className='tableContainer'
                sx={{
                  minWidth: 650,
                  background: "#313844",
                  border: "none",
                  "& td ,th": {
                    color: "rgb(166, 171, 176)",
                    borderBottom: "1px solid rgb(86, 86, 86)",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>University No</TableCell>
                    <TableCell>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apptitudeScore.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.universityNo}</TableCell>
                      <TableCell>{row.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className='table cardBox'>
          <Common 
            title='Leetcode Ranking'
            onMenuClick={handleLeetcodeMenuClick}
            menuAnchorEl={leetcodeAnchorEl}
            onMenuClose={handleLeetcodeMenuClose}
            onSortAsc={() => handleLeetcodeSort('asc')}
            onSortDesc={() => handleLeetcodeSort('desc')}
          />
          <div className='tableBox'>
            <TableContainer component={Paper} sx={{ boxShadow: "none", borderRadius: "none" }}>
              <Table
                className='tableContainer'
                sx={{
                  minWidth: 650,
                  background: "#313844",
                  border: "none",
                  "& td ,th": {
                    color: "rgb(166, 171, 176)",
                    borderBottom: "1px solid rgb(86, 86, 86)",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Easy</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Hard</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leetcodeScore.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component='th' scope='row'>
                        {row.id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.easy}</TableCell>
                      <TableCell>{row.medium}</TableCell>
                      <TableCell>{row.hard}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableData