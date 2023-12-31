import React from 'react';
import { Routes,Route } from "react-router-dom";
import Home from './Component/Home';
import About from './Component/About';
import Services from './Component/Services';
import Contact from './Component/Contact';
import Room from './Component/Room';
import Error from './Component/Error';
import List from './Component/List';
import Footer from './Component/Footer';
import Login from './Component/login';
import Loader from './Component/Loader';
import Register from './Component/register';
import ResponsiveGrid from './Component/grid';
import Bookings from './Component/bookings';
import PaymentGateway from './Component/paymentGateway';
import Axios from "axios";

Axios.defaults.baseURL = "https://hall4.onrender.com";
const App=()=> {
  return (
    
    <>
    <List/>
    <div className="mainContainer">
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/services" element={<Services />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/room" element={<Room />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/loader" element={<Loader />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/ResponsiveGrid" element={<ResponsiveGrid/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
      <Route path="/paymentGateway" element={<PaymentGateway/>}/>
      <Route component={Error}/>
    </Routes>
    </div>
    <Footer/>
   
    </>
  );
}

export default App;
