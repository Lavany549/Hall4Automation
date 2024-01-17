import React from "react";
import Person from "./Person";
import '../css/contactStyle.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import sneha from '../images/sneha.png';
import priyanka from '../images/priyanka.jpg';
import prakashani from '../images/prakashani.jpg';
import mandvi from '../images/mandvi.jpg';
import ritu from '../images/ritu.jpg';
import nupur from '../images/nupur.jpg';
import personImage from '../images/person.png';

const Contact = () => {
  // Sample data for people
  const people1 = [
    {
      id: 1,
      title: "President",
      name: "Sneha Mandal",
      email: "msneha20@iitk.ac.in",
      phone: "7003417218",
      imageSrc: sneha
    },
    {
      id: 2,
      title: "Mess Secretary",
      name: "Priyanka Saha",
      email: "priyankas21@iitk.ac.in",
      phone: "7278747895",
      imageSrc: priyanka
    },
    {
      id: 3,
      title: "Maintenance Secretary",
      name: "Prakashani Singh",
      email: "singhp20@iitk.ac.in",
      phone: "9956488690",
      imageSrc: prakashani
    },
  ];

  const people2 = [
    {
      id: 4,
      title: "Canteen Secretary",
      name: "Mandvi Singh",
      email: "mstomar@iitk.ac.in",
      phone: "9711193984",
      imageSrc: mandvi
    },
    {
      id: 5,
      title: "Gardening Secretary",
      name: "Ritu Kumari Jaiswal",
      email: "ritujais@iitk.ac.in",
      phone: "7602748044",
      imageSrc: ritu
    },
    {
      id: 6,
      title: "Reading Room Secretary",
      name: "Shatroopa Saxena",
      email: "ssaxena@iitk.ac.in",
      phone: "6394572663",
      imageSrc: personImage
    }
  ];

  const people3 = [
    {
      id: 7,
      title: "Accounts and Computer Room Secretary",
      name: "Nupur Saxena",
      email: "nupurs@iitk.ac.in",
      phone: "9643394508",
      imageSrc: nupur
    },
    {
      id: 8,
      title: "Sports Secretary",
      name: "Kanchan Awasthi",
      email: "kanchana20@iitk.ac.in",
      phone: "6392249277",
      imageSrc: personImage
    },
    {
      id: 9,
      title: "Cultural Secretary",
      name: "Pragati",
      email: "pragatia@iitk.ac.in",
      phone: "9170461471",
      imageSrc: personImage
    }
  ];

  return (
    <>
      <Container>
        <Row className="mb-4">
          {people1.map((person) => (
            <Col key={person.id} xs={6} md={4}>
              <Person {...person} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row className="mb-4">
          {people2.map((person) => (
            <Col key={person.id} xs={6} md={4}>
              <Person {...person} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container>
        <Row className="mb-4">
          {people3.map((person) => (
            <Col key={person.id} xs={6} md={4}>
              <Person {...person} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Contact;
