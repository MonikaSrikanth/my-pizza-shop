import { useState , useEffect } from "react";
const initialPizzas = [
      {name:"Margherita",price:100,image:"/margharita.jpg",quantity:0},
      {name:"Sweet-corn",price:200,image:"/sweetcorn.jpg",quantity:0},
      {name:"Veggie-loaded",price:400,image:'/Veggie.jpg',quantity:0},
      {name:"Tomato",price:300,image:'/tomato.jpg',quantity:0},
      {name:"Cheese-burst",price:500,image:'/cheeseburst.jpg',quantity:0},
      {name:"Italian-Pizza",price:700,image:'/italian.jpg',quantity:0}
  ];
function MenuSection() {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState(initialPizzas);

  useEffect(() => {
  const handleStorageChange = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedPizzas = initialPizzas.map(pizza => {
      const match = storedCart.find(item => item.name === pizza.name);
      return match ? { ...pizza, quantity: match.quantity } : { ...pizza, quantity: 0 };
    });
    setPizzas(updatedPizzas);
  };

  // Load once on mount
  handleStorageChange();

  // Listen for storage updates (triggered by CartSection)
  window.addEventListener("storage", handleStorageChange);

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  const updateLocalStorageCart = (updatedPizzas) => {
    const cartItems = updatedPizzas.filter(pizza => pizza.quantity > 0);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage")); // sync across components
  };

  const increaseQuantity = (index) => {
    const updated = [...pizzas];
    updated[index].quantity += 1;
    setPizzas(updated);
    updateLocalStorageCart(updated);
  };

  const decreaseQuantity = (index) => {
    const updated = [...pizzas];
    if (updated[index].quantity > 0) {
      updated[index].quantity -= 1;
      setPizzas(updated);
      updateLocalStorageCart(updated);
    }
 
  };
  return (
    <section id="Menu" className="section2">
      <div className="container2">
        <h2>Our Menu</h2>
        <div id="pizza-list">
          {pizzas.map((pizza, index) => (
          <div key={index} className="pizza-item">
          <img 
            src={pizza.image}
            alt={pizza.name}
            className="pizza-image"
          />
          <h3 className="pizza-name">{pizza.name}</h3>
          <p className="pizza-price">Rs.{pizza.price}</p>
          <div>
                <button onClick={() => increaseQuantity(index)}>+</button>
                <span style={{ margin: "0 10px" }}>{pizza.quantity}</span>
                <button onClick={() => decreaseQuantity(index)}>-</button>
              </div>
        </div>
      ))}
      </div>
    </div>
    </section>
  );
}

export default MenuSection;
