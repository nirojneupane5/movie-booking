import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const SuccessPage = () => {
  const { userId, setAuthenticated } = useContext(AuthContext);
  const [id, setId] = useState('');
  
  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      const response = await fetch(url)
      const data = await response.json();
      if (response.ok) {
        setAuthenticated(true);
        
        const userPayment = data.find(item => item.userId === userId);
        if (userPayment) {
          setId(userPayment._id);
        }
      }
    }
    displayPayment();
  }, [setAuthenticated, userId]);
 
  useEffect(() => {
    if (id) {
      const payment = "success";
      const niroj = { payment };
      const updatePayment = async () => {
        const url = `http://localhost:4000/api/hawa/updatePayment/${id}`;
        const response = await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(niroj),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json();
        if (response.ok) {
          console.log('Payment successful', json);
        
        }
      }
      updatePayment();
    }
  }, [id])
  
  
  return (
    <>
      <div className="container">
        <h1>Payment SuccessFul</h1>
      </div>
    </>
  );
};

export default SuccessPage;