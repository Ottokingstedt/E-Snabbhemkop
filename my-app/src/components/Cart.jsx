import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import  PayButton  from './PayButton'

import { Link, useNavigate } from "react-router-dom";
import { 
    addToCart, 
    clearCart, 
    decreaseCart, 
    getTotals, 
    removeFromCart 
} from '../features/cartSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    
    const handleDecreaseCart = (product) =>{
        dispatch(decreaseCart(product));
    }

    const handleIncreaseCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    }
  return (
<div className="cart-container">
    <h2>Shopping Cart</h2>
    { cart.cartItems.length === 0 ? (
        <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
                <Link to="/">
                    <ArrowLeftIcon />
                    <span>Start Shopping</span>
                </Link>
            </div>
        </div>
    ) : (
        <div>
            <div className='cart-items'>
                {cart.cartItems && cart.cartItems?.map((cartItem) => (
                    <div className='cart-item' 
                    key={cartItem._id}>
                        <div 
                        className="cart-product">
                            <img src={cartItem.image?.url} alt={cartItem.name} />
                            <div>
                                <h3>{cartItem.name}</h3>
                                <p>{cartItem.description}</p>
                                <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                            </div>
                        </div>
                        <div className='cart-product-price'>{cartItem.price} Kr</div>
                        <div className="cart-product-quantity">
                            <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                            <div className="count">{cartItem.cartQuantity}</div>
                            <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                        </div>
                        <div className="cart-product-total-price">
                            {cartItem.price * cartItem.cartQuantity} KR
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart-summary">
                <button className="clear-cart" onClick={() => handleClearCart()}>
                    Clear Cart
                </button>
                <div className="cart-checkout">
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span className="amount"> {cart.cartTotalAmount} KR</span>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    {auth._id ?(
                        <PayButton cartItems={cart.cartItems}/>
                    ) : (
                    <button className=''
                    onClick={() => navigate("/login")}
                    > 
                    Login to Check Out
                    </button>
                    )}
                
                    <div className="Continue-shopping">
                <Link to="/">
                    <ArrowLeftIcon className='w-25 p-3"' />
                    <span>Continue Shopping</span>
                </Link>
            </div>
                </div>
            </div>
        </div>
        )}
</div>  
    )
}

export default Cart