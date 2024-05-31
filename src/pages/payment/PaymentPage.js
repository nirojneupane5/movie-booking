import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentPage = () => {
    const navigate=useNavigate();
    const handleClick=async()=>{
        navigate('/khaltiPayment');
    }
  return (
    <div className="container">
        <button className="btn btn-primary" onClick={handleClick}>
            Khalti
        </button>
    </div>
  )
}
export default PaymentPage;