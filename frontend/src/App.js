import { useEffect } from "react";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { BrowserRouter , Routes, Route} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Header from "./components/Header";
import { set_user } from "./redux/features/authSlice";
import AddEditTour from "./pages/AddEditTour";
import Dashboard from "./pages/Dashboard";

function App() {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    dispatch(set_user(user))
  },[])

  return (
  <BrowserRouter>
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addTour" element={<AddEditTour />} />
        <Route path="/editTour/:id" element={<AddEditTour />} />
      </Routes>
      </div>
  </BrowserRouter>    
  );
}

export default App;
