import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ShoeContext = createContext();

function ContextPage({ children }) {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("Username");
    if (user) {
      updateCart(user);
    } else {
      setLoading(false);
    }
  }, []);

  const updateCart = async (username) => {
    try {
      const response = await axios.get(`http://localhost:3008/users?Username=${username}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        setCurrentUser(user);
        setCart(user.cart || []);
        setOrders(user.orders || []);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error fetching user details");
    }
    setLoading(false);
    
  };

  const updateDB = async (updatedCart) => {
    if (currentUser) {
      await axios.patch(`http://localhost:3008/users/${currentUser.id}`, { cart: updatedCart });
    }
  };

  const addToCart = async (product) => {
    if (!currentUser) {
      console.log("No current user found");
      setError("No current user found");
      return;
    }

    let updatedCart = [...cart];
    let existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    await updateDB(updatedCart);
  };

  const removeFromCart = async (productId) => {
    if (!currentUser) return;
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await updateDB(updatedCart);
  };

  const clearCartItems = async () => {
    if (!currentUser) return;
    setCart([]);
    await updateDB([]);
  };

  const submitOrder = async (order) => {
    console.log(order);

    // Update cart items' quantities and remove those with zero quantity
    const updatedCart = cart.map((item) => {
      const orderedItem = order.items.find((orderItem) => orderItem.id === item.id);
      if (orderedItem) {
        return {
          ...item,
          quantity: item.quantity - orderedItem.quantity
        };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    setCart(updatedCart);

    // Add the new order to the orders list
    const newOrder = [...orders, order];
    setOrders(newOrder);

    if (currentUser) {
      try {
        // Update the user orders and cart in the database
        await axios.patch(`http://localhost:3008/users/${currentUser.id}`, { orders: newOrder, cart: updatedCart });
      } catch (error) {
        console.log("Error updating orders:", error);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem('Username');
  };

  return (
    <ShoeContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCartItems,
      submitOrder,
      currentUser,
      logout,
      loading,
      error
    }}>
      {children}
    </ShoeContext.Provider>
  );
}

export default ContextPage;
