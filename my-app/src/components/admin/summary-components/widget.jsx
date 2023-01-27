import React from 'react'
import styled from 'styled-components'

const widget = ({data}) => {
  return (
<StyledWidget>
<Icon color={data.color} bgcolor={data.bgColor}>
    {data.icon}
</Icon>
<Text>
    <h3>
        {
            data.isMoney ? data.digits?.toLocaleString() + "KR" : 
            data.digits?.toLocaleString()
        }
    </h3>
    <p>
        {data.title}
    </p>
</Text>
{data.percentage < 0 ? <>
    <Percentage isPositive = {false}>
        {Math.floor(data.percentage) + "%"}
    </Percentage>
</> : <>
    <Percentage isPositive = {true}>
            {Math.floor(data.percentage) + "%"}
    </Percentage>
</>}
</StyledWidget> 

)
}

export default widget

const StyledWidget = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
    margin-right: 0.1rem;
    padding: 1.5rem;
    color: ${({ color }) => color};
    background: ${({ bgColor }) => bgColor};
    border-radius: 3px;
    font-size: 20px;
`;

const Text = styled.div`
    h3{
        font-weight: 700;
    }
    p{
        font-size: 14px;
        color: rgda(234, 234, 255, 0.68);
        margin-top: -10px;
    }
`;

const Percentage = styled.div`
    margin-left: 0.5rem;
    font-size: 14px;
    color: ${({ isPositive }) => 
        isPositive ? "rgb(114, 225, 40)" : "rgb(255, 77, 73"};
`



