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
    // make a clone of the current cart items
    // then check to see if @param: item is in the current cart
    let foundCartItemIndex;
    const clonedCartItems = [...cartItems];
    const foundCartItem = cartItems.find((c, i) => {
      if (c.id === item.id) {
        foundCartItemIndex = i;
        return c;
      } else return false;
    });

    // if @param:item is in the cloned cart increase its quantity by 1
    // otherwise, make a clone of the @param:item with a new key of quantity = 1
    // and push the cloned item into the cloned cart
    if (foundCartItem) {
      clonedCartItems[foundCartItemIndex]["quantity"] =
        foundCartItem.quantity + 1;
    } else {
      clonedCartItems.push({
        ...item,
        quantity: 1
      });
    }

    // set the cartItems state with the new cloned cart items array
    setCartItems(clonedCartItems);
  };

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
