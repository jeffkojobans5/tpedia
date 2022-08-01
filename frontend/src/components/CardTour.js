import React from 'react'
import { Link } from "react-router-dom"
import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardTitle , MDBCardText} from 'mdb-react-ui-kit'

const CardTour = ( props ) => {
  const { imageFile , description , title , creator , tags , _id , name } = props
  
  const excerpt = (str) => {
      if(str.length > 45) {
          str = str.substring(0,45) + "..."
      }

      return str
  }

  return (
    <MDBCardGroup>
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem"}}>
           <MDBCardImage
            src={imageFile}
            alt={ title }
            position = 'top'
            style={{ maxWidth: '100%'  , height: "180px" }}
            /> 
            <div className="top-left"> { name} </div>
            <span className="text-start tag-card">
                { tags.map((item)=> {
                    return (
                        `#${item}`
                    )
                })}
            </span>
            <MDBCardBody>
                <MDBCardTitle className='text-start'> { title} </MDBCardTitle>
                <MDBCardText className='text-start'> { excerpt(description) } 
                    <Link to={`/tour/${_id}`}> Somelink</Link>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBCardGroup>
  )
}

export default CardTour