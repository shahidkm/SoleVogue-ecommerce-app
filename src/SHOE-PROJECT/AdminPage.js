import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, Button, Modal, Navbar, Container } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

function AdminPage() {
  const [activeComp, setActiveComp] = useState("dashboard");

  return (
    <div>
      <Navbar bg="light" expand="lg" style={{ zIndex: 1000, position: "fixed", width: "100%" }}>
        <Container>
          <h1><b>ADMIN PANEL</b></h1>
        </Container>
      </Navbar>

      <div style={{ display: "flex" }}>
        <div style={{ width: "200px", backgroundColor: "#3e4d3a", height: "100vh", position: "fixed", left: 0, top: 0, bottom: 0,boxShadow: '3px  4px 4px #3e4d3a' }}>
          <div style={{ marginTop: "100px" }}>
          <button onClick={() => setActiveComp("dashboard")} style={{ border: "none", width: "100%", marginBottom: "40px", backgroundColor: "#f7f6ea", color: "black",transition:"transform 0.3s",     boxShadow: '0 4px 8px #f7f6ea',   cursor: 'pointer' }}>
              <h6><b>DASHBOARD</b></h6>
            </button>
            <button onClick={() => setActiveComp("itemdetails")} style={{ border: "none", width: "100%", marginBottom: "40px", backgroundColor: "#f7f6ea", color: "black",transition:"transform 0.3s",     boxShadow: '0 4px 8px #f7f6ea',   cursor: 'pointer'}}>
              <h6><b>ITEMS DETAILS</b></h6>
            </button>
            <button onClick={() => setActiveComp("userdetails")} style={{ border: "none", width: "100%", backgroundColor: "#f7f6ea", color: "black",transition:"transform 0.3s",     boxShadow: '0 4px 8px #f7f6ea',   cursor: 'pointer' }}>
              <h6><b>USERS DETAILS</b></h6>
            </button>
          </div>
        </div>

        <div style={{ marginLeft: "200px", flex: 1, padding: "20px" }}>
          {activeComp === "itemdetails" && <ItemDetails />}
          {activeComp === "userdetails" && <UserDetails />}
          {activeComp === "dashboard" && <Dashboard/>}
        </div>
      </div>
    </div>
  );
}




function Dashboard(){
    const [datas, setDatas] = useState([]); // State for items
    const [users, setUsers] = useState([]); // State for users
    const [totalAmount, setTotalAmount] = useState(0);
let nonactiveusers=users.filter((user)=>user.Active===false)
let activeusers=users.filter((user)=>user.Active===true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3008/item");
                setDatas(response.data); // Set items data
            } catch (error) {
                console.error("Error fetching items data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3008/users");
                setUsers(response.data); // Set users data
            } catch (error) {
                console.error("Error fetching users data:", error);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        // Calculate total amount whenever users data changes
        const total = users.reduce((accumulator, user) => {
          // Check if the user has orders
          if (user.orders && user.orders.length > 0) {
            // Sum up the totalPrice of each order
            const userTotal = user.orders.reduce((sum, order) => sum + order.totalPrice, 0);
            return accumulator + userTotal; // Accumulate total price
          }
          return accumulator; // If no orders, return the current accumulator
        }, 0);
    
        setTotalAmount(total); // Update the total amount state
      }, [users]);







    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    const data = {
        labels: ['JUNE', 'JULY', 'AUGEST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER'],
        datasets: [
          {
            label: 'Sales',
            data: [0, 59, 80, 81, 56, 0],
            fill: false,
            backgroundColor: '#4e73df',
            borderColor: '#4e73df',
          },
        ],
      };
    
      // Chart options
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales Data',
          },
        },
      }
return(
    <div style={{paddingTop:"60px"}}>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", paddingTop: "30px" }}>
        <div style={{ width: "150px", height: "100px", backgroundColor: " #008080", boxShadow: '0 -2px 5px  #DDDBCB',
                    zIndex: '1000', borderRadius: "10px", textAlign: 'center' }}>
                    <h5 style={{ marginTop: "10px" }}><b>REVENUE</b></h5>
                    <p>${totalAmount}</p> {/* Display total users */}
                </div>
                <div style={{ width: "150px", height: "100px", backgroundColor: " #008080", boxShadow: '0 -2px 5px  #DDDBCB',
                    zIndex: '1000', borderRadius: "10px", textAlign: 'center' }}>
                    <h5 style={{ marginTop: "20px" }}><b>TOTAL ITEMS</b></h5>
                    <p>{datas.length}</p> {/* Display total items */}
                </div>

                <div style={{ width: "150px", height: "100px", backgroundColor: " #008080", boxShadow: '0 -2px 5px  #DDDBCB',
                    zIndex: '1000', borderRadius: "10px", textAlign: 'center' }}>
                    <h5 style={{ marginTop: "20px" }}><b>TOTAL USERS</b></h5>
                    <p>{users.length}</p> {/* Display total users */}
                </div>
                <div style={{ width: "150px", height: "100px", backgroundColor: " #008080", boxShadow: '0 -2px 5px  #DDDBCB',
                    zIndex: '1000', borderRadius: "10px", textAlign: 'center' }}>
                    <h5 style={{ marginTop: "10px" }}><b>NONACTIVE USERS</b></h5>
                    <p>{nonactiveusers.length}</p> {/* Display total users */}
                </div>
                <div style={{ width: "150px", height: "100px", backgroundColor: " #008080", boxShadow: '0 -2px 5px  #DDDBCB',
                    zIndex: '1000', borderRadius: "10px", textAlign: 'center' }}>
                    <h5 style={{ marginTop: "10px" }}><b>ACTIVE USERS</b></h5>
                    <p>{activeusers.length}</p> {/* Display total users */}
                </div>
             
            </div>
            <div>
                
            </div>
          <div style={{width:"700px",height:"300px",display:"flex",justifyContent:"center ",marginLeft:"100px",marginTop:"30px"}}>
  <Line data={data} options={options} />
  </div>
    </div>
)



}











