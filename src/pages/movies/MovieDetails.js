// MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('');
  const [direction, setDirection] = useState('');
  const [cast, setCast] = useState('');
  const [releseOn, setReleseOn] = useState('');
  const [duration, setDuration] = useState('');
  

  useEffect(() => {
    const fetchFoods = async () => {
      const url = `http://localhost:4000/api/hawa/displayFood/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setImage(data.filename);
        setName(data.name);
        setDesc(data.description);
        setPrice(data.price);
        setGenre(data.genre);
        setDirection(data.direction);
        setDuration(data.duration);
        setReleseOn(data.releseOn);
        setCast(data.cast);
        
      }
    };
    fetchFoods();
  }, [id]);

  const handleTime = (time) => {
    navigate(`/bookMovie/${id}/${time}`);
  };

  return (
    <div style={{background:'linear-gradient(90deg, rgba(23,75,213,1) 45%, rgba(30,22,33,1) 87%)', height:'100dvh'}}>
      <div className="container" style={{color:'white'}}>
      <img src={`http://localhost:4000/ItemImage/${image}`} width="450px" height="300px" alt="" /><br />
      <h4>Movie name: {name}</h4>
      <p>{desc}</p>
      <div className='d-flex'>
      <p>Cast: {cast}</p>
      <p  className='mx-5'>Ticket price: {price}</p>
      </div>
      <div className='d-flex'>
      <p>Directed by: {direction}</p>
      <p className='mx-5'>Genre: {genre}</p>
      </div>
      
      <div className='d-flex'>
      <p>Duration :{duration}  </p>
      <p className='mx-5'> Release on: {releseOn}</p>
      </div>
      <b >Book Now</b>
      <button className="custom-btn btn-4 mx-2" onClick={() => handleTime('7:00 AM')}><span>7:00 AM</span></button>
      <button className="custom-btn btn-4 mx-2" onClick={() => handleTime('11:00 AM')}><span>11:00 AM</span></button>
      <button className="custom-btn btn-4 mx-2" onClick={() => handleTime('3:00 PM')}><span>3:00 PM</span></button>
      <button className="custom-btn btn-4 mx-2" onClick={() => handleTime('7:00 PM')}><span>7:00 PM</span></button>
    </div>
    </div>
  );
};

export default MovieDetails;
