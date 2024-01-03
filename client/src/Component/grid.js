
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Error from './Error';
import Success from './Success';
import '../css/gridStyle.css'
const ResponsiveGrid = ({ onSelectedRooms }) => {

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const [isResident, setIsResident] = useState(user ? user.data.isResident : '');
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()


  const [rooms, setRooms] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // Assuming a week has 7 days


  const [selectedRooms, setSelectedRooms] = useState([]);
  const [formattedSelectedRooms, setFormattedSelectedRooms] = useState({});

  const days = [...Array(7).keys()].map((index) => {
    const day = new Date(startDate);
    day.setDate(day.getDate() + index);
    const formattedDate = day.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
    return formattedDate;
  });

  const handleCellClick = (row, col) => {
    // Only allow selection for grey cells
    if (col !== 0 && !rooms[row - 1]?.currentBookings?.some(booking => booking.date === days[col - 1])) {
      const selectedRoom = rooms[row - 1]?.name;
      const selectedDate = days[col - 1];
      const newSelection = { room: selectedRoom, date: selectedDate };

      // Check if the cell is already selected, if yes, remove it; if no, add it
      const isSelected = selectedRooms.some(
        (cell) => cell.room === rooms[row - 1]?.name && cell.date === days[col - 1]
      );

      if (isSelected) {

        setSelectedRooms((prevSelection) =>
          prevSelection.filter(
            (cell) => !(cell.room === selectedRoom && cell.date === selectedDate)
          )
        );

      } else {
        setSelectedRooms((prevSelection) => [...prevSelection, newSelection]);

      }

    }
  };



  // console.log(rooms)
  // console.log(formattedSelectedRooms)

  useEffect(() => {
    // Fetch rooms and bookings data from the server
    const fetchRooms = async () => {
      try {
        setloading(true)
        const rooms = await axios.get('/api/rooms/getallrooms'); // Replace with your API endpoint
        // const rooms = await Room.find().sort({ fieldName: 1 });
        setRooms(rooms.data);
        setloading(false)

      } catch (error) {
        console.error('Error fetching rooms:', error);

        setloading(false);
        seterror(true);
      }
    };

    fetchRooms();
  }, []);

  //callback function to services.js
  useEffect(() => {
    // Map selectedRooms into the desired format
    const formattedData = selectedRooms.reduce((acc, cell) => {
      const { room, date } = cell;
      if (acc[room]) {
        acc[room].push(date);
      } else {
        acc[room] = [date];
      }
      return acc;
    }, {});

    // Set the formatted data
    setFormattedSelectedRooms(formattedData);
  }, [selectedRooms]);

  useEffect(() => {
    // Callback to services.js with the original selectedRooms
    // Filter out unnecessary rooms and calculate the total price and dates booked for each room
    const selectedRoomsData = rooms
      .filter((room) => formattedSelectedRooms[room.name])
      .map((room) => {
        const roomName = room.name;
        const isResidentPrice = isResident ? room.rentPerDay1 : room.rentPerDay2;
        const dates = formattedSelectedRooms[roomName];
        const totalPrice = dates.length * isResidentPrice;
  
        return {
          roomName,
          totalPrice,
          dates,
        };
      });
  
    onSelectedRooms(selectedRoomsData);
  }, [formattedSelectedRooms, rooms, isResident]);
  




  const generateGrid = () => {
    const grid = [];

    // Loop for 7 rows
    for (let row = 0; row < 7; row++) {
      const rowColumns = [];

      // Loop for 8 columns
      if (row === 0) {
        rowColumns.push(
          <div className="col-sm customColumn">
            Cost/Day
          </div>
        );
        for (let col = 1; col < 8; col++) {

          rowColumns.push(
            <div key={col} className="col-sm customColumn">

              {days[col - 1]}
            </div>
          );
        }
      }
      else {
        for (let col = 0; col < 8; col++) {
          if (col === 0) {


            rowColumns.push(
              <div className="col-sm customColumn" style={{ whiteSpace: 'wrap', textAlign: 'left' }}>
                {isResident
                  ? `${rooms[row - 1]?.name}  Rs.${rooms[row - 1]?.rentPerDay1}/-`
                  : `${rooms[row - 1]?.name}  Rs.${rooms[row - 1]?.rentPerDay2}/-`}
              </div>
            );




          }
          else {
            const currentDate = days[col - 1];
            const roomId = rooms[row - 1]?._id;
            const isBooked = rooms[row - 1]?.currentBookings?.some(booking => booking.date === currentDate);


            // const bgColor = isBooked ? ' #fa253b' : '#C0C0C0';

            const isSelectable = col !== 0 && !isBooked;
            const isSelected = selectedRooms.some(
              (cell) => cell.room === rooms[row - 1]?.name && cell.date === days[col - 1]
            );

            rowColumns.push(
              <div
                key={col}
                className={`col-sm customColumn1 ${isSelected ? 'selected' : ''}  ${isBooked ? 'booked' : 'not-booked'}`}
                style={{
                  cursor: isSelectable ? 'pointer' : 'not-allowed',
                }}
                onClick={() => isSelectable && handleCellClick(row, col)}
              >
                {isSelected ? 'S' : isBooked ? 'B' : 'A'}
              </div>
            );


          }

        }
      }


      grid.push(
        <div key={row} className="row">
          {rowColumns}
        </div>
      );
    }
    grid.push(
      <div className="col-sm customColumn" style={{ whiteSpace: 'pre' }}>
        <p>
          <span style={{ color: '#C0C0C0' }}>Available(A)</span>
          {'\t\t'}
          <span style={{ color: '#fa253b' }}>Booked(B)</span>
          {'\t\t'}
          <span style={{ color: '#17f16e' }}>Selected(S)</span>
        </p>
      </div>


    );

    return grid;
  };
  return (
    <>
      <div className="container1">
        {rooms.length>0 && generateGrid()}
      </div>

    </>
  );
}
export default ResponsiveGrid; 
