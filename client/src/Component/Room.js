import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import '../css/RoomStyle.css';
import { Button, Form } from 'react-bootstrap';
import Loader from "./Loader";

const Room = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    const [rooms, setRooms] = useState([]);
    // const [flag, setFlag] = useState(0);
   

    const fetchRooms = async () => {
        try {
            setloading(true);
            const rooms = await axios.get('/api/commonrooms/getallrooms');
            console.log(rooms)
            // Initialize each room with an empty roll number and student name
            // const initializedRooms = rooms.data.map(room => ({ ...room, StudentRollNumber: '', studentName: '' }));
            
            setRooms(rooms.data);
            setloading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setloading(false);
            seterror(error);
        }
    };
    useEffect(() => {

        fetchRooms();
    }, []);

    const FetchResidents = async (rollnum, roomIndex) => {
        try {
            setloading(true);
            const response = await axios.get(`/api/residents/findresident?rollnum=${rollnum}`);
            setloading(false);
    
            if (response.data && response.data.length > 0) {
                const residentData = response.data[0];
    
                setRooms(prevRooms => {
                    const updatedRooms = [...prevRooms];
                    updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], StudentRollNumber: rollnum, studentName: residentData.StudentName };
                    return updatedRooms;
                });
            } else {
                alert('No student exists with that number');
            }
        } catch (error) {
            
            console.error('Error fetching residents:', error);
            setloading(false);
            seterror(error);
        }
    };
    
    const handleLogin = async (roomIndex) => {
        try {
            const room = rooms[roomIndex];
           
            if (room.StudentRollNumber && room.studentName) {
                setloading(true);
                // Declare a new variable to hold the updated rooms
                const updatedRooms = [...rooms];
                updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], available: false, loginTime: new Date() };
                // Update the state with the new variable
                setRooms(updatedRooms);
                // console.log("room::",updatedRooms[roomIndex])
                await axios.post('/api/commonrooms/login', { room: updatedRooms[roomIndex] });

                setloading(false);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setloading(false);
            seterror(error);
        }
    };

    const handleLogout = async (roomIndex) => {
        try {

            const room = rooms[roomIndex];

            if (room.StudentRollNumber && room.studentName && room.loginTime) {
                setloading(true);

                const updatedRooms = [...rooms];
                updatedRooms[roomIndex] = { ...updatedRooms[roomIndex], logoutTime: new Date() };
                setRooms(updatedRooms);
                // Save logout time and update room availability
                await axios.post('/api/commonrooms/logout', { room: updatedRooms[roomIndex] });
                fetchRooms();
                setloading(false);
            }
        } catch (error) {
            console.error('Error logging out:', error);
            setloading(false);
            seterror(error);
        }
    };

    return (
        <div className={`mainSection ${user && user.data.isAdmin ? 'one' : 'two'}`}>
            {loading?<Loader/>:(
                <>
                <div className="contentBox">
                {rooms.map((room, index) => (
                    <div key={index} className="bs">
                        <div className="box" style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center" }}>
                            <div className="boxtext">
                                <h2>{room.name}</h2>
                            </div>
                            <div className="showbutton">
                                <NavLink className={`showbtn ${room.available ? 'greenBtn' : 'redBtn'}`}>
                                    {room.available ? 'Available' : 'Registered'}
                                </NavLink>
                            </div>
                        </div>
                        {user && user.data.isAdmin && (
                            <div className="box" style={{ display: "flex", whiteSpace: "nowrap", alignItems: "center" }}>
                                <div className="show">
                                    <Form.Group className="mb-3" controlId={`StudentRollNumber-${index}`} style={{ padding: "0.1em 0.1em" }}>
                                        <Form.Label>Student Roll number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="enter rollnumber"
                                            value={room.StudentRollNumber}
                                            onChange={(e) => setRooms(prevRooms => {
                                                const updatedRooms = [...prevRooms];
                                                updatedRooms[index] = { ...updatedRooms[index], StudentRollNumber: e.target.value };
                                                return updatedRooms;
                                            })}
                                            onKeyDown={(e) => e.key === 'Enter' && FetchResidents(e.target.value, index)}
                                            readOnly={!room.available}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="show">
                                    <Form.Group className="mb-3" controlId={`studentname-${index}`} style={{ padding: "0.1em 0.1em", margin: "0" }}>
                                        <Form.Label>Student Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="student name"
                                            value={room.studentName}
                                            readOnly
                                        />
                                    </Form.Group>
                                </div>
                                <div className="show show-btn">
                                    {room.available ? (
                                        <Button className="btn-show" variant="primary" type="button" onClick={() => handleLogin(index)} style={{ height: "calc(1.5em + .75rem)" }}>
                                            Login
                                        </Button>
                                    ) : (
                                        <Button variant="primary" className=" btn-show" type="button" onClick={() => handleLogout(index)} style={{ height: "calc(1.5em + .75rem)" }}>
                                            Logout
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
                </>

            )}
            
        </div>
    );
};

export default Room;
