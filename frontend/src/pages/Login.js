import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { MDBCard , MDBCardBody , MDBInput , MDBCardFooter , MDBValidation , MDBBtn , MDBIcon , MDBSpinner } from "mdb-react-ui-kit"
import { Link , useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { SignIn , GoogleSignIn} from '../redux/api'
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // gets the loading status 
  const { loading } = useSelector((state)=>{
    return state.auth
  })


  // forms values
  const [ formValue , setFormValue ] = useState({
    email : "",
    password : ""
  });

  // handles form submit
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(formValue.email && formValue.password) {

        // takes form value, validates and nav to homepage
         SignIn(formValue , dispatch , navigate)    
      }
  }


  // handles form input 
  const onInputChange = (e) => {
    let { name , value } = e.target
    setFormValue({ ...formValue ,
      [name] : value
    })
  }


  // handles google success 
  const credentialResponse = async (resp) => {
      GoogleSignIn( resp , dispatch , navigate )
      // console.log(resp)
  }

  // handles google error
  const googleFailure = (error) => {
    toast.error("Something went wrong")
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
                > 
                { loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className='me-2'
                  />
                )}
                Login
                </MDBBtn >                  
              </div>
          </MDBValidation>
          <br/>
          
          <GoogleLogin  
            onSuccess={credentialResponse}
            onError={googleFailure}          
          />
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