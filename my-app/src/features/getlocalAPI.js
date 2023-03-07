import axios from "axios";
import {useForm} from 'react-hook-form';
import { useState } from 'react'


const GetLocalAPI = () => {
const { setError} = useForm;
const [loc, setLoc] = useState(null);
const [long, setLong] = useState(null);

const apiURL = 'https://ipgeolocation.abstractapi.com/v1/'
const apiKey = '47adb964fceb478b8e6d669552b4ac4d'

const getUserLocationFromAPI = async() => {
    try {
        const response = await axios.get(apiURL, {api_key: apiKey});
        setLoc(response.data.latitude);
        setLong(response.data.longitude);
        return response.data;
    } catch(error){
       
         setError('Something went wrong getting Geolocation from API!')
    }
    
}
getUserLocationFromAPI();

return (
    <>

    <p>Your coordinates are: {[loc, long]}</p>
    
    </>
)
}

export default GetLocalAPI