import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewOrders.css'

const ReviewOrders = (props) => {
    const {removeOrderItem, product} = props;
    const {name,img, price, shipping, quantity} = props.product;
    return (
        <div className='review-orders-container'>
            <div className="review-order-img-area">
            <img src={img} alt="" />
            </div>
            <div className="review-order-details-container">
                <div className="review-order-details">
                <h3 title={name}>Name:{name.length>20?name.slice(0,20)+'...':name}</h3>
                <h5>Price:${price}</h5>
                <p>Shipping:$<small>{shipping}</small></p>
                <p>Quantity:<small>{quantity}</small></p>
                </div>
                <div className="review-order-delete-button">
                    <button onClick={()=>removeOrderItem(product)} className='delete-button'><FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon></button>
                </div>
            </div>
        </div>
    );
};

export default ReviewOrders;