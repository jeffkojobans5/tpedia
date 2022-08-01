import { Link } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
// import { logout_user } from "../redux/features/authSlice"
import { logout } from "../redux/api"

import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand
} from "mdb-react-ui-kit"

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    return (
        <MDBNavbar fixed="top" expand="lg" style={{  backgroundColor : "#f0e6ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href="/" style={{ color: "#606080" ,  fontWeight : "600" , fontSize: "22px" }}>
                    TourPedia
                </MDBNavbarBrand>
                <div className="col-md-5 links-bar">
                    <Link to="/"> Home </Link>
                    {
                        user && 
                        ( <>
                            <Link to="/usertour"> { user } </Link>
                            <Link to="/addtour"> Add Tour </Link>
                            <Link to="/dashboard"> Dashboard </Link>
                        </> )
                    }
                    { user ? 
                    <Link to="/login" onClick={ ()=>logout(dispatch)}> Logout </Link>
                    :
                    <Link to="/login"> Login </Link>
                    }
                </div>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header