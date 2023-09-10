import React, { useState, useEffect } from 'react';

import { ItemListContainer, NavBar, Cart, Checkout } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addToCart = async (productId, quantity) => await commerce.cart.add(productId, quantity).then(setCart);

  const updateCartQty = async (productId, quantity) => await commerce.cart.update(productId, { quantity }).then(setCart);

  const removeFromCart = async (productId) => await commerce.cart.remove(productId).then(setCart);

  const emptyCart = async () => await commerce.cart.empty().then(setCart);

  const refreshCart = async () => await commerce.cart.refresh();

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div >
        <NavBar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={<ItemListContainer products={products} addToCart={addToCart} />}></Route>
          <Route path='/cart'
            element={
              <Cart
                cart={cart}
                updateCartQty={updateCartQty}
                removeFromCart={removeFromCart}
                emptyCart={emptyCart}
              />}
          ></Route>
          <Route path='/checkout' element={<Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage} />} >
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
