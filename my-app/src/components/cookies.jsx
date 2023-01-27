import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import CookieConsent,  
{
    getCookieConsentValue,
    Cookies,
  } from "react-cookie-consent";
import initGA from '../features/gautilis';


 const CookiesBanner = () => {
    const handleAcceptCookie = () => {
        if(process.env.REACT_APP_GOOGLE_ANALYTICS_ID){
            initGA(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
        }
    }
    const handleDeclineCookie = () => {
        Cookies.remove("_ga");
        Cookies.remove("_gat");
        Cookies.remove("_gid");
    }

    useEffect(() => {
        const isConsent = getCookieConsentValue();
        if (isConsent === "true"){
            handleAcceptCookie();
        } 
    }, []);
  return (
<>
<CookieConsent
enableDeclineButton
onAccept={handleAcceptCookie}
onDecline={handleDeclineCookie}
style={{
    background: '#dbd9d9',
}}
buttonStyle={{ color: "#ffffff", fontSize: "16px", background:'#F57600', borderRadius: "10px", marginRight:"50px",marginTop:"50px", position:"relative", width:"100px", height:"50px", border:"#F57600 1px solid"}}
declineButtonStyle={{color: "#000000", fontSize: "16px", background:'#ffd9c1', marginRight:"100px", borderRadius: "10px", marginBottom:"50px",  width:"100px", height:"50px", border:"#F57600 1px solid"}}
buttonText="Yes"
declineButtonText="No"
buttonClasses="cookiesButtonAccept"
declineButtonClasses="cookiesButtonDecline"
flipButtons
>
<h2 className='text-black mx-5 position-absolute cookieTitle'>Cookies &#x1F36A;</h2>
<p className='text-black fs-6 mx-5 mb-3 position-absolute cookieSub'> We use cookies in this website to give you the best experience on our
        site and show you relevant ads. <br/>To find out more, read our
        <Link> privacy policy</Link>and  <Link> cookie policy</Link>.</p>
</CookieConsent>
</>
  )
}

export default CookiesBanner