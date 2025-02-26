import Charts from "../charts/Charts"
import TableData from "../table/TableData"
import User from "../users/User"


const Home = ({batch}) => {
  return (
    <>
      <section className='home'>
        <div className='container'>
          <div className='heading flexSB'>
            <br />
        
          </div>
          
          <Charts batch={batch} />
          <User batch={batch} />
          <TableData batch={batch} />
        </div>
      </section>
    </>
  )
}

export default Home
