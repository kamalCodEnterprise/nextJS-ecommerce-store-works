import React, { createContext, useContext,useState, useEffect  } from "react";
import {toast} from 'react-hot-toast';


const Context = createContext();
 
export const StateContext = ({children}) => {
const [showCart, setshowCart] = useState(false)
const [cartItems, setcartItems] = useState([])
const [totalQuantites, settotalQuantites] = useState(0)
const [totalPrice, settotalPrice] = useState()
const [qty, setQty] = useState(1)


const onAdd =(product,quantity)=>{
  const checkProductInCart = cartItems.find((item)=> item._id === product._id );
  settotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * product.quantity) ;
  settotalQuantites((prevTotalQuantities)=> prevTotalQuantities + quantity);
  if(checkProductInCart){
    
     const updatedCartItems = cartItems.map((cartproduct)=>{
      if(cartproduct._id === product._id) return {
        ...cartproduct,
        quantity: cartproduct.quantity + quantity

      }
    })
    setcartItems(updatedCartItems);
  }else {
    product.quantity = quantity;
    setcartItems([...cartItems,{...product}]);
  }
  toast.success(`${qty} ${product.name} added to the cart`);


}

const incqty = () => {
    setQty((prev) => (prev + 1));
  }

  const decqty = () => {
    setQty((prev) => (prev !== 1 ? prev - 1 : prev));
  }
return ( 
<Context.Provider

value={{
    showCart,
    cartItems,
    totalQuantites,
    qty,
    totalPrice,
    incqty,
    decqty,
    onAdd,
    setshowCart
   
    

}}
>
{children}
</Context.Provider>
)
}
export const useStateContext = () => useContext(Context)