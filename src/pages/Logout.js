import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Logout = () => {
  const navigate=useNavigate()
  const {setAuthenticated}=useContext(AuthContext);

    const handleLogout=()=>{
      const confirmed=window.confirm("Are you sure you want to logout?")
        if(confirmed){
        localStorage.removeItem('token');
        console.log("Logout Successfull");
        setAuthenticated(false);
        navigate('/');
        }
    }
  return (
    <div>
        <h1>Logout</h1>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}
 export default Logout;
