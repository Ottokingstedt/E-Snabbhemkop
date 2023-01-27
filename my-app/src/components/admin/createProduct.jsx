import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { productsCreate } from '../../features/productsSlice';
import { PrimaryButton } from './layoutStyled';

const CreateProduct = () => {
 const dispatch = useDispatch(); 
 const { createStatus } = useSelector((state) => state.products);

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
      }
    } else{
        setProductImg("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        category,
        price,
        description,
        image: productImg,
    }))
  };
  return (
<>
<StyledCreateProduct>
  <StyledForm onSubmit={handleSubmit}>
    <h3>Create a Product</h3>
    <input 
    type="file" 
    accept="image/" 
    onChange={handleProductImageUpload}
    />
    <input 
    type="text" 
    required 
    placeholder='name'
    onChange={(e) => setName(e.target.value)}
    />
    <select 
    onChange={(e) => setCategory(e.target.value)}
    > 
    <option value="Choice">Choice</option>
    <option value="Meat-&-Chicken">Meat & Chicken</option>
    <option value="Fish">Fish & Jellyfish</option>
    <option value="Snacks">Snacks</option>
    <option value="Fruits">Fruits</option>
    </select> 
    <input 
    type="number" 
    required 
    placeholder='price'
    onChange={(e) => setPrice(e.target.value)}
    /> 
    <input 
    type="text" 
    required 
    placeholder='description'
    onChange={(e) => setDescription(e.target.value)}
    /> 
    <PrimaryButton type='submit'>
    {createStatus === "pending" ? "Submitting" : "Submit"}
    </PrimaryButton>
  </StyledForm>
<ImagePreview>
{productImg ? (
<> 
<img src={productImg} alt="product image!" />
</> 
) : ( <p>Image preview will appear here!</p>
)}
</ImagePreview>
</StyledCreateProduct>
</>  
)
}

export default CreateProduct


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
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
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