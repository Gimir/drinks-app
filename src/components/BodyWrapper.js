import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const BodyWrapper = ({children}) => (
    <StyledWrapper>
        {children}
    </StyledWrapper>
);

export default BodyWrapper;