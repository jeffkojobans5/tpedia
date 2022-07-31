import React , { useState } from 'react'
import { MDBCard , MDBCardBody , MDBInput , MDBCardFooter , MDBValidation , MDBBtn , MDBIcon , MDBSpinner } from "mdb-react-ui-kit"
import { Link , useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from '../redux/api'
import { toast } from 'react-toastify'


const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // gets the loading status 
  const { loading } = useSelector((state)=>{
    return state.auth
  })


  // forms values
  const [ formValue , setFormValue ] = useState({
    firstName: "",
    lastName: "",
    email : "",
    password : "",
    confirmPassword: ""
  });

  // desctructure formValues
  const { firstName , lastName , email , password , confirmPassword  } = formValue;
  
  // handles form submit
  const handleSubmit = async (e) => {
      e.preventDefault();

      // check if passwords are same
      if(password !== confirmPassword) {
        return toast.error("Password should match");
      }
      
      if(firstName && firstName && email && password && confirmPassword) {
        SignUp(formValue , dispatch , navigate)    
      }
  }


  // handles form input 
  const onInputChange = (e) => {
    let { name , value } = e.target
    setFormValue({ ...formValue ,
      [name] : value
    })
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop : "120px"
      }}
    >
      <MDBCard alignments="center">
        <MDBIcon fas icon="user-circle" className="fa-2x"/>
        <h5> Sign Up </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
              <div className="col-md-6">
                <MDBInput
                  label="First Name"
                  type="text"
                  value={ firstName }
                  name = "firstName"
                  onChange = { (e)=>onInputChange(e) }
                  required
                  // invalid={true}
                  validation = "Please provide your First Name"
                />
              </div>
              <div className="col-md-6">
                <MDBInput
                  label="Last Name"
                  type="text"
                  value={ lastName }
                  name = "lastName"
                  onChange = { (e)=>onInputChange(e) }
                  required
                  // invalid={true}
                  validation = "Please provide your Last Name"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Email Address"
                  type="email"
                  value={ email }
                  name = "email"
                  onChange = { (e)=>onInputChange(e) }
                  required
                  // invalid={true}
                  validation = "Please provide your Email Address"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  value={ password }
                  name = "password"
                  onChange = {  (e)=>onInputChange(e) }
                  required
                  // invalid
                  validation = "Please provide your password"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  value={ confirmPassword }
                  name = "confirmPassword"
                  onChange = {  (e)=>onInputChange(e) }
                  required
                  // invalid
                  validation = "Please confirm your password"
                />
              </div>
              <div className="col-md-12">
                <MDBBtn
                  style={{ width: "100%" }}
                  className="mt-2"
                > 
                { loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className='me-2'
                  />
                )}
                Sign Up
                </MDBBtn >                  
              </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p> Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Register