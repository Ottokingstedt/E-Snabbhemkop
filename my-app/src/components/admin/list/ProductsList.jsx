import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productsDelete } from '../../../features/productsSlice';
import ProductsEdit from '../ProductsEdit';


  
const ProductsList = () => {

    const navigate = useNavigate()
    const {items} = useSelector((state) => state.products)
    const dispatch = useDispatch();

    const rows = 
    items && 
    items.map((item) => {
        return{
            id: item._id,
            imageUrl: item.image.url,
            pName: item.firstname,
            pDesc: item.description,
            price: item.price.toLocaleString()
        }
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'imageUrl', headerName: 'image', width: 80,
        renderCell: (params) => {
            return(
                <ImageContainer>
                    <img src={params.row.imageUrl} alt=""/>
                </ImageContainer>
            );
        },
    },
        { field: 'pName', headerName: 'Name', width: 130 },
        {
          field: 'pDesc',
          headerName: 'Description',
          width: 130,
        },

        {
            field: 'price',
            headerName: 'Price',
            width: 80,
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
                    <ProductsEdit prodId={params.row.id}/>
                    <View onClick={() => navigate(`/product/${params.row.id}`)}>
                        View
                    </View>
                </Actions>
            );
        },
        },
      ];
      const handleDelete = (id) => {
        dispatch(productsDelete(id))
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

export default ProductsList

const ImageContainer = styled.div`
    img {
        height: 40px;
    }
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

const Delete = styled.button`
    background-color: red;
`;

const View = styled.button`
    background-color: #02c102;
`