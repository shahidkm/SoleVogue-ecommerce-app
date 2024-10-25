// HomePage.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, Button, Navbar, Nav, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ShoeContext } from './ContextPage'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

function HomePage() {
  const user = localStorage.getItem("Username");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [declareitem, setDeclareItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { addToCart, cart,currentUser } = useContext(ShoeContext); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3008/item");
        setData(response.data);
      } catch (error) {
        setError('Error in getting data');
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const submit = (item) => {
    if (!user) {
      toast.error("Please login to purchase."); // Using toast for feedback
    } else {
      addToCart(item); // Updated function name
      toast.success(`${item.name} added to cart!`); // Success toast
    }
  };

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

  return (
    <div>
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Navbar */}
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

      {/* Banner Image */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <img
          src="https://cdn.pixelbin.io/v2/black-bread-289bfa/-6ZJSm/t.resize(w:1600)/clarks-banner/1711955372Clarks-April-eComm-banner---Internal_1440-x-480_web.webp?compress=true&q=70"
          className="img-fluid"
          alt="Collection"
          style={{ width: '98%', height: "500px", border: '2px solid white' }}
        />
      </div>

      {/* Collections Header */}
      <h1 className="text-center mt-4"><b>COLLECTIONS</b></h1>

      {/* Collection Categories */}
      <div style={{ width: "100%", height: "100px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.P6aOnV9MYWBKM_mnK6KtYAAAAA&pid=Api&P=0&h=180"
          alt="Men"
          style={{ cursor: 'pointer', margin: '0 20px', height: '80px', width: 'auto', borderRadius: "50%" }}
          onClick={() => setDeclareItem("men")}
        />
        <img
          src="https://tse4.mm.bing.net/th?id=OIP.OA4NI64f0RtS5yCWLE7IWwHaHa&pid=Api&P=0&h=180"
          alt="Women"
          style={{ cursor: 'pointer', margin: '0 20px', height: '80px', width: 'auto', borderRadius: "50%" }}
          onClick={() => setDeclareItem("women")}
        />
      </div>

      {/* Search Bar */}
      <div style={{ width: "100%", height: '50px', display: 'flex', justifyContent: 'center', backgroundColor: "rgba(255, 255, 255, 0.8)", marginBottom: "30px", marginTop: "15px" }}>
        <div className="d-flex me-3" style={{ height: "30px", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Search items by name..."
            className="form-control me-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
        </div>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* Items Display */}
      <div className="row">
        {data
          .filter((item) =>
            (declareitem === "women" ? item.type === "women" :
              declareitem === "men" ? item.type === "men" : true) &&
            item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Added check for item.name
          )
          .map((item) => (
            <div className="col-md-3 col-sm-6 mb-4 d-flex justify-content-center" key={item.id}>
              <Card
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                style={{
                  transition: 'transform 0.2s',
                  width: "250px",
                  height: "350px",
                  borderRadius: "10px",
                  boxShadow: '0 4px 8px #3e4d3a',
                  color: "#3e4d3a",
                  cursor: 'pointer',
                }}
              >
                {item.image && (
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ height: "180px", borderTopLeftRadius: '10px', borderTopRightRadius: '10px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: '16px', color: '#3e4d3a', textAlign: 'center' }}>
                    {item.name}
                  </Card.Title>
                  <Card.Text style={{ fontSize: '14px', color: 'black', textAlign: 'center' }}>
                    Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                    <br />
                    Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Card.Text>
                  <div className="mt-auto">
                    <Button
                      className="btn-primary"
                      style={{
                        fontSize: '14px',
                        width: '100%',
                        background: "#3e4d3a",
                        border: 'none',
                        borderRadius: '5px',
                        transition: 'background-color 0.2s',
                      }}
                      onClick={() => submit(item)} // Corrected to use a function
                    >
                      Add To Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#3e4d3a', padding: '20px 0' }}>
        <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', color: 'white' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {/* Add your logo image source in the src attribute */}
            <img src="" alt="SOLEVOGUE Logo" style={{ maxWidth: '150px', height: 'auto', marginRight: '20px' }} />
            <div>
              <h5 style={{ margin: 0 }}>Follow Us</h5>
              <p style={{ margin: '5px 0' }}>Stay connected with SOLEVOGUE on social media!</p>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <p style={{ margin: 0 }}>© 2024 SOLEVOGUE. All Rights Reserved.</p>
            <p style={{ margin: '5px 0' }}>Online shoe purchasing made easy and reliable.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
