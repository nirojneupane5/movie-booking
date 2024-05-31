import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const navigate=useNavigate();
  const[username,setUsername]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const[role,setRole]=useState('');
const[error,setError]=useState('');

const handleSubmit=async(e)=>{
  e.preventDefault();
  const userData={username,email,password,role};
  const response=await fetch('http://localhost:4000/api/hawa/signUp',{
    method:'POST',
    body:JSON.stringify(userData),
    headers:{
      'Content-Type':'application/json'
    }
  });
  const json=await response.json();
  if(!response.ok){
    setError(json.error);
  }
  else{
    window.alert("SignUp Sucessfull");
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('');
    navigate('/logIn')
  }
}
  return (
    <>
    <div className="container">
      <h1>SignUp form</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label><br/>
        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username}/><br/>
        <label>Email</label><br/>
        <input type="text"onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br/>
        <label>Password</label><br/>
        <input type="password"onChange={(e)=>{setPassword(e.target.value)}} value={password}/><br/>
        <label>Role</label><br/>
        <input type="role"onChange={(e)=>{setRole(e.target.value)}} value={role}/><br/>
        <button className="btn btn-success my-3">Submit</button>
      </form>
    </div>
    {error && <div>{error}</div>}
    </>
  )
}

export default SignUp