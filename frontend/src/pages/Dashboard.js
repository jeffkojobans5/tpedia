import { useEffect } from 'react'
import { MDBCol , MDBContainer , MBDRow , MDBTypography, MDBRow } from "mdb-react-ui-kit"
import { useDispatch , useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { getToursByUser } from '../redux/api'
import CardTour from '../components/CardTour'


const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

//   const tours = useSelector((state) => state.tour.all_tours)
//   console.log('tours' , tours)

  useEffect(()=> {
    getToursByUser(dispatch)
  },[])

  return (  
    <div style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "1000px",
      marginTop: "100px",
      alignContent: "center",
      backgroundColor : "brown"
    }}>
      {/* <MDBRow className=''>
        { tours.length == 0 && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Tours
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              { tours && tours.map((tour , index )=> {
                return (
                  <CardTour key={index} { ...tour } />
                    
                )
              })}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow> */}

    </div>
  )
}

export default Dashboard