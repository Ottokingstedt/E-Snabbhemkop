import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {url, setHeaders} from '../../../features/api';
import moment from 'moment';

const Transactions = () => {
const [orders, SetOrders] = useState([]);
const [isloading, setIsLoading] = useState(false);

useEffect(() => {
async function fetchData(){
    setIsLoading(true)
    try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());

        SetOrders(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
    fetchData();
}, []);

return ( 
<StyledTransactions>
    {isloading ? (
        <p>Transactions loading...</p>
    ) : (
        <>
            <h3 className='text-white'>Latest Transactions</h3>
            {
                orders?.map((order, index) => <Transaction key={index}>
                    <p>{order.shipping.name}</p>
                    <p>{(order.total/100).toLocaleString()} KR</p>
                    <p>{moment(order.createdAt).fromNow()}</p>

                </Transaction>)
            }
        </>    
    )}
</StyledTransactions>
);
}

export default Transactions

const StyledTransactions = styled.div`
    background: rgb(48, 51, 78);
    color: whitesmoke;
    padding: 1rem;
    border-radius: 5px;
`;

const Transaction = styled.div`
    display: flex;
    font-size: 14px;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 3px;
    background: rgba(38, 198, 249, 0.12);
    p{
        flex: 1;
    }
    &:nth-child(even){
        background: rgba(102, 108, 255, 0.12);
    }
    
`; 