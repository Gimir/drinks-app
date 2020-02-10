import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 50px;
    img {
        width: 150px;
        height: 150px;
        margin-bottom: 20px;
    }
    h3 {
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #000;
    }

    @media (max-width: 1200px) {
        width: 150px;
        margin-right: 5px;
    }
`;

const DrinkItem = ({title, image}) => (
    <StyledDiv>
        <img src={image} alt={title} />
        <h3>{title}</h3>
    </StyledDiv>
);

export default DrinkItem;