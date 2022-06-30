import React, { useContext, useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiFillStar, AiOutlineStar , AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { Product } from '../../components';

import { useStateContext } from '../../context/StateContext'
const ProductDetail= ({product,products}) => {
  const {image,price,name,details} = product;
  const [index,setIndex] = useState(0);
  const {incqty,decqty,qty,onAdd} = useStateContext();
 
  return (
    <div>

    <div className='product-detail-container'>
      <div>
        <div className='image-container'>
            <img src={urlFor(image && image[index])} alt="img" class="product-detail-image"/> 
        </div>
        <div className='small-images-container'>
           {image?.map((item,i)=>(
             <img
             src={urlFor(item)}
             className={i == index ? 'small-image selected-image' : 'small-image'}
             onMouseEnter={() => setIndex(i)}
              />
           ))}
        </div>
        </div>
        <div className='product-detail-desc'>
        <h1>{name}</h1>

          <div className='reviews'>
       
          <div style={{alignItems: "center" ,  lineHeight: 0}}
   
>
            <AiFillStar/>
            <AiFillStar/>
            <AiFillStar/>
            <AiFillStar/>
            <AiOutlineStar/>
          </div>
          <p>
            (20)
          </p>

          </div>
          
          <div>
            <h4>Details:</h4>
            <p>{details}</p>
            <p className='price'>
               ${price}
            </p>
            <div className='quantity'>
            <h3>Quantity:</h3>
              <p className='quantity-desc'>
              <span className='minus' onClick={decqty}>
              <AiOutlineMinus/>
              </span>
              <span className='num'>
              {qty}
              </span>
              <span className='plus' onClick={incqty}>
              <AiOutlinePlus/>
              </span>

              </p>
            </div>


            {/* add to cart button */}
            <div className='buttons'>
              <button type='button' onClick={() => onAdd(product, qty)} className='add-to-cart'>
              Add to Cart

              </button>

              <button type='button' onClick="" className='buy-now'>
              Buy Now

              </button>
            </div>
          </div>

     
      </div>
    </div>



{/* slider */}
<div className='marquee'>
  <div className='maylike-products-container track'>
    {products.map((item) => (
      <Product key={item._id} product={item}/>
    ))}
  </div>
</div>

    </div>
  )
}
export const getStaticPaths = async () => {
const query = `*[_type == "product"] {
  slug {
    current
  }
}`;
const products = await client.fetch(query);
const paths = products.map((product)=> ({
  params: {
    slug:product.slug.current
  }
}));
return {
  paths,
  fallback : 'blocking'
}
}
export const getStaticProps = async ({params:{slug}}) => {

  const query = `*[_type == 'product' && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);


  const products = await client.fetch(productsQuery);
  return {

    props: {products,product}
  }
}

export default ProductDetail