import {MapPinIcon, ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon, BellIcon } from '@heroicons/react/24/solid'
import {Link, NavLink, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components"
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import Search from './Search';


const Header = () => {

    const dispatch = useDispatch();
    const {cartTotalQuantity} = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

     
  return (
    <nav>
    <header className='header-top-strip'>
        <div className="container-xxl subheader">
            <div className="row">
            <div className="col-6">
                <p className="text-start mb-3 mt-3">
                Welcome to E-snabbhemköp
                </p>
                </div>
                <div className="col-6">
                <p className="text-end mb-3 mt-3">
                <MapPinIcon className='Iconsize'/>Deliver to 4131231
                </p>
                </div>
            </div>
        </div>
    </header>
    <header className="header-upper py-3 sticky-top">
        <div className="container-xxl">
            <div className="row align-items-center">
                <div className="col-2">
                    <Link>
                    <img src="images/snabbhemköp-03.png" alt="snabbhemköp" className='Logo'/>
                    </Link>
                </div>
                <div className="col-4 row align-items-center">
                    <Search/>
                </div> 
                <div className="col-3 button-group-text">
                    <div className="header-upper-links d-flex align-items-center justify-content-between">
                        <div className='mx-1'>
                            <button className='d-flex align-items-center gap-10'>
                                <NavLink to="/cart">
                                    <ShoppingCartIcon className='Iconsize d-flex' />
                                    {/* <p className='d-flex justify-content gap-10'>shopping</p> */}
                                </NavLink>
                                <div className='d-flex flex-column gap-10'>
                                    <span className='badge bg-warning text-dark'>{cartTotalQuantity}</span>
                                </div>
                            </button>
                        </div>
                        <div className='mx-1'>
                        <Link>
                        <HeartIcon className='Iconsize'/>
                        </Link>
                        </div>
                        <div className='mx-1'>
                        <Link className='d-flex align-items-center gap-10'>
                            <BellIcon className='Iconsize'/>
                            {/* <div className='d-flex flex-column'>
                            <span className='badge bg-warning position-absolute px-0 py-0'>0</span>
                            </div> */}
                        </Link>
                        </div>
                        {auth._id ? (
                            <Links>
                            {auth.isAdmin ? (
                                 <div>
                                 <Link to="admin/summary">Admin</Link>
                             </div>  
                            ) : null}
                            <div onClick={() => {
                                dispatch(logoutUser(null));
                                toast.warning("Logged out!", {position: "bottom-left"})
                            }}
                            > 
                            Logout 
                            </div> 
                            </Links>
                            ) : ( 
                        <AuthLinks>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                            </AuthLinks> 
                        )}
                    </div>
                </div>
            </div>
        </div>
    </header>
    <header className='header-bottom py-3 sticky-top'>
        <div className='container-xxl'>
            <div className="row">
                <div className="col-12">
                    <div className="menu-bottom d-flex align-items-center gap-30">
                        <div>
                            <div className="dropdown">
                                <button
                                className='btn btn-outline-light dropdown-toggle border-0 gap-15 d-flex align-items-center'
                                type='button'
                                id='dropdownMenuButton1'
                                data-bs-toggle='dropdown'
                                aria-expanded="false"
                                >
                                  <span className='me-5 d-inline-block'>Shop Categories</span> 
                                </button>
                                <ul
                                className='dropdown-menu'
                                aria-labelledby='dropdownMenuButton1'
                                >
                                    <li>
                                        <Link className="dropdown-item text-white" to="">
                                            Meat/Chicken
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-item text-white' to="">
                                            Meat/Chicken
                                        </Link>
                                    </li>  
                                    <li>
                                        <Link className='dropdown-item text-white' to="">
                                            Meat/Chicken
                                       </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="menu-links">
                            <div className='d-flex align-items-center gap-15'>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/blog">Blog</NavLink>
                                <NavLink to="/faq">FQA</NavLink>
                                <NavLink to="/contact">Contact</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </header>
    </nav>
  )
  
}

export default Header

const AuthLinks = styled.div`
    a{
        &:last-child{
            margin-left: 2rem;
        }
    }
`

const Links = styled.div`
color: black;
display: flex;
div{
    cursor: pointer;
    &:last-child{
        margin-left: 2rem;
    }
}
`