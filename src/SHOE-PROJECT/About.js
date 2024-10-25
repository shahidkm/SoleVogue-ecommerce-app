import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from "./Style.css"
import { ShoeContext } from './ContextPage';
import {  Button, Navbar, Nav, Container, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
function About() {
    let navigate=useNavigate()
    let user = localStorage.getItem("Username");
    let { cart} = useContext(ShoeContext);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleLogout = () => {
      localStorage.removeItem('Username');
      setShowModal(false);
      navigate("/loginpage");
    };
  
    const handleLoginRedirect = () => {
      setShowModal(false);
      navigate("/loginpage");
    };
  
  return (
    <div>
       <Navbar bg="light" expand="lg">
  <Container style={{ boxShadow: '0 4px 8px #3e4d3a' }}>
    <Navbar.Brand>
      <b  onClick={()=>navigate("/")}>SOLEVOGUE</b>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto d-flex align-items-center">
       
        <Nav.Link onClick={() => navigate("/")} style={{ fontSize: '16px',marginRight:"20px" }}>
          <b>HOME</b>
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/orderpage")} style={{ fontSize: '16px',marginRight:"20px" }}>
          <b>ORDERS</b>
        </Nav.Link>
        <Nav.Link onClick={() =>{
          
          if(!user){
            navigate("/loginpage")
          }
          else{
            navigate("/cartpage")
          }
          
          
         }} style={{ position: 'relative' }}>
          <i className="bi bi-cart" style={{ fontSize: '20px' }}></i>
          {/* Cart badge */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
            border: '2px solid white',
            
          }}>
            {cart.length }
          </div>
        </Nav.Link>

        <div className="d-flex flex-column align-items-center" style={{ cursor: 'pointer' ,marginLeft:"30px"}} onClick={handleShowModal}>
          <i className="bi bi-person-fill" style={{ fontSize: '24px' }}></i>
          <span style={{ fontSize: '14px'}}>{user || "Guest"}</span>
        </div>
{/* 
        {user && (
          <div className="d-lg-none">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic" className="d-flex align-items-center"></Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )} */}

        <Modal show={showModal} onHide={handleCloseModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Profile Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Welcome, {user || "Guest"}!</h5>
            <p>{user ? "Manage your profile, preferences, and logout options." : "Please log in to access your profile."}</p>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            {!user && (
              <Button variant="primary" className="ms-2" onClick={handleLoginRedirect}>Login</Button>
            )}
            {user && (
              <Button variant="danger" className="ms-2" onClick={handleLogout}>Logout</Button>
            )}
          </Modal.Body>
        </Modal>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"Londrina Sketch, sans-serif",marginTop:"10px"}}>

        <h1><b>#SOLEVOGUE</b></h1>
        

        </div>
    
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-4-1024x445.jpg"
          className="img-fluid"
          alt="Collection"
          style={{ width: '90%', borderRadius: '10px', border: '2px solid #3e4d3a' ,  boxShadow: '0 4px 8px #3e4d3a' }}
        />
      </div>
    
    <div style={{display:"flex",justifyContent:"end",marginRight:"60px",fontFamily:"Qwitcher Grypen, cursive"}}>

<h2><b>Browse through our extensive collection of shoes,<br/>
     from trendy sneakers to classic formal wear,<br/> and find the perfect pair to match your style</b></h2>


</div>
















<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-2.jpg"
          className="img-fluid"
          alt="Collection"
          style={{ width: '90%', borderRadius: '10px', border: '2px solid #3e4d3a',  boxShadow: '0 4px 8px #3e4d3a'  }}
        />
      </div>
    
    <div style={{display:"flex",justifyContent:"center",fontFamily:"Qwitcher Grypen, cursive"}}>

<h2><b>Discover the latest footwear trends <br/>and exclusive discounts on our website,<br/> 
where quality meets affordability in every pair</b></h2>

</div>










<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <img
          src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-lookbook-cover-image-3.jpg"
          className="img-fluid"
          alt="Collection"
          style={{ width: '90%', borderRadius: '10px', border: '2px solid #3e4d3a',  boxShadow: '0 4px 8px #3e4d3a' }}
        />
      </div>
    
    <div style={{display:"flex",justifyContent:"start",marginLeft:"50px",fontFamily:"Qwitcher Grypen, cursive",marginBottom:"20px"}}>

<h2><b>Enjoy the convenience of shopping <br/> for shoes from the comfort of your home with our user-friendly website,<br/> featuring detailed product descriptions and customer reviews</b></h2>

</div>

<div className="container-fluid d-flex align-items-center justify-content-center" style={{ width: '100%', height: '50px', marginTop: '20px', backgroundColor: '#3e4d3a', color: '#fff',boxShadow: '0 -2px 5px rgba(0,0,0,0.3)' }}>
        <p className="text-center mb-0">
          &copy; 2024 SOLEVOGUE. All Rights Reserved. Online shoe purchasing made easy and reliable.
        </p>
      </div>


    </div>
  )
}

export default About