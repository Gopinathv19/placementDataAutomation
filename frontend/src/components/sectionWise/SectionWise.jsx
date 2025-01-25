// import React, { useState, useEffect } from "react"
// import Cards from "../cards/Cards"
// import Charts from "../charts/Charts"
// import TableData from "../table/TableData"
// import User from "../users/User"
// import axios from "axios"
// import { useParams } from "react-router-dom"
// import { CircularProgress } from "@mui/material"

// const SectionWise = () => {
//   const { section } = useParams() // Gets section from URL (a, b, or c)
//   const [sectionData, setSectionData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [eligibilityData, setEligibilityData] = useState([0, 0])
//   const [genderData, setGenderData] = useState([0, 0])
//   const [chartData, setChartData] = useState({})

//   useEffect(() => {
//     const fetchSectionData = async () => {
//       try {
//         setLoading(true)
//         const response = await axios.get(`http://localhost:8080/cse/section/${section}`)
//         setSectionData(response.data)
//         if (response.data) {
//           setEligibilityData(response.data.eligibility || [0, 0])
//           setGenderData(response.data.gender || [0, 0])
//           setChartData(response.data.charts || {})
//         }
//         setError(null)
//       } catch (err) {
//         console.error('Error fetching section data:', err)
//         setError("Failed to fetch section data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSectionData()
//   }, [section]) // Refetch when section changes

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <CircularProgress />
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>
//   }

//   return (
//     <>
//       <section className='section-wise'>
//         <div className='container'>
//           <div className='heading flexSB'>
//             <h2>Section {section.toUpperCase()} Analysis</h2>
//           </div>
//           <Cards sectionData={sectionData?.overview} />
//           <Charts sectionData={sectionData?.charts} />
//           <User sectionData={sectionData?.toppers} />
//           <TableData sectionData={sectionData?.rankings} />
//         </div>
//       </section>
//     </>
//   )
// }

// export default SectionWise 