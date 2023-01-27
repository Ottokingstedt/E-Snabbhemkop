import React from 'react'
import {Link} from "react-router-dom";
import Blog from '../images/blog.jpeg'

const BlogCard = () => {
  return (
    <>
    <div className="col-3">
        <div className="blog-card">
            <div className="card-image">
                <img src={Blog} className='img-fluid' alt="Blog" />
            </div>
            <div className="blog-content">
                <p className="date">2 jan, 2023</p>
                <h5 className="title">A healthy food</h5>
                <p className="desc">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Error quae nulla quidem natus itaque sed consequuntur.
                </p>
                <Link to="/" className='button'>Read more</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default BlogCard