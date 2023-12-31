import React, { useState } from "react";
import logo from '../images/logo.png';
import { Link, useLocation } from "react-router-dom";
import { FaUser } from 'react-icons/fa';
import '../css/ListStyle.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

const List = () => {
    const currentLocation = useLocation();
    const user = JSON.parse(localStorage.getItem('currentUser'));


    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/'
    }

    return (
        <>
            <header>
                <div className="container container-flex ">
                    <div className="logoContainer">
                        <Link to='/'>
                            <img src={logo} alt="logo" className="logo" />
                        </Link>
                    </div>
                    <nav>
                        <div className="list">
                            <Link to="/" className={`listItem ${currentLocation.pathname === '/' ? 'activeItem' : ''}`}>
                                Home
                            </Link>
                            <Link to="/about" className={`listItem ${currentLocation.pathname === '/about' ? 'activeItem' : ''}`}>
                                About
                            </Link>

                            <Link to="/services" className={`listItem ${currentLocation.pathname === '/services' ? 'activeItem' : ''}`}>
                                Services
                            </Link>

                            <Link to="/contact" className={`listItem ${currentLocation.pathname === '/contact' ? 'activeItem' : ''}`}>
                                Contact
                            </Link>
                            <Link to="/room" className={`listItem ${currentLocation.pathname === '/room' ? 'activeItem' : ''}`}>
                                Rooms
                            </Link>
                        </div>
                    </nav>
                    <div className="icons">
                        {user ? (
                            <Dropdown
                                as={ButtonGroup}
                                align={{ lg: 'start' }}


                            >
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    <FaUser /> {'\t'}{user.data.name}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Link to="/bookings" className="dropdown-item">Bookings</Link>
                                    <Link className="dropdown-item" onClick={logout}>Logout</Link>
                                    <Dropdown.Divider style={{ color: 'black', fontWeight: 'bold' }} />
                                    <Dropdown.Item eventKey="4">Fine : {0}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link to="/login">
                                <FaUser className="icon" />
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default List;
