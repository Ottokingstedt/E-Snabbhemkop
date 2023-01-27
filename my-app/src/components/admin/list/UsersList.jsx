import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersDelete, usersFetch } from '../../../features/usersSlice';
import { useEffect } from 'react';
// import userEdit from '../UserEdit';


  
function UsersList(){

    const navigate = useNavigate()
    const {list} = useSelector((state) => state.users)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usersFetch())
    }, [dispatch]);

    const rows = 
    list && 
    list.map((user) => {
        return{
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            Email: user.email,
            isAdmin: user.isAdmin,
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'firstname', headerName: 'Firstname', width: 150},
        { field: 'lastname', headerName: 'Lastname', width: 130 },
        {
          field: 'Email',
          headerName: 'Email',
          width: 130,
        },

        {
            field: 'isAdmin',
            headerName: 'Role',
            width: 80,
            renderCell: (params) => {
                return(
                    <>
                  {params.row.isAdmin ? 
                  ( <Admin>Admin</Admin> 
                  ) : ( 
                  <Customer>Customer</Customer>
                  )}
                  </>
                );
            },
          },
        {
          field: 'actions',
          headerName: 'Action',
          sortable: false,
          width: 170,
          renderCell: (params) => {
            return(
                <Actions>
                     <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
                    <View onClick={() => navigate(`/user/${params.row.id}`)}>
                        View
                    </View>
                </Actions>
            );
        },
        },
      ];
    const handleDelete = (id) => {
    dispatch(usersDelete(id))
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

export default UsersList

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

const Delete = styled.button`
    background-color: red;
`;

const View = styled.button`
    background-color: #02c102;
`

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