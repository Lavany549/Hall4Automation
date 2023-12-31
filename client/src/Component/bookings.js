import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Error from './Error';
import '../css/bookingsStyle.css';
import Dropdown from 'react-bootstrap/Dropdown';

const Bookings = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userBookings, setUserBookings] = useState({});






    return (
        // <div>
        //     {loading ? (
        //         <Loader />
        //     ) : userBookings && userBookings.length > 0 ? (


        //         userBookings.map((booking) => (
        //             <div key={booking._id}>
        //                 {/* Render individual booking information here */}
        //                 <p>{booking._id}</p>
        //             </div>
        //         ))
        //     ) : userBookings && userBookings.length === 0 ? (
        //         <p>No bookings yet.</p>
        //     ) : ( error &&
        //         <p>Error fetching user bookings.</p>
        //     )}

        // </div>
        <>
            <div className="ml-3 mt-3">
                <Tabs>
                    <TabList>
                        <Tab label="profile"><h2>Profile</h2></Tab>
                        <Tab label="Bookings"><h2>Bookings</h2></Tab>
                    </TabList>

                    <TabPanel>
                        <>
                            <div className="container">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={user.data.name} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Roll number</label>
                                    <input type="text" className="form-control" id="rollnum" value={user.data.rollnum} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">IIT MailID</label>
                                    <input type="text" className="form-control" id="mail" value={user.data.email} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Is Hall4 Resident?</label>
                                    <input type="text" className="form-control" id="mail" value={user.data.isResident ? "Yes" : "No"} readOnly />
                                </div>


                            </div>
                        </>
                    </TabPanel>
                    <TabPanel>
                        <FetchUserBookings />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );


}
export default Bookings;


export function FetchUserBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [userBookings, setUserBookings] = useState({});
    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                setLoading(true);
                const userId = user.data._id;
                const response = await axios.get(`/api/bookings/getuserbookings?userId=${userId}`);
                setUserBookings(response.data);
                setLoading(false);
                // console.log('Response Data:', response.data);
            } catch (error) {
                setLoading(false);
                console.error(':', error);
                setError({ message: 'Error fetching user bookings' });
            }
        };

        fetchUserBookings();
    }, [user.data._id]);


    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-6">
                        {loading ? (
                            <Loader />
                        ) : userBookings ? (
                            userBookings.length > 0 ? (
                                userBookings.map((booking, index) => (
                                    <div className="booking-container bs" key={index}>
                                        <h3>Booking {index + 1}</h3>
                                        <p><b>Booking ID:</b> {booking._id}</p>


                                        <p><b>Room Type:</b> {booking.roomType}</p>
                                        <p><b>Number of Guests:</b> {booking.numOfGuests}</p>

                                        <Dropdown className="dropdown-container">
                                            <Dropdown.Toggle variant="success" id="guest-details-dropdown" className="dropdown-header">
                                                Guest Details
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="dropdown-menu">
                                                {booking.guestDetails.map((guest, guestIndex) => (
                                                    <div key={guestIndex}>
                                                        <Dropdown.Item className="dropdown-item">
                                                            <p>
                                                                <b>Name:</b> {guest.name} &nbsp;
                                                                <b>Age:</b> {guest.age} &nbsp;
                                                                <b>Relation:</b> {guest.relation} &nbsp;
                                                                <b>ID:</b> {guest.id}
                                                            </p>
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                    </div>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <Dropdown className="dropdown-container">
                                            <Dropdown.Toggle variant="success" id="selected-rooms-dropdown" className="dropdown-header">
                                                Selected Rooms
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {booking.selectedRooms.map((room, roomIndex) => (
                                                    <div key={roomIndex}>
                                                        <Dropdown.Item className="dropdown-item">
                                                            <p>
                                                                <b>Room Name:</b> {room.roomName} &nbsp;
                                                                <b>Dates:</b> {room.dates.join(', ')}
                                                            </p>
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                    </div>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        <p><b>Amount:</b> {booking.amount}</p>
                                        <p>
                                            <b>Payment Status: </b>
                                            <span className={booking.status === 'success' ? 'success-status' : 'failed-status'}>
                                                {booking.status}
                                            </span>
                                        </p>

                                        <p><b>Payment ID:</b> {booking.paymentId}</p>
                                        <p><b>Order ID:</b> {booking.orderId}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No bookings yet.</p>
                            )

                        ) : (

                            <Error message='Error fetching user bookings' />
                        )}


                    </div>

                </div>
            </div>
        </>
    )

};

