import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(() => {
      return cart.reduce((products, currentProduct) => {
        products = products || [];
        const product = products.find(p => p.id === currentProduct.id);
        if (product) {
          product.quantity = product.quantity ? (product.quantity += 1) : 1;
          const filteredProducts = products.filter(p => p.id !== currentProduct.id);
          products = [...filteredProducts, product];
        } else {
          currentProduct.quantity = 1;
          products = [...products, currentProduct];
        }
        return products;
      }, []);
    });
  }, [cart]);

  const addItem = item => {
    // add the given item to the cart
    setCart([...cart, item]);
  };

  return (
    <div className='App'>
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart }}>
          <Navigation cart={cart} />
          {/* Routes */}
          <Route exact path='/' component={Products} />
          <Route path='/cart' component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
