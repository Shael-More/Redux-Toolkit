import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import CartContainer from './components/CartContainer';
import { calculateTotal, getCartItems } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './components/Modal';
function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className='loading'>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
