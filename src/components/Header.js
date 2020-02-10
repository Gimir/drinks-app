import React from 'react';
import styled from 'styled-components';

import coctail from '../images/coctail.svg';

const StyledHeader = styled.header`
    width: 100%;
    height: 70px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 111;

    h1 {
        font-size: 30px;
        color: #ff8a00;   
        font-family: 'Seaweed Script', cursive;
        font-weight: 400;
        margin-right: 40px;
        letter-spacing: 0.5em;
    }
    img {
        width: 27px;
        height: 50px;
    }
`;

const Header = () => (
    <StyledHeader>
        <h1>Coctail DB</h1>
        <img src={coctail} alt="logo" />
    </StyledHeader>
);

export default Header;
