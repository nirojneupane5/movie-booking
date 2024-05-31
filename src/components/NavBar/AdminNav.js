import React from 'react'
import { NavLink,Outlet} from 'react-router-dom';
  const AdminNav=()=>{
  return (
    <>
    <div className="nav">
    <div className="container">
    <div className="row">
        <div className="col-md-6" id="logo">
           <h1> Movie Booking</h1>
        </div>
        <div className="col-md-6">
            <ul id="list">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
                 <li><NavLink to="/addMovie">Add Movie</NavLink></li> 
                 <li><NavLink to="/displayMovie">Display Movie</NavLink></li> 
                 <li><NavLink to="/displayAllUser">Display User</NavLink></li>    
            </ul>
        </div>
    </div>
  </div>
  </div>
  <main>
    <Outlet />
    
  </main>
  </>
  )
}

export default AdminNav