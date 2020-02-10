import React from 'react';
import styled from 'styled-components';

import CategorySection from './CategorySection';

const StyledContent = styled.main`
    flex-grow: 1;
    min-height: 90vh;
    background-color: #fff;
    padding: 40px 50px;
    border-left: 1px solid #D0D0D0;
`;

const Content = ({drinks}) => (
    <StyledContent>
        {
            drinks.map((category, index) => (
                <CategorySection title={category.filter} drinks={category.drinks} key={index} />
            ))
        }
    </StyledContent>
);

export default Content;