import BlogCard from '../components/blogCard';
import { useDispatch, useSelector } from 'react-redux';
import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

 function Home(){
    const {items: data, error, isLoading} = useSelector((state) => state.products);

    // const { data, error, isLoading } = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate("/cart");
   }

  return (
    <>
    <section className='best-seller-wrapper py-5 home-wrapper-2'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                {isLoading ? ( 
                    <p>Loading...</p>
                ) : error ? (
                <p>An error occured...</p>
                 ) : (
                    <>
                <h3 className="section-heading">
                  Best-Sellers
                </h3> 
                    <hr />
                <div className='col-3 d-flex'>
                {data && 
                    data?.map(( product => <div key={product._id} className="products mx-4">
                    <h3>{product.name}</h3>
                    <Link to ={`/product/${product._id}`}>
                    <img src={product.image.url} alt={product.name}/>
                    </Link>
                    <div className="details">
                        <span>
                            {product.description} <br/>
                        </span>
                        <span className='price'>
                            {product.price} KR
                        </span>
                    </div>
                    <button className="btn btn-outline-warning" onClick={() => handleAddToCart(product)}>Add to cart</button>
                </div> 
                ))}
                </div> 
                    </>
                 )}
                </div>
            </div>
        </div>
    </section>
    <section className='blog-wrapper py-5 home-wrapper-2'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                  <h3 className="section-heading">
                    Our Latest Blogs
                    </h3>  
                    <hr />
                </div>
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </div>
    </section>
    </>
  )
}

export default Home