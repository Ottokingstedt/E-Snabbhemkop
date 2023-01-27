import {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { setHeaders, url } from '../../features/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const params = useParams();

    const [user, setUser] = useState({
        firstname: "",
        lastname:"",
        isAdmin: false,
        password: ","
    });

const [loading, setLoading] = useState(false);
const [updating, setUpdating] = useState(false);


    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            try{
                const res = axios.get(`${url}/users/find/${params.id}`, setHeaders());
            setUser({
                ...res.data,
                password: "",
            });
            
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser()
        setLoading(false)
    }, [params.id])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setUpdating(true)
        try{ 
         const res = await axios.put(`${url}/users/find/${params.id}`, {
            ...user
         }, setHeaders())

         setUser({...res.data, password:""})

         toast.success("Profile updated...")
        } catch (err){
            console.log(err)
        }
        setUpdating(false)
    }
  return (
    <StyledProfile>
        <ProfileContainer> 
            {loading ? (
                <p>Loading...</p>
            ) : (
             
    <form onSubmit={handleSubmit}>
    <h2>User Profile</h2>
    {user.isAdmin ? 
    ( <Admin>Admin</Admin> 
    ) : ( 
     <Customer>Customer</Customer>
    )}
    <input 
    type="text" 
    placeholder='firstname' 
    value={user.firstname}
    onChange={(e) => setUser({...user, firstname: e.target.value})} 
    />
    <input 
    type="text" 
    placeholder='lastname' 
    value={user.lastname}
    onChange={(e) => setUser({...user, lastname: e.target.value})} 
    />
    <input 
    type="email" 
    placeholder='email'
    value={user.email}
    onChange={(e) => setUser({...user, email: e.target.value})}  
    />
    <input 
    type="password" 
    placeholder='password' 
    value={user.password}
    onChange={(e) => setUser({...user, password: e.target.value})} 
    />
    <button>{updating ?  "pending" : "updated"}</button>
</form> )}
</ProfileContainer>
</StyledProfile>
)
}

export default UserProfile;


const StyledProfile = styled.div`
    margin: 3rems;
    display: flex;
    justify-content: center;
    h3{
        margin: 1.5rem 0 0.5rem 0;
    }
`;

const ProfileContainer = styled.div`
max-width: 500px;
width: 100%;
height: auto;
display: flex;
box-shadow:rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
border-radius: 5px;
padding: 2rem;

form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

h3{
    margin-bottom: 0.5rem;
}

label{
    margin-bottom: 0.2rem;
    color: gray;
}

input{
    margin: 1rem;
}
`;


const Admin = styled.div`
color: rgb (253, 181, 40);
background: rgb (253, 181, 40, 0.12);
padding: 3px, 5px;
border-radius: 3px;
font-size: 14px;
`;

const Customer = styled.div`
color: rgb(38, 198, 249);
background-color: rgb(38, 198, 249, 0,12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px;
`