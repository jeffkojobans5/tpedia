import { useState  } from 'react'
import { useSelector , useDispatch} from "react-redux" 
import { MDBCard , MDBCardBody , MDBValidation, MDBBtn , MDBSpinner } from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import Filebase from "react-file-base64"
import { useNavigate } from "react-router-dom"
import { createTour } from '../redux/api'

const AddEditTour = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading } = useSelector((state)=> ({...state.tour}))
    const user = useSelector((state) => state.auth.user);
    

    // data for forms
    const [ tourData , setTourData ] = useState({
      title : "",
      description : "",
      tags : [],
      name : user            
   })

    // destruction of data for forms 
    const { title , description , tags } = tourData

    const onInputChange = (e) => {
        const { name , value} = e.target
        setTourData({
            ...tourData,
            [name] : value
        })
    }

    const handleAddTag = (tag) => {
        setTourData({ ...tourData , tags: [...tourData.tags , tag]})
    }

    const handleDeleteTag = (deleteTag) => {
        setTourData({ ...tourData , tags : tourData.tags.filter((tag) => tag !== deleteTag )})
    }

    const clearInputs = (e) => {
        setTourData({
            title : "",
            description : "",
            tags : [],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(title && description && tags) {
            const updated_tour = { ...tourData }
            console.log(updated_tour)
            createTour(updated_tour , dispatch , navigate)
        }
    }


  return (
    <div style={{ 
        margin: 'auto',
        padding: "15px",
        maxWidth: "450px",
        alignContent : "center",
        marginTop: '100px' 
        }} className="container">
        <MDBCard alignment='center'>
            <h5> Add Tour </h5>
            <MDBCardBody>
            <MDBValidation onSubmit={ handleSubmit } className="row g-3" noValidate>
                <div className="col-md-12">
                    <input 
                    type="text" 
                    placeholder= "Enter Title"
                    name = 'title'
                    value={title}
                    onChange={ onInputChange }
                    className = 'form-control'
                    required
                    // invalid
                    validation='Please provide title'
                    />
                </div>
                <div className="col-md-12">
                    <textarea 
                    placeholder= "Enter description"
                    name = 'description'
                    value={ description }
                    onChange={ onInputChange }
                    className = 'form-control'
                    required
                    // invalid
                    validation='Please provide description'
                    />
                </div>            
                <div className="col-md-12">
                    <ChipInput
                    name = 'tags'
                    variant='outlined'
                    placeholder='Enter Tag'
                    fullWidth
                    value={tags}
                    onAdd={(tag)=> handleAddTag(tag)}
                    onDelete={(tag)=> handleDeleteTag(tag)}
                    />
                </div>            
                <div className="d-flex justify-content">
                    <Filebase 
                    type="file" 
                    multiple={false} 
                    onDone={({ base64}) => {
                        setTourData({ ...tourData , imageFile: base64 })
                    }}
                    />
                </div>
                <div className="col-md-12">
                    <MDBBtn style={{ width: "100%"}}> 
                        { loading && (
                            <MDBSpinner
                                size="sm"
                                role="status"
                                tag="span"
                                className='me-2'
                            />
                        )}                    
                    Submit </MDBBtn>
                    <MDBBtn style={{ width: "100%"}} className='mt-2' color='danger' onClick={ clearInputs }> Clear </MDBBtn>
                </div>
            </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default AddEditTour