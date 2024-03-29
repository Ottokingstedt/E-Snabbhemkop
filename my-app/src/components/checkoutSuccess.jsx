

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { clearCart, getTotals } from "../features/cartSlice";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <Link to="/">
                    <ArrowLeftIcon className='w-25 p-3"' />
                    <span>Continue Shopping</span>
      </Link>
    </Container>
  );
};

export default CheckoutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #ff4d00;
  }
`;