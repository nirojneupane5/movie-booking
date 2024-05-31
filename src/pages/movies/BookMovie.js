import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const SEAT_COST = 300; // Cost per seat

const BookMovie = () => {
  const { setAuthenticated, userId } = useContext(AuthContext);
  const [buttonColors, setButtonColors] = useState(Array(30).fill(''));
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [seatUnPaidData, setSeatUnPaidData] = useState([]);
  const [datasReserve, setDatasReserve] = useState([]);
  const [datasPaid, setDatasPaid] = useState([]);
  const [cost, setCost] = useState(0);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { id, time } = useParams();

  // Display payment
  useEffect(() => {
    const fetchFoods = async () => {
      const url = `http://localhost:4000/api/hawa/displayPayment`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const userPaymentReserve = data.filter((item) => item.payment === 'pending');
        if (userPaymentReserve) {
          setDatasReserve(userPaymentReserve);
        }
        const userPaid = data.filter((item) => item.payment === 'success');
        if (userPaid) {
          setDatasPaid(userPaid);
        }
      }
    };
   
    fetchFoods();
    const intervalId = setInterval(() => {
      fetchFoods();
    }, 1000);
  
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Extract and set selected seats
  useEffect(() => {
    const selectedSeatsArray = datasReserve.map((info) => info.selectedSeats).flat();
    setSeatUnPaidData(selectedSeatsArray);
  }, [datasReserve]);

  // Extract paid seats
  useEffect(() => {
    const selectedSeatsArray = datasPaid.map((info) => info.selectedSeats).flat();
    setSeatData(selectedSeatsArray);
  }, [datasPaid]);

  useEffect(() => {
    const fetchMovie = async () => {
      const url = `http://localhost:4000/api/hawa/displayFood/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setName(data.name);
        setAuthenticated(true);
      }
    };
    fetchMovie();
  }, [id, setAuthenticated]);

  useEffect(() => {
    setCost(selectedSeats.length * SEAT_COST);
  }, [selectedSeats.length]);

  const calculateTotalCost = () => {
    return selectedSeats.length * SEAT_COST;
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J'];

  const isSeatReserved = (letter, number) => {
    return seatUnPaidData.includes(`${letter}${number}`);
  };

  const isSeatPaid = (letter, number) => {
    return datasPaid.some((info) => info.selectedSeats.includes(`${letter}${number}`));
  };

  const handleButtonClick = (index, letter, number) => {
    const newButtonColors = [...buttonColors];
    const seat = `${letter}${number}`;

    if (isSeatPaid(letter, number)) {
      // Seat is paid, display in red with white text
      newButtonColors[index] = 'red';
    } else if (isSeatReserved(letter, number)) {
      // Seat is reserved, display in yellow with black text
      newButtonColors[index] = 'yellow';
    } else {
      // Seat is not reserved or paid, toggle background color to green with black text
      newButtonColors[index] = newButtonColors[index] === '#A6FF96' ? '' : '#A6FF96';
    }
    setButtonColors(newButtonColors);
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat)) {
        return prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat);
      } else {
        return [...prevSelectedSeats, seat];
      }
    });
  };

  const buttons = [];
  console.log(seatData)
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    const letterButtons = [];

    for (let j = 1; j <= 15; j++) {
      const index = i * 15 + j - 1;
      const isReserved = isSeatReserved(letter, j);
      const isPaid = isSeatPaid(letter, j);

      letterButtons.push(
        <button
          key={j}
          style={{
            backgroundColor: isPaid ? 'red' : (isReserved ? 'yellow' : buttonColors[index]),
            color: isPaid || isReserved ? 'black' : 'black',
            marginRight: '10px',
          }}
          onClick={() => !isReserved && !isPaid && handleButtonClick(index, letter, j)}
          disabled={isReserved || isPaid}
        >
          {`${letter}${j} ${isReserved ? '' : (isPaid ? '' : '')}`}
        </button>
      );
    }

    buttons.push(
      <div key={letter}>
        <div style={{ marginBottom: '10px' }}>
          Row {letter} {letterButtons}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payment = 'pending';
    const userData = { name, id, time, userId, cost, selectedSeats, payment };
    const url = `http://localhost:4000/api/hawa/addPayment`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      navigate('/paymentPage');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(90deg, rgba(23,75,213,1) 45%, rgba(30,22,33,1) 87%)', height: '92vh' }}>
      <div className="container" style={{ color: 'white' }}>
        <div>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <p>Total Cost: Rs {calculateTotalCost()}</p>
          {buttons}
        </div>
        <form onSubmit={handleSubmit}>
          <button className="custom-btn btn-4">Proceed to Pay</button>
        </form>
      </div>
    </div>
  );
};

export default BookMovie;
