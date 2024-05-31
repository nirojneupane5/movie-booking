import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate();
  const{authenticated}=useContext(AuthContext);
  const [foods, setFoods] = useState([]);
 

  useEffect(() => {
    const fetchFoods = async () => {
        const url = "http://localhost:4000/api/hawa/displayFood";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
          setFoods(data)
        }
    }      
    fetchFoods();
  }, []);

  const handleCart=async(id)=>{
   navigate(`/movieDetails/${id}`)
  }

  const handleClick=()=>{
    window.alert("Plase login to add your cart");
  }
  return (
    <>
      <div style={{background:'linear-gradient(90deg, rgba(23,75,213,1) 45%, rgba(30,22,33,1) 87%)', height:'100dvh'}}>
      <div className="container">
        <div className="row">
          {foods.map((food) => (
            <div className="col-md-4" key={food._id} >
              <div className='card my-2' style={{width:'450px', background:'linear-gradient(90deg, rgba(23,75,213,1) 45%, rgba(30,22,33,1) 87%)'}}>
              <img src={`http://localhost:4000/ItemImage/${food.filename}`} width="450px" height="300px" alt="" />
                <div style={{textAlign:'center', color:'white'}}>
                <h3>Movie: {food.name}</h3>
                <p>Ticket Price: {food.price}</p>
                <p>Duration: {food.duration}</p>
                <p>Cast: {food.cast}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'center',alignItems:'center'}}>
                {authenticated?(
                <button className="btn btn-primary my-2" style={{width:'150px'}} onClick={()=>{handleCart(food._id)}}>Book Ticket Now</button>
              ):(
                <button className="btn btn-primary my-2" style={{width:'150px'}} onClick={handleClick}>Book Ticket Now</button>
              )}
                </div>
                </div>
            </div>
          ))}
        </div>
       
      </div>
      </div>
    </>
  );
};


export default Home;