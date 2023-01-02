import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {img, name,seller, price, ratings} = props.product;
    return (
        <div className='product'>
           <img src={img} alt="" /> 
           <div className="product-info">
           <h2 className='product-name'>{name}</h2>
           <h3>Price:${price}</h3>
           <p>Seller: {seller}</p>
           <p><small>Ratings: {ratings} stars</small></p>
           </div>
           <button onClick={props.handleAddToCart} className='cart-button'>
            <p className='button-details'>Add to Cart</p>
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
           </button>
        </div>
    );
};

export default Product;