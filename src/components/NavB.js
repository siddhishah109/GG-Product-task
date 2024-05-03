import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
const NavB = ({ onSearch }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.searchTerm.value;
        console.log("---------",event.target.elements.searchTerm.value)
        onSearch(searchTerm);
      };
  return (
    <Navbar  className=" bg-body-tertiary justify-content-between">
    <div className='navbar'> 
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Products</Nav.Link>
          </Nav>
        </div>
    <Form inline onSubmit={handleSearch}>
      <Row>
        <Col xs="auto search">
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            name="searchTerm"
          />
        </Col>
        <Col xs="auto sub">
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  </Navbar>
  )
}

export default NavB