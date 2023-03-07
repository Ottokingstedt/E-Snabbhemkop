import React from 'react'
import { useState } from 'react'
import {useForm} from 'react-hook-form';

const GetLocal = () => {
    const [loc, setLoc] = useState(null);
    const [long, setLong] = useState(null);
    const { setError} = useForm;
    
    const geolocationAPI = navigator.geolocation;

    const getUserCoordinates = () => {
        if(!geolocationAPI){
            setError('Geolocation API is not available in your browser!')
        }else{
            geolocationAPI.getCurrentPosition((position) => {
                const { coords } = position;
                setLoc(coords.latitude);
                setLong(coords.longitude);
            }, (error) => {
                setError('Something went wrong getting your position!')
            })
        }
    }
    getUserCoordinates();
    return (
        <>

        <p>Your coordinates are: {[loc, long]}</p>
        
        </>
    )
}

export default GetLocal