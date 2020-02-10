import React from 'react';
import styled from 'styled-components';
import DrinkItem from './DrinkItem';
const StyledCategory = styled.section`
    width: 100%;
    
    h2 {
        font-size: 24px;
        font-weight: 400;
        color: #818181;
        margin-bottom: 10px;
    }
`;
const StyledDiv = styled.div`
    width: 100%;
    padding-top: 30px;
    border-top: 1px solid #d0d0d0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const CategorySection = ({title, drinks}) => (
    <StyledCategory>
        <h2>{title}</h2>
        <StyledDiv>
            {
                drinks.map(drink => (
                    <DrinkItem title={drink.strDrink} image={drink.strDrinkThumb} key={drink.idDrink} />
                ))
            }
        </StyledDiv>
    </StyledCategory>
);

export default CategorySection;