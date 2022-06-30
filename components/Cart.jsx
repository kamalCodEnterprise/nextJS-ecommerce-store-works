import React,{useRef} from 'react'
import Link from 'next/link'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
 import {TiDeleteOutline} from 'react-icons/ti'
 import toast from 'react-hot-toast'
 
 import { useStateContext } from '../context/StateContext'

 import { urlFor } from '../lib/client'
import Product from './Product'
const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantites, cartItems, setshowCart,incqty,decqty,  } = useStateContext()

  return (
    <div className='cart-wrapper' ref={cartRef}>

    <div className='cart-container'>

    <button type='button' className='cart-heading' onClick={()=> setshowCart(false)}>
    <AiOutlineLeft />
    <span className='heading'>your Cart</span>
    <span className='cart-num-items'>({totalQuantites} items)</span>

    </button>

    {cartItems.length < 1 && (
      
      <div className='empty-cart'>
        <AiOutlineShopping   size={150} />
        <h3>Your shopping bag is empty</h3>
        <Link href="/">
          <button type='button'  onClick={() => setshowCart(false)} className='btn'
          >
            Continue Shopping
          </button>
        </Link>
      </div>
      
    )
    
    }
    <div className='product-container'>
    
    {cartItems.length >= 1 && (cartItems.map((item) => (
 
          <div className='product' key={item._id}>
                 <img src={urlFor(item?.image[0])} className='cart-product-image' />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h3>{item.price}</h3>
                  </div>


                  <div className='flex bottom'>


                 <div>
                  <p className='quantity-desc'>
                    <span className='minus' onClick=""><AiOutlineMinus/></span>
                    <span className='num'>{item.quantity}</span>
                    <span className='plus' onclick=""><AiOutlinePlus/></span>
                  </p>
                  </div>
                  </div>
                </div>
          </div>
    )))}

    </div>


    </div>

    </div>
  )
}

export default Cart