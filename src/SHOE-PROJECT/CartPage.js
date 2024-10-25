import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ShoeContext } from './ContextPage';
import { Card, Button, Modal, Form ,Nav,Navbar,Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const CartPage = () => {
  const { cart, clearCartItems, submitOrder, removeFromCart, currentUser } = useContext(ShoeContext);
  const [showModal, setShowModal] = useState(false);
  const user = localStorage.getItem("Username");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleLogout = () => {
    // Implement logout functionality if needed
    localStorage.removeItem('Username');
    setShowModal(false);
    navigate("/loginpage");
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/loginpage");
  };

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const totalPrice = cart.reduce((accu, item) => accu + item.price * (item.quantity || 1), 0);

  const handleShow = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setErrors({});
    setName('');
    setAddress('');
    setMobile('');
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const gotoOrder =  () => {
    if (!validateForm()) return;

    const order = {
      user: {
        name,
        address,
        mobile,
      },
      items: cart,
      totalPrice: totalPrice,
      orderDate: new Date().toISOString(),}
    ;



    
       submitOrder(order);

      clearCartItems();
      handleClose();
      toast.success('Order submitted successfully!');
      
      navigate('/orderpage');
  
  };

  return (
    <div>
     <Navbar bg="light" expand="lg" style={{ boxShadow: '0 4px 8px #3e4d3a' }}>
        <Container>
          <Navbar.Brand style={{ fontWeight: 'bold' }}>SOLEVOGUE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link onClick={() => navigate("about")} style={{ fontSize: '16px', marginRight: "20px" }}>
                <b>ABOUT</b>
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/orderpage")} style={{ fontSize: '16px', marginRight: "20px" }}>
                <b>ORDERS</b>
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  if (!user) {
                    navigate("/loginpage");
                  } else {
                    navigate("cartpage");
                  }
                }}
                style={{ position: 'relative' }}
              >
                <i className="bi bi-cart" style={{ fontSize: '20px' }}></i>
                {/* Cart badge */}
                {cart.length > 0 && (
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
                    {cart.length}
                  </div>
                )}
              </Nav.Link>

              <div
                className="d-flex flex-column align-items-center"
                style={{ cursor: 'pointer', marginLeft: "30px" }}
                onClick={handleShowModal}
              >
                <i className="bi bi-person-fill" style={{ fontSize: '24px' }}></i>
                <span style={{ fontSize: '14px' }}>{user || "Guest"}</span>
              </div>

              {/* Modal for Profile Settings */}
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

      <ToastContainer />

      <div className="card text-center mt-4">
        <div className="card-body">
          <h5 className="card-title">Total Price</h5>
          <p className="card-text">${totalPrice.toFixed(2)}</p>
          <Button variant="primary" onClick={handleShow}>
            SUBMIT ORDER
          </Button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          {cart.map((item) => (
            <div className="col-md-4 col-sm-6 mb-4" key={item.id}>
              <Card style={{ transition: 'transform 0.2s', height: '100%' }}>
                {item.image && (
                  <Card.Img variant="top" src={item.image} alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: '18px', color: '#333' }}>{item.name}</Card.Title>
                  <Card.Text style={{ fontSize: '14px', color: '#666' }}>
                    Price: ${item.price} <br />
                    Quantity: {item.quantity} <br />
                    Type: {item.type}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="col-12 text-center">
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit your order?</p>
          <p>
            <strong>Total Amount:</strong> ${totalPrice.toFixed(2)}
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your address"
                value={address}
                onChange={handleAddressChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={handleMobileChange}
                isInvalid={!!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={gotoOrder} >
            CONFIRM
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartPage;
