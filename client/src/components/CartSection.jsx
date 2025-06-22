import React from 'react';
import { useState , useEffect } from "react";
import axios from "axios";
function CartSection() {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    // Initial load
    loadCart();

    // Re-load cart on storage change
    const handleStorageChange = () => {
      loadCart();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart.filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty");
    return;
  }

  if (name.trim() === "") {
    alert("Please enter your name");
    return;
  }

  const order = {
    name,
    items: cartItems,
    total: getTotalPrice()
  };

  try {
    await axios.post("https://my-pizza-shop.onrender.com/orders", order); 
    alert("Order placed successfully");

    // Clear cart
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
    setName("");
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    alert("Failed to place order");
    console.error(err); // For debugging
  }
};

  return (
    <section id="Cart" className="section3">
      <div className="container4">
        <h1>Your Cart</h1>
        <div id="cart">
          {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Pizza Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((pizza, index) => (
                <tr key={index}>
                  <td>{pizza.name}</td>
                  <td>{pizza.quantity}</td>
                  <td>Rs.{pizza.quantity * pizza.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p id="total-price"><strong>Total: Rs.{getTotalPrice()}</strong></p>
        </div>
        <div className="name-input">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="order-container">
          <button id="place-order" onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </section>
  );
}

export default CartSection;
