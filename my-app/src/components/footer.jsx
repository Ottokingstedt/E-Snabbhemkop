import React from 'react'
import {Link} from 'react-router-dom';
import {BsLinkedin, BsGithub, BsYoutube, BsInstagram} from 'react-icons/bs';
const footer = () => {
  return (
<>
<footer className='py-4'>
    <div className="container-xxl">
        <div className="row align-items-center">
            <div className="col-5">
                <div className="footer-top-data d-flex gap-30 align-items-center">
                    <img src="images/snabbhemköp-white.png" alt="newsletter" className='logo-E'/>
                    <h4 className='mb-0 text-white'>Sign Up for Newsletter</h4>

                </div>
            </div>
            <div className="col-7">
            <div className="input-group input-control">
                        <input 
                        type="text" 
                        className='form-control py-1'
                        placeholder="Your Email Address"
                        aria-label="Your Email Address"
                        aria-describedby='basic-addon2'
                        />
                        <span className='input-group-text py-3' id='basic-addon2'>
                            Subscribe
                        </span>
                    </div>
            </div>
        </div>
    </div>
</footer>
<footer className='py-4'>
    <div className="container-xxl">
        <div className="row">
            <div className="col-4">
                <h4 className='text-white mb-4'> Contact Us</h4>
                <div className='footer-links d-flex flex-column'>
                    <Link className='text-white py-2 mb-1'>E-Snabbhemköp</Link>
                    <address className='text-white fs-6'>
                        No. 34B Drottningsgatan,<br/>
                        Stockholm, 1234<br/>
                        Sweden
                    </address>
                    <a href="tel:+46-768242031" className='mt-3 d-block mb-0 text-white'>
                        +46-348242031
                        </a>
                    <a href="mailto:Esnabbhemköp@example.com" className='mt-2 d-block mb-0 text-white'>
                        Esnabbhemköp@example.com
                        </a>
                    <div className="social_icons d-flex align-items-center gap-30 mt-4">
                        <a className="text-white" href="/#">
                            <BsLinkedin className='fs-5' />
                        </a>
                        <a className="text-white" href="/#">
                            <BsInstagram className='fs-5' />
                        </a>
                        <a className="text-white" href="/#">
                            <BsYoutube className='fs-5' />
                        </a>
                        <a className="text-white" href="/#">
                            <BsGithub className='fs-5' />
                        </a>
                    </div>
                </div>            
            </div>
            <div className="col-3">
                <h4 className='text-white mb-4'>Information</h4>
                <div className='footer-links d-flex flex-column'>
                    <Link className='text-white py-2 mb-1'>Private Policy</Link>
                    <Link className='text-white py-2 mb-1'>Refund Policy</Link>
                    <Link className='text-white py-2 mb-1'>Shipping Policy</Link>
                    <Link className='text-white py-2 mb-1'>Terms Of Service</Link>
                    <Link className='text-white py-2 mb-1'>Blogs</Link>
                </div>            
            </div>
            <div className="col-3">
                <h4 className='text-white mb-4'>Account</h4>
                <div className='footer-links d-flex flex-column'>
                    <Link className='text-white py-2 mb-1'>Search</Link>
                    <Link className='text-white py-2 mb-1'>About us</Link>
                    <Link className='text-white py-2 mb-1'>FAQ</Link>
                    <Link className='text-white py-2 mb-1'>Contact</Link>
                </div>            
            </div>
            <div className="col-2">
                <h4 className='text-white mb-4'>Categories</h4>
                <div className='footer-links d-flex flex-column'>
                    <Link className='text-white py-2 mb-1'>Meat & Chicken</Link>
                    <Link className='text-white py-2 mb-1'>Vegetables & Fruits</Link>
                    <Link className='text-white py-2 mb-1'>Milk & Bread</Link>
                    <Link className='text-white py-2 mb-1'>Snacks</Link>
                </div>
            </div>

        </div>
    </div>
</footer>
<footer className='py-4'>
    <div className="container-xxl">
        <div className="row">
            <div className="col-12">
                <p className="text-center mb-0 text-white">
                    &copy; {new Date().getFullYear} Powered by Otto Kingstedt {''}
                </p>
            </div>
        </div>
    </div>
</footer>

</>
)
}

export default footer