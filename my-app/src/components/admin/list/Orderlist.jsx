import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ordersFetch, ordersUpdated } from '../../../features/orderSlice';

import moment from 'moment';


  
export default function OrdersList(){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {list} = useSelector((state) => state.orders);

    console.log(list)

    useEffect(() => {
        dispatch(ordersFetch())
    }, [dispatch])
    

    const rows = 
    list && 
    list.map((order) => {
        return{
            id: order._id,
            cName: order.shipping.name,
            amount: (order.total / 100)?.toLocaleString(),
            dStatus: order.delivery_status,
            date: moment(order.createdAt).fromNow(),
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'cName', headerName: 'Name', width: 120,
    },
        { field: 'amount', headerName: 'Amount(KR)', width: 100 },
        {
          field: 'dStatus',
          headerName: 'Status',
          width: 100,
          
          renderCell: (params) => {
            return <div>
                {
                params.row.dStatus === "pending" ? (  
                <Pending>Pending</Pending> 
                ) : params.row.dStatus === "dispatched" ? (
                <Dispatched>Dispatched</Dispatched> 
                ) : params.row.dStatus === "delivered" ? ( 
                <Delivered>Delivered</Delivered> 
                ) : (
                "error"
                )}
            </div>
          },
        },

        {
            field: 'date',
            headerName: 'Date',
            width: 120,
          },
        {
          field: 'actions',
          headerName: 'Action',
          sortable: false,
          width: 220,
          renderCell: (params) => {
            return(
         <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}> Dispatch </DispatchBtn>
            <DeliveryBtn onClick={() => handleOrderDelivered(params.row.id)}> Deliver </DeliveryBtn>
            <View onClick={() => navigate(`/order/${params.row.id}`)}>
                        View
            </View>
         </Actions>
            );
        },
    },
];
    const handleOrderDispatch = (id) =>{
        dispatch(ordersUpdated({
            id,
            delivery_status: "dispatched"
        }))
    }

    const handleOrderDelivered = (id) =>{
        dispatch(ordersUpdated({
            id,
            delivery_status: "Delivered"
        }))
    }
  



  return (
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>
    )
}



const DispatchBtn = styled.button`
    background-color: rgb(38, 198, 249);
`;

const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
`;

const View = styled.button`
    background-color: rgb(114, 225, 40);
`;

const Pending = styled.div`
    color:rgb(253, 181, 40);
    background: rgb(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`;

const Dispatched = styled.div`
color: rgb(38, 198, 249);
background-color: rgb(38, 198, 249, 0.12);
padding: 3px 5px;
border-radius: 3px;
font-size: 14px; 
`;

const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background-color: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    `

const Actions = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
button{
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
}
`;