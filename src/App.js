import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Contexts
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

// Hooks
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const addItem = item => {
    // add the given item to the cart
    item = cart.find(p => p.id === item.id) || item;
    item.quantity ? (item.quantity += 1) : (item.quantity = 1);
    setCart([...cart.filter(c => c.id !== item.id), item]);
  }

  const removeItem = id => {
    setCartItems([...cartItems.filter(c => c.id !== id)]);
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCartItems([...cartItems.filter(c => c.id !== id)]);
      return;
    }
    const clonedCartItems = [...cartItems];
    let index;
    clonedCartItems.find((c, i) => {
      if (id === c.id) index = i;
      return false;
    });

    clonedCartItems[index]["quantity"] = quantity;
    setCartItems(clonedCartItems);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider
          value={{ cartItems, removeItem, updateItemQuantity }}
        >
          <Navigation />
          {/* Routes */}
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
