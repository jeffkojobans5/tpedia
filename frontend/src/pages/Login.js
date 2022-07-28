import React , { useState , useEffect } from 'react'
import { MDBCard , MDBCardBody , MDBInput , MDBCardFooter , MDBValidation , MDBBtn , MDBIcon , MDBSpinner } from "mdb-react-ui-kit"
import { Link , useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { SignIn } from '../redux/api'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [ formValue , setFormValue ] = useState({
    email : "",
    password : ""
  });


  // handles form submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(formValue.email && formValue.password) {
         SignIn(formValue , dispatch , navigate)    
      }
  }


  // handles form input change
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
        <h5> Sign In </h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
              <div className="col-md-12">
                <MDBInput
                  label="Email"
                  type="email"
                  value={ formValue.email }
                  name = "email"
                  onChange = { (e)=>onInputChange(e) }
                  required
                  // invalid={true}
                  validation = "Please provide your email"
                />
              </div>
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  value={ formValue.password }
                  name = "password"
                  onChange = {  (e)=>onInputChange(e) }
                  required
                  // invalid
                  validation = "Please provide your password"
                />
              </div>
              <div className="col-md-12">
                <MDBBtn
                  style={{ width: "100%" }}
                  className="mt-2"
                > Login
                </MDBBtn >                  
              </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p> Don't have an account? Create One</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Login