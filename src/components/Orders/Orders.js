import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewOrders from '../ReviewOrders/ReviewOrders';
import './Orders.css'

const Orders = () => {
    
    const [products] = useProducts();
    const [cart,setCart]= useCart(products);
    const navigate = useNavigate()

    const removeOrderItem = product=>{
        const restItems = cart.filter(pd=> pd.id!==product.id)
        setCart(restItems)  
        removeFromDb(product.id)
    
    } 
    return (
        <div className='shop-container'>
            <div className="orders-container">
            {
                cart.map(product=><ReviewOrders product={product} key={product.id} removeOrderItem={removeOrderItem}></ReviewOrders>)
            }
            </div>
            <div className="cart-container">
                <Cart cart ={cart}>
                   
                    <button className='checkout-button' onClick={()=> navigate('/inventory')}>Proceed Checkout<FontAwesomeIcon  className='checkout-icon'  icon={faCreditCard}></FontAwesomeIcon></button>
                    
                </Cart>
            </div>
        </div>
    );
};

export default Orders;