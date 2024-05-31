import React, { useEffect, useState,useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const KhaltiPayment = () => {
  const {userId,setAuthenticated}=useContext(AuthContext);
  const [paymentURL, setPaymentURL] = useState(null);
  const[price,setPrice]=useState('');
  
  useEffect(() => {
    const url = `http://localhost:4000/api/hawa/displayPayment`;
    const displayPayment = async () => {
      const response = await fetch(url)
      const data = await response.json();
      if (response.ok) {
        setAuthenticated(true);
        const userPayment = data.find(item => item.userId === userId);
        console.log(userPayment);
        if (userPayment) {
          setPrice(userPayment.cost*100);
        }
      }
    }
    displayPayment();
  }, [setAuthenticated, userId]);

  

  const handlePayment = async () => {
    const data={
        "return_url": "http://localhost:3000/success",
        "website_url": "http://localhost:3000/",
        "amount": `${price}`,
        "purchase_order_id": "Order01",
        "purchase_order_name": "test",
        "customer_info": {
            "name": `niroj`,
            "email": `niroj@gmail.com`,
            "phone": "9800000001"
        }
    }

    try {
      const response = await fetch('http://localhost:4000/api/hawa/khaltiPayment', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        setPaymentURL(json.khaltiUrl);
      } else {
        console.error('Failed to retrieve payment URL.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <button className="btn btn-primary my-2" onClick={handlePayment}>
        Khalti
      </button>
      {paymentURL && (
        <a href={paymentURL} target="_blank" rel="noopener noreferrer">
          Click here to complete payment
        </a>
      )}
    </div>
  );
};

export default KhaltiPayment;