import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

 const AddFood = () => {
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[description,setDescription]=useState('');
    const[price,setPrice]=useState('');
    const[image,setImage]=useState('');
    const[genre,setGenre]=useState('');
    const[direction,setDirection]=useState('');
    const[cast,setCast]=useState('');
    const[releseOn,setReleseOn]=useState('');
    const[duration,setDutration]=useState('');
    const[error,setError]=useState('');
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('price',price);
        formData.append('image',image);
        formData.append('genre',genre);
        formData.append('direction',direction);
        formData.append('cast',cast);
        formData.append('releseOn',releseOn);
        formData.append('duration',duration);
        
        const response=await fetch('http://localhost:4000/api/hawa/AddFood',{
            method: 'POST',
            body:formData
        });

        const json=await response.json();
        if(!response.ok){
            setError(json.error);
        }
        else{
            window.alert("Movie added");
            setName('');
            setDescription('');
            setPrice('');
            setGenre('');
            setDirection('');
            setCast('');
            setReleseOn('');
            setDutration('');
            navigate('/');
        }

    }
  return (
    <>
    <div className='container'>
       <div className="card my-2">
        <div className="d-flex justify-content-center">
        <h2>Add Movie</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="d-flex">
            <input type="text" className='form-control mx-4' style={{width:'300px'}}  placeholder='Movie name'onChange={(e)=>{setName(e.target.value)}}value={name}/>
            <input type="text" className='form-control mx-4' style={{width:'300px'}}  placeholder='Directed by' onChange={(e)=>{setDirection(e.target.value)}}value={direction}/>
            <input type="text" className='form-control' style={{width:'300px'}} placeholder='Duration' onChange={(e)=>{setDutration(e.target.value)}}value={duration}/>
            </div>
            <br />
            <label className='mx-4'>Description</label><br />
            <textarea className='form-control mx-4' onChange={(e)=>{setDescription(e.target.value)}} value={description} style={{width:'600px', height:'200px'}} /> <br />
            <div className="d-flex">
            <input type="text"className='form-control mx-4' style={{width:'300px'}} placeholder='Ticket Price' onChange={(e)=>{setPrice(e.target.value)}}value={price}/>
            <input type="text"className='form-control mx-4' style={{width:'300px'}} placeholder='Genre' onChange={(e)=>{setGenre(e.target.value)}}value={genre}/>
            <input type="text"className='form-control mx-4' style={{width:'300px'}} placeholder='Release Date' onChange={(e)=>{setReleseOn(e.target.value)}}value={releseOn}/>
            </div><br />
            <input type="text"className='form-control mx-4' style={{width:'500px'}} placeholder='Cast' onChange={(e)=>{setCast(e.target.value)}}value={cast}/> <br />
            <label className='mx-4'><h6>Add Movie Image</h6></label>
            <input type="file" className='form-control mx-4'onChange={(e)=>{setImage(e.target.files[0])}} style={{width:'300px'}}/><br />
            <button className="btn btn-primary mx-4 my-2">Add Movie</button>
        </form>
        {error && <div>{error}</div>}
       </div>
    </div>
    </>
  )
}

export default AddFood