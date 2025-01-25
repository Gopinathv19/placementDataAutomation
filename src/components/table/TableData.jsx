import React,{useState,useEffect} from "react"
import "./Table.css"
import Common from "../../common/Common"
import "../users/users.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"
 
const TableData = () => {
 
  const [apptitudeScore,setApptitudeScore]=useState([])
  const [leetcodeScore,setLeetcodeScore]=useState([])
  const[loading,setLoading]=useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const Aptiresponse=await fetch("https://cse/students/scores/apptitude")
        const data=await Aptiresponse.json()
        setApptitudeScore(data.toppers)
        const Leetcoderesponse=await fetch("https://cse/students/scores/leetcode")
        const LeetcodeData=await Leetcoderesponse.json()
        setLeetcodeScore(LeetcodeData.toppers)
        setLoading(false)
      }catch(error){
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  },[])
  if(loading) return <div className="loading"><CircularProgress /></div>
  if(error) return <div className="error">Error loading data</div>
  return (
    <>
      <section className='project'>
        <div className='user cardBox'>
          <Common title='Aptitude Ranking' />
          <div className='userBox'>
            {apptitudeScore.map((value) => {
              return (
                <div className='cardBox flexSB'>
                  <div className='img'>
                    <img className='imageCircle' src={value.cover} alt='' />
                  </div>
                  <div className='title'>
                    <h3>{value.name}</h3>
                    <p>{value.universityNo}</p>
                  </div>
                  <div className='time'>
                    <span>{value.score}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='table cardBox'>
          <Common title='Leetcode Ranking' />
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
                    <TableCell>Score</TableCell>
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
                      <TableCell>{row.hard}</TableCell>
                      <TableCell className='status'>{row.medium}</TableCell>
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
