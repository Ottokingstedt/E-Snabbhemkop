import { useState } from 'react';

const SubscribeForm = () => {
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState("");

    const Form_URL = `https://app.convertkit.com/integrations/unbounce/4846829/webhook?api_key=szcubOx6j7BJ-7yKWvBq3w`;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(e.target)
        try{
            const response = await fetch (Form_URL, {
                method: "post",
                body: data,
                headers:{
                    accept:"application/json"
                },
            })
            setEmail("")
            const json = await response.json()

            if (json.status === "success"){
                setStatus("SUCCESS")
                return
            }
        } catch(err){
            setStatus("ERROR")
            console.log(err)
        } 
    }

    const handleEmailChange = (e) => {
        const {value} = e.target 
        setEmail(value)
    }
  return (
    <>
    <div>
        {status === "SUCCESS" && (
            <p>
              Welcome board{email ? `, ${email}` : ""}{" "}
              <span role="img" aria-label="flight">
              ✈️
              </span>  
                 <p>
               Just friendly remind you check your inbox to confirm the subscription!
            </p>
            </p>
        )}{status === "ERROR" && (
            <div>
            <p>Oops, something went wrong...</p>
            <p>
                Please, {""}
                <button onClick={() => setStatus(null)}>try again</button>
            </p>
            </div>
        )}
        {status === null && (  
    <form className="input-group input-control" onSubmit={handleSubmit}>
    <input 
    type="email" 
    name="email-address"
    className='form-control py-1'
    placeholder="Your Email Address"
    aria-label="Your Email Address"
    aria-describedby='basic-addon2'
    required
    onChange={handleEmailChange}
    value={email}
    />
    <button className='input-group-text py-3' id='basic-addon2'>
        Subscribe
    </button>
</form>)}
</div>
</> )
}

export default SubscribeForm
