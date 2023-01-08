import React from 'react';
import './Cart.css'

const Cart = (props) => {
    
    const {cart} = props;
    let total =0;
    let shipping =0;
    let quantity =0;
    for(const product of cart){
        quantity = quantity + product.quantity;
        total = total + product.price*product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = Math.round(total*0.15);
    const grandTotal = total+shipping+tax;
    return (
        <div className='cart-area'>
            <h1>Order summary</h1>
           <p>Selected items: {quantity}</p>
           <h5>Total Price: ${total}</h5>
           <p>Total Shipping Charge: ${shipping}</p>
           <p>Tax:${tax}</p>
           <h3>Grand Total: ${grandTotal}</h3>
           <p>{props.children}</p>
        </div>
    );
};

export default Cart;