import { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useFetch from '../hooks/useFetch';
import {url} from "../../features/api"


const Login  = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth)
    const { handleGoogle, loading, error } = useFetch(
        `${url}/signup`
    );

    useEffect(() => {
        const theUser = localStorage.getItem("user");
    
        if (theUser && !theUser.includes("undefined")) {
          setUser(JSON.parse(theUser));
        }
      }, []);
    
  
    // Check if it access successfully
    console.log(auth);

    useEffect(() => {
      /* global google */
      if (window.google) {
        google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: handleGoogle,
        });
  
        google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
          // type: "standard",
          theme: "filled_black",
          // size: "small",
          text: "continue_with",
          shape: "pill",
          width: 100,
          height: 50,
        });
  
        // google.accounts.id.prompt()
      }
    }, [handleGoogle]);

    useEffect(() => {
      if (auth._id){
        navigate("/cart")
      }
    }, [auth._id, navigate])

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    

    // <--- Test if it works --->
    // console.log('user:', user);

    const handleSubmit = (e) =>{
        e.preventDefault();

        dispatch(loginUser(user));
    }

  return (
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong border-radius">
                    <div className="card-body p-5 text-center">


                    <form onSubmit={handleSubmit}>
                        <h2 className='mb-5'>Login</h2>
                        <div className="form-outline mb-4">
                        <input 
                        type="email" 
                        placeholder='email'
                        className="form-control form-control-lg"
                        onChange={(e) => setUser({...user, email: e.target.value})}  
                        />
                        </div>

                        <div className="form-outline mb-4">
                        <input 
                        type="password" 
                        placeholder='password'
                        className="form-control form-control-lg" 
                        onChange={(e) => setUser({...user, password: e.target.value})} 
                        />
                        </div>

                        <button class="btn btn-warning btn-lg btn-block">{auth.loginStatus === "pending" ? "Submitting" : "Login"}</button>

                        {auth.loginStatus === "rejected" ? (
                        <p>{auth.loginError}</p> 
                        ) : null}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {loading ? (
                        <div>Loading....</div>
                        ) : (
                        <div className="d-flex justify-content-center align-items-center h-100 mt-5" id="signUpDiv" data-text="signup_with"></div>
                        )}
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login 
