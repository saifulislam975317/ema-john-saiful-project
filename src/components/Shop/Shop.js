import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect( () =>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(response => response.json())
        .then(data => setProducts(data))
        
    },[])
 
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
    <Cart cart={cart}></Cart>
 </div>
 </div>
    );
};

export default Shop;