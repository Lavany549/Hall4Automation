// Person.js
import React from "react";
import '../css/contactStyle.css';
import { Card, Image } from "react-bootstrap";

const Person = ({ title, name, email, phone, imageSrc }) => {
  return (
    <Card className="person-card">
      <Image src={imageSrc} alt={name} style={{"width":"300px","height":"400px"}} rounded />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Person;

