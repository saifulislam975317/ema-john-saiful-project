import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products] = useProducts()
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
   
 
    useEffect(()=>{
        const storedCart = getStoredCart()
        const saveCart =[]
        for(const id in storedCart){
            const findId = products.find(product => product.id===id)
            if(findId){
                const quantity = storedCart[id]
                findId.quantity=quantity;
                saveCart.push(findId)
            }
            
        }
        setCart(saveCart)
    },[products])


const handleAddToCart = (selectedProduct)=>{
   let newCart = [];
    const alreadyHaveId = cart.find(product => product.id === selectedProduct.id);
    if(!alreadyHaveId){
        selectedProduct.quantity=1;
        newCart = [...cart, selectedProduct]

    }
    else{
        const remainingId = cart.filter(product => product.id !== selectedProduct.id);
        alreadyHaveId.quantity = alreadyHaveId.quantity+1;
        newCart = [...remainingId, alreadyHaveId] 
    }
    setCart(newCart)
    addToDb(selectedProduct.id)
}

return (
 <div className='shop-container'>
  <div className="products-container">
   {
    products.map(product => <Product product ={product} handleAddToCart={()=>handleAddToCart(product)} key={product.id}></Product>)
   }    
      
 </div>
 <div className="cart-container">
    <Cart cart={cart}>
        
        <button className='review-button' onClick={()=>navigate('/orders')}>Review Order<FontAwesomeIcon className='review-icon' icon={faArrowRight}></FontAwesomeIcon></button>
        
    </Cart>
    
 </div>
 </div>
    );
};

export default Shop;