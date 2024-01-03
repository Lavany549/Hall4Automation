import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Error from './Error';
import ResponsiveGrid from './grid';
import { Modal, Button } from 'react-bootstrap';
import '../css/servicesStyle.css';
import PaymentGateway from './paymentGateway';

const Services = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(jsonRes)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isResident, setIsResident] = useState(user ? user.data.isResident : '');
  const [roomType, setRoomType] = useState('guestroom');

  const [name, setName] = useState(user ? user.data.name : '');
  const [rollNum, setRollNum] = useState(user ? user.data.rollnum : '');
  const [numOfGuests, setNumOfGuests] = useState(0);
  const [guestDetails, setGuestDetails] = useState([{ name: '', age: '', relation: '', id: '', picture: null }]);

  const [selectedRooms, setSelectedRooms] = useState({});
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [totalSum, setTotalSum] = useState(0);

  // const orderid = require('order-id')('key');
  // const id = orderid.generate();
  // // console.log(totalSum,id)

  const generateUniqueID = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const userID = user ? user.data.userId : ''; // You might replace this with your user identifier logic
    return `${userID}_${timestamp}_${random}`;
  };
  const id = generateUniqueID();


  // console.log(selectedRooms)
  const handleClose = () => setShowConfirmationModal(false);
  const handleShow = () => setShowConfirmationModal(true);

  const handleSelectedRooms = (rooms) => {
    setSelectedRooms(rooms);

    // Calculate total sum
    const sum = rooms.reduce((total, room) => total + room.totalPrice, 0);
    setTotalSum(sum);
  };

  const handleGuestAdd = () => {
    setGuestDetails([...guestDetails, { name: '', age: '', relation: '', id: '', picture: '' }]);
  };

  const handleGuestRemove = (index) => {
    const tempGuestDetails = [...guestDetails];
    tempGuestDetails.splice(index, 1);
    setGuestDetails([...guestDetails, { name: '', age: '', relation: '', id: '', picture: '' }]);
    setGuestDetails(tempGuestDetails);
  };

  const handleInputChange = (index, field, currentValue) => {
    const tempGuestDetails = [...guestDetails];
    if (field === 'picture') {
      const file = currentValue;
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        tempGuestDetails[index][field] = base64String;
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
    else {
      tempGuestDetails[index][field] = currentValue;
    }
    setGuestDetails(tempGuestDetails);
  };

  const handleRoomTypeChange = (e) => {
    // console.log('Selected Room Type:', e.target.value);
    setRoomType(e.target.value);
    setTotalSum(60);
  };
  const validateGuestDetails = () => {
    let isValid = true;

    guestDetails.forEach((guest, index) => {
      if (!guest.name) {
        isValid = false;
        alert(`Please fill in the name for Guest ${index + 1}.`);
      }

      else if (!guest.age || isNaN(guest.age) || guest.age > 100) {
        isValid = false;
        alert(`Please fill in a valid age for Guest ${index + 1}.`);
      }
      else if (!guest.gender) {
        isValid = false;
        alert(`Please fill in a valid gender for Guest ${index + 1}.`);
      }

      else if (!guest.relation) {
        isValid = false;
        alert(`Please fill in the relation for Guest ${index + 1}.`);
      }

      else if (!guest.id) {
        isValid = false;
        alert(`Please fill in the ID for Guest ${index + 1}.`);
      }

    });

    return isValid;
  };

  const validateTotalSum = () => {
    return totalSum >= 60; // Total sum should be at least 200
  };

  const validateForm = () => {
    if (!validateGuestDetails()) {
      // alert('Please fill in all guest details, and ensure age is a number.');
      return false;
    }

    if (!validateTotalSum()) {
      alert('Please select at least 1 room');
      return false;
    }

    return true; // Form is valid
  };



  const handleSubmit = () => {

    if (!user) {

      alert("Kindly Login to book room");
    }
    else if (validateForm()) {

      if (
        roomType == "guestroom" &&
        guestDetails.length === 1 &&
        guestDetails[0].gender === "male" &&
        guestDetails[0].relation.toLowerCase() !== "father"
      ) {
        alert("Single male other than Father is not allowed");
      }
      else if (roomType == "ownroom" &&
        guestDetails.length === 1 &&
        guestDetails[0].gender === "male"
      ) {
        alert("Males are not allowed in own rooms");

      }

      else {
        handleShow(); // Open the confirmation modal
      }


    }
  };


  const handlePaymentSuccess = async (paymentDetails) => {
    // console.log(paymentDetails)
    try {
      setLoading(true);
      // const paymentDetails = location.state?.jsonRes;
      const paymentdata = {

        userdetails: user.data,
        roomType,
        numOfGuests: guestDetails.length,
        guestDetails,
        selectedRooms,
        amount: totalSum,
        paymentDetails: {
          msg: paymentDetails.msg,
          paymentId: paymentDetails.paymentId,
          orderId: paymentDetails.orderId,
        },

      }
      // console.log(paymentdata);

      if (paymentDetails) {
        // Payment process is done, proceed with booking
        const response = await axios.post('/api/bookings/bookroom', paymentdata);
        // console.log(response.data);
        setLoading(false);
        // Redirect to bookings page
        navigate('/bookings');
      } else {
        // Payment failed, handle accordingly
        setLoading(false);
        setError({ message: 'Payment failed. Please try again.' });
        // You can also update the UI to display an error message
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setLoading(false);
      setError(error);
    }
  };


  return (
    <div className="mainSection">
      <div className="contentBox">
        {loading ? (
          <Loader />
        ) :
          error ? (
            <h1><Error /></h1>
          ) :

            (
              <>
                <div className="container1">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>Room Booking</h1>
                  </div>
                  {user && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} readOnly />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Roll Number</label>
                        <input type="text" className="form-control" id="rollnum" value={rollNum} readOnly />
                      </div>
                    </>
                  )}
                  <div className="mb-3">
                    <label className="form-label">Room Type</label>
                    <select className="form-control" value={roomType} onChange={handleRoomTypeChange}>
                      <option value="guestroom">Guest Room</option>
                      {isResident && <option value="ownroom">Own Room</option>}
                    </select>
                  </div>
                  <div>
                    <h3>Guest Details:</h3>
                    {guestDetails.map((guest, index) => (
                      <div key={index} className="mb-3">
                        <label className="form-label">Guest {index + 1} Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={guestDetails[index]?.name || ''}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                        <label className="form-label">Guest {index + 1} Age</label>
                        <input
                          type="text"
                          className="form-control"
                          value={guestDetails[index]?.age || ''}
                          onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                        />
                        <label className="form-label">Guest {index + 1} Gender</label>
                        <select
                          className="form-control"
                          value={guestDetails[index]?.gender || ''}
                          onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <br></br>
                        <label className="form-label">Guest {index + 1} Relation</label>
                        <input
                          type="text"
                          className="form-control"
                          value={guestDetails[index]?.relation || ''}
                          onChange={(e) => handleInputChange(index, 'relation', e.target.value)}
                        />
                        <label className="form-label">Guest {index + 1} ID Type</label>
                        <input
                          type="text"
                          className="form-control"
                          value={guestDetails[index]?.id || ''}
                          onChange={(e) => handleInputChange(index, 'id', e.target.value)}
                        />

                        <div style={{ display: 'flex', justifyContent: 'right', marginTop: '10px' }}>
                          <div>
                            {guestDetails.length - 1 === index && guestDetails.length < 12 && roomType==="guestroom"&& (
                              <button type="button" className="btn btn-secondary" onClick={handleGuestAdd}>
                                <span>Add a guest</span>
                              </button>
                            )}
                          </div>
                          <div style={{ marginLeft: '10px' }}>
                            {guestDetails.length > 1 && roomType==="guestroom"&& (
                              <button type="button" className="btn btn-secondary" onClick={() => handleGuestRemove(index)}>
                                <span>Remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='grid-container'>
                    {roomType !== 'ownroom' && (
                      <div className='grid'>
                        <ResponsiveGrid onSelectedRooms={handleSelectedRooms} />
                      </div>
                    )}
                    <div className='grid-info'></div>
                  </div>

                  <div>
                    {selectedRooms.length > 0 && (
                      <>
                        <h2>Selected Rooms:</h2>
                        {/* Display selected rooms in a single line */}
                        {Object.entries(selectedRooms).map(([index, roomDetails]) => (
                          <div key={index}>
                            <p>
                              {`${roomDetails.roomName} on ${roomDetails.dates.join(', ')} - Rs.${roomDetails.totalPrice}/-`}
                            </p>
                          </div>
                        ))}
                        {/* Display total sum */}
                        <div className="mb-3">
                          <label className="form-label">Total Amount</label>
                          <input type="text" className="form-control" id="totalsum" value={totalSum} readOnly />
                        </div>

                        {/* <h2>Total Amount:{'\t\t'} Rs.{totalSum}/-</h2> */}

                      </>
                    )}
                    {roomType === "ownroom" && (<>
                      <div className="mb-3">
                        <label className="form-label">Total Amount</label>
                        <input type="text" className="form-control" id="totalsum" value={totalSum} readOnly />
                      </div>
                    </>)}


                  </div>


                  {error && <Error message={error} />}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                      Submit
                    </button>
                  </div>
                </div>


                {/* Confirmation Modal */}
                <Modal show={showConfirmationModal} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title>Confirm Booking</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Number of Guests: {guestDetails.length}</p>

                    {/* Display selected rooms in a single line */}
                    {Object.entries(selectedRooms).map(([index, roomDetails]) => (
                      <div key={index}>
                        <p>
                          {`${roomDetails.roomName} on ${roomDetails.dates.join(', ')} - Rs.${roomDetails.totalPrice}/-`}
                        </p>
                      </div>
                    ))}

                    {/* Display total sum */}
                    {roomType === "ownroom" ? (<>
                      <p><b>Total Amount: Rs.60/-</b></p>
                    </>) : (<>
                      <p><b>Total Amount: Rs.{totalSum}/-</b></p>
                    </>)

                    }
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Back
                    </Button>
                    {/* <Button variant="primary" onClick={() => { handleClose(); }}> */}
                    {/* <Link
                    to={{
                      pathname: '/paymentGateway',
                      state: {
                        amount: totalSum, // Pass the totalSum as the amount
                        order_id: orderid.generate(), // Replace with your generated order_id
                      },
                    }}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Confirm Booking
                  </Link> */}
                    <div onClick={handleClose} >
                      <PaymentGateway amount={totalSum * 100} order_id={id} onSuccess={handlePaymentSuccess} />
                    </div>
                    {/* </Button> */}
                  </Modal.Footer>
                </Modal>
              </>
            )}
      </div>
    </div>
  );
};

export default Services;
