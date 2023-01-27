import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components'; 
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { productsUpdated } from '../../features/productsSlice';

const ProductsEdit = ({prodId}) => {
      const [open, setOpen] = React.useState(false);
      const dispatch = useDispatch();
      const { items, editStatus } = useSelector(state => state.products);
      const [currentProd, setCurrentProd] = useState({})
      const [previewImg, setPreviewImg] = useState("");
      const [productImg, setProductImg] = useState("");
      const [name, setName] = useState("");
      const [category, setCategory] = useState("");
      const [price, setPrice] = useState("");
      const [description, setDescription] = useState("");



      const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFile(file)
      }

      const TransformFile = (file) => {
        const reader = new FileReader();

        if(file){
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setProductImg(reader.result);
            setPreviewImg(reader.result)
          }
        } else{
            setProductImg("");
        }
      }

      const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(
          productsUpdated({
            productImg,
            product:{
              ...currentProd,
              name: name,
              category: category,
              price: price,
              description: description,
            }
        }))
      };
    
      const handleClickOpen = () => {
        setOpen(true);

        let selectedProd = items.filter((item) => item._id === prodId)

        selectedProd = selectedProd[0]

        setCurrentProd(selectedProd);
        setPreviewImg(selectedProd.image.url);
        setProductImg("");
        setCategory(selectedProd.category);
        setName(selectedProd.name);
        setPrice(selectedProd.price)
        setDescription(selectedProd.description)
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      return (
        <div>
          <Edit onClick={handleClickOpen}>
              Edit          
          </Edit>
          <Dialog 
          open={open} 
          onClose={handleClose} 
          fullWidth={true} 
          maxWidth={"md"}>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogContent>
            <StyledEditProduct>
  <StyledForm onSubmit={handleSubmit}>
    <h3>Create a Product</h3>
    <input 
    type="file" 
    accept="image/" 
    onChange={handleProductImageUpload}
    />
    <input 
    type="text"  
    placeholder='name'
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    <select 
    onChange={(e) => 
    setCategory(e.target.value)} 
    value={category} 
    > 
    <option value="Select Category">Select Category</option>
    <option value="Meat-&-Chicken">Meat & Chicken</option>
    <option value="Fish">Fish & Jellyfish</option>
    <option value="Snacks">Snacks</option>
    <option value="Fruits">Fruits</option>
    </select> 
    <input 
    type="number"  
    placeholder='price'
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    /> 
    <input 
    type="text"  
    placeholder='Short description'
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    /> 
      <PrimaryButton type='submit'>
              {editStatus === "pending" ? "Submitting" : "Submit"}
      </PrimaryButton>
  </StyledForm>

<ImagePreview>
{previewImg ? (
<> 
<img src={previewImg} alt="product image!" />
</> 
) : ( <p>Image preview will appear here!</p>
)}
</ImagePreview>
</StyledEditProduct>
    </DialogContent>
        <DialogActions>
              <PrimaryButton onClick={handleClose}>Cancel</PrimaryButton>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

export default ProductsEdit

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #0040ff;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(71, 221, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }`;

const PrimaryButton = styled.button`
padding: 9px 12px;
border-radius: 5px;
font-weight: 400;
letter-spacing: 1.15px;
background-color: #ff5100;
color: #f9f9f9;
border: none;
outline: none;
cursor: pointer;
margin: 0.5rem 0rem;
`;