import { useState, useEffect } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"
import { Menu, MenuItem } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const TableData = ({ batch }) => {
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
      setLoading(true)
      try {
        const Aptiresponse = await fetch(`/cse/v1/students/getStudent/ApptitudeScores/${batch}`)
        const aptiData = await Aptiresponse.json()
        const transformedAptiData = aptiData.map((item, index) => ({
          id: index + 1,
          name: item.name,
          universityNo: item.universityNo,
          score: ((item.test1 || 0) + (item.test2 || 0) + (item.test3 || 0)).toFixed(2)
        }))
        setApptitudeScore(transformedAptiData)

        const Leetcoderesponse = await fetch(`/cse/v1/students/getStudent/LeetCodeScores/${batch}`)
        const leetcodeData = await Leetcoderesponse.json()
        const transformedLeetcodeData = leetcodeData.map((item, index) => ({
          id: index + 1,
          name: item.name,
          easy: item.easyProblemSolved || 0,
          medium: item.mediumProblemSolved || 0,
          hard: item.hardProblemSolved || 0,
          total: item.totalProblemSolved || 0

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
  }, [batch])

  // Menu handlers for Aptitude
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

  // Menu handlers for Leetcode
  const handleLeetcodeMenuClick = (event) => {
    setLeetcodeAnchorEl(event.currentTarget)
  }

  const handleLeetcodeMenuClose = () => {
    setLeetcodeAnchorEl(null)
  }

  const handleLeetcodeSort = (order) => {
    const sortedData = [...leetcodeScore].sort((a, b) => {
      if (order === 'asc') {
        return a.total - b.total
      } else {
        return b.total - a.total
      }
    }).map((item, index) => ({ ...item, id: index + 1 }))
    setLeetcodeScore(sortedData)
    handleLeetcodeMenuClose()
  }

  if (loading) return <div className="flex justify-center items-center h-full"><CircularProgress /></div>
  if (error) return <div className="text-center text-red-500">Error loading data</div>

  return (
    <section className="mt-12 flex flex-col md:flex-row gap-8">
      {/* Aptitude Table */}
      <div className="flex-1 bg-gray-800 rounded-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold !text-red-500">Aptitude Ranking</h2>
          <button
            onClick={handleAptitudeMenuClick}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            {aptitudeAnchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>
          <Menu
            anchorEl={aptitudeAnchorEl}
            open={Boolean(aptitudeAnchorEl)}
            onClose={handleAptitudeMenuClose}
            PaperProps={{
              style: {
                backgroundColor: '#1F2937',
                color: 'white',
              },
            }}
          >
            <MenuItem onClick={() => handleAptitudeSort('asc')} className="hover:bg-gray-700">
              Sort Ascending
            </MenuItem>
            <MenuItem onClick={() => handleAptitudeSort('desc')} className="hover:bg-gray-700">
              Sort Descending
            </MenuItem>
          </Menu>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
        <TableContainer 
          component={Paper} 
          className="bg-gray-800"
          sx={{ 
            maxHeight: 400,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#1F2937',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4B5563',
              borderRadius: '4px',
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Rank</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Name</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">University No</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apptitudeScore.map((row) => (
                <TableRow 
                  key={row.id}
                  className="bg-gray-700"
                >
                  <TableCell className={`border-b border-gray-700 ${row.id <= 3 ? '!text-yellow-300 font-medium' : '!text-white'}`}>
                    {row.id}
                  </TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.name}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.universityNo}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>

      {/* Leetcode Table - Exactly matching Aptitude table styles */}
      <div className="flex-1 bg-gray-800 rounded-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold !text-blue-500">Leetcode Ranking</h2>
          <button
            onClick={handleLeetcodeMenuClick}
            className="p-2 hover:bg-gray-700 rounded-full text-white"
          >
            {leetcodeAnchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </button>
          <Menu
            anchorEl={leetcodeAnchorEl}
            open={Boolean(leetcodeAnchorEl)}
            onClose={handleLeetcodeMenuClose}
            PaperProps={{
              style: {
                backgroundColor: '#1F2937',
                color: 'white',
              },
            }}
          >
            <MenuItem onClick={() => handleLeetcodeSort('asc')} className="hover:bg-gray-700">
              Sort Ascending
            </MenuItem>
            <MenuItem onClick={() => handleLeetcodeSort('desc')} className="hover:bg-gray-700">
              Sort Descending
            </MenuItem>
          </Menu>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
        <TableContainer 
          component={Paper} 
          className="bg-gray-800"
          sx={{ 
            maxHeight: 400,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#1F2937',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4B5563',
              borderRadius: '4px',
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Rank</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Name</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Easy</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Medium</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Hard</TableCell>
                <TableCell className="!bg-gray-800 !text-white font-semibold">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leetcodeScore.map((row) => (
                <TableRow 
                  key={row.id}
                  className="bg-gray-700"
                >
                  <TableCell className={`border-b border-gray-700 ${row.id <= 3 ? '!text-yellow-300 font-medium' : '!text-white'}`}>
                    {row.id}
                  </TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.name}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.easy}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.medium}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.hard}</TableCell>
                  <TableCell className="!text-white border-b border-gray-700">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </div>
    </section>
  )
}

export default TableData


 