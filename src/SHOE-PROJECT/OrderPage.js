import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function OrdersPage() {
  let navigate = useNavigate();
  const [data, setData] = useState(null);
  const username = localStorage.getItem("Username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/users?Username=${username}`);
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [username]);

  if (!data || !data.orders) {
    return <div style={{ textAlign: 'center', fontSize: '20px', marginTop: '50px' }}>Loading order details...</div>;
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container style={{ boxShadow: '0 4px 8px #3e4d3a', position: "sticky" }}>
          <Navbar.Brand><b onClick={() => navigate("/")}>SOLEVOGUE</b></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/")}><b>HOME</b></Nav.Link>
              <Nav.Link onClick={() => navigate("/about")}><b>ABOUT</b></Nav.Link>
              <Nav.Link onClick={() => navigate("/cartpage")}><b>CART</b></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}><b>ORDERS</b></h1>
        {data.orders.map((order, index) => (
          <div key={index} className="order-card" style={{ border: '1px solid #ccc', padding: '20px', color: "white", margin: '20px 0', borderRadius: '8px', backgroundColor: "#3e4d3a" }}>
            <h2><b>Shipping Details</b></h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Address:</strong> {order.user.address}</p>
            <p><strong>Mobile:</strong> {order.user.mobile}</p>
            <h2><b>Items</b></h2>
            {order.items.map((item) => (
              <div key={item.id} className="item-card" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px', borderRadius: "20px" }}
                />
                <div>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Type:</strong> {item.type}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </div>
              </div>
            ))}
            <h2>Order Summary</h2>
            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
