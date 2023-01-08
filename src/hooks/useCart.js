import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/fakedb";


const useCart = (products) =>{
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const storedCart = getStoredCart();
        const savedCart = []
        for(const id in storedCart){
            const findId = products.find(product => product.id === id);
            if(findId){
               const quantity = storedCart[id];
               findId.quantity = quantity;
               savedCart.push(findId)
            }
        }
        setCart(savedCart)
    },[products]);

    return [cart, setCart]
}

export default useCart;