// ItemDetails component
function ItemDetails() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    type: "",
    image: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3008/item");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/item/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:3008/item/${selectedItem.id}`, selectedItem);
      setData(data.map(item => item.id === selectedItem.id ? selectedItem : item));
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3008/item', newItem);
      setData([...data, response.data]);
      setNewItem({ name: "", price: "", type: "", image: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4" style={{ paddingTop: "50px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>ITEMS DETAILS</h2>

      <div style={{ width: "90%", marginBottom: "50px",borderRadius:"10px",display:"flex",justifyContent:"center",backgroundColor:"rgba(255, 255, 255, 0.8)"}}>
      
        <form onSubmit={addItem} className="mt-4" style={{margin:"50px"}}>
          <h5>Add New Item</h5>
          <div className="form-group">
            <label>Item Name</label>
            <input type='text' name='name' className="form-control" placeholder="Item Name" value={newItem.name} onChange={handleAddItem} required />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type='number' name='price' className="form-control" placeholder="Price" value={newItem.price} onChange={handleAddItem} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type='text' name='type' className="form-control" placeholder="Type" value={newItem.type} onChange={handleAddItem} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input type='text' name='image' className="form-control" placeholder="Image URL" value={newItem.image} onChange={handleAddItem} />
          </div>
          <Button type="submit" className="btn btn-primary mt-2">Add Item</Button>
        </form>
      </div>

      <div className="row">
        {data.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <Card className="h-100 " style={{ width: "180px", height: "280px",boxShadow:'4px  4px 4px #3e4d3a'  }}>
              <Card.Img variant="top" src={item.image || 'placeholder.png'} alt={item.name} style={{ height: "120px", objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title style={{ fontSize: "14px" }}>{item.name}</Card.Title>
                <Card.Text style={{ fontSize: "12px" }}>Price: ${item.price}</Card.Text>
                <Card.Text style={{ fontSize: "12px" }}>Type: {item.type}</Card.Text>
                <Card.Text style={{ fontSize: "12px" }}>Quantity: {item.quantity}</Card.Text>
            




                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', }}>
                  <Button onClick={() => handleItemClick(item)} style={{background:"#3e4d3a"}}  size="sm">EDIT</Button>
                  <Button  onClick={() => handleDelete(item.id)}style={{background:"#3e4d3a"}}  size="sm">Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Render the modal */}
      {selectedItem && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Item Name</label>
              <input className="form-control" name="name" value={selectedItem.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input className="form-control" name="price" value={selectedItem.price} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input className="form-control" name="type" value={selectedItem.type} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input className="form-control" name="image" value={selectedItem.image} onChange={handleInputChange} />
            </div>
            {selectedItem.image && <img src={selectedItem.image} alt={selectedItem.name} className="img-fluid my-3" style={{ width: "100%", height: "auto" }} />}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={saveChanges}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}



function UserDetails() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3008/users');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    // Handle user deletion
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:3008/users/${id}`);
        setData(data.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  
    // Handle blocking/unblocking users
    const handleBlock = async (isActive, id) => {
      try {
        const response = await axios.get(`http://localhost:3008/users/${id}`);
        const userData = response.data;
  
        // Create an updated user object, changing only the 'Active' field
        const updatedUser = {
          ...userData,
          Active: !isActive
        };
  
        // Send the PUT request with the updated user object
        await axios.put(`http://localhost:3008/users/${id}`, updatedUser, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        // Update the local state with the modified user
        setData((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, Active: !isActive } : user
          )
        );
      } catch (error) {
        console.error('Error updating user status:', error);
      }
    };
  
    return (
      <div className="container mt-4" style={{ paddingTop: '50px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>USERS DETAILS</h2>
  
        <div className="row">
          {data.map((user, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <Card
                className="h-100"
                style={{ width: '180px', height: '280px', boxShadow: '4px 4px 4px #3e4d3a' }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: '14px' }}>{user.Username}</Card.Title>
                  <Card.Text style={{ fontSize: '12px' }}>Email: {user.Email}</Card.Text>
                  <Card.Text style={{ fontSize: '12px' }}>Password: {user.Password}</Card.Text>
                  <Card.Text style={{ fontSize: '12px' }}>
                    Status: {user.Active ? 'Active' : 'Blocked'}
                  </Card.Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <Button
                      onClick={() => handleBlock(user.Active, user.id)}
                      size="sm"
                      style={{ backgroundColor: '#3e4d3a' }}
                    >
                      {user.Active ? 'Block' : 'Unblock'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      size="sm"
                      style={{ backgroundColor: '#3e4d3a' }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

export default AdminPage;
