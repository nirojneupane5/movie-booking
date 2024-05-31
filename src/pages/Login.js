import React,{useState, useContext} from 'react'
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

 const Login = () => {
    const {setAuthenticated}=useContext(AuthContext);
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const userData={email,password};
        const response=await fetch('http://localhost:4000/api/hawa/logIn',{
            method:'POST',
            body:JSON.stringify(userData),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json();
        if(!response.ok){
            setError(json.msg)
        }else{
            localStorage.setItem('token',json.accessToken);
            window.alert("Login successful");
            setEmail('');
            setPassword('');
            setAuthenticated(true);
            navigate('/');
        }
    }
  return (
    <>
        <div className="container">
            <h1>Login form</h1>
            <form onSubmit={handleSubmit} className='login-box'>
                <label>Email</label><br />
                <input type="text" onChange={(e)=>{setEmail(e.target.value)}} value={email}/><br />
                <label>Password</label><br />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/><br />
                <button className="btn btn-primary my-3">Login</button>
            </form>
            {error && <div>{error}</div>}

        </div>
    </>
  )
}
export default Login
