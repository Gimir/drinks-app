import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    width: 188px;
    height: 39px;
    border: none;
    border-radius: 10px;
    background-color: #4E4E4E;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 39px;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;

    &:hover {
        opacity: 0.8;
    }
`;

const Button = ({children, onClick}) => (
    <StyledButton onClick={e => {
        e.preventDefault();
        onClick();
    }}>
        {children}
    </StyledButton>
);

export default Button;