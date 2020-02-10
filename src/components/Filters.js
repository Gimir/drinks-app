import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './Button';


const StyledSidebar = styled.aside`
    width: 325px;
    min-width: 325px;
    padding-top: 30px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    color: #818181;
`;

const StyledForm = styled.form`
    
    input[type=checkbox] {
        display: none;
    }
    input[type=checkbox] + label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
    }
    input[type=checkbox] + label > span {
        display: block;
        width: 18px;
        height: 20px;
        border: 2px solid #818181;
        background-color: #fff;
        border-radius: 5px;
        margin-right: 20px;
        position: relative;
        transition: .2s;
    }
    input[type=checkbox]:checked + label > span:after {
        border-color: #818181;
    }
    input[type=checkbox] + label > span:after {
        content: "";
        position: absolute;
        width: 3px;
        height: 8px;
        border-right: 3px solid #818181;
        border-bottom: 3px solid #818181;
        border-color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotateZ(40deg);
    }
`;

const Filters = ({ 
    filters, 
    applyFiltersHandler,
    toggleFilterHandler
}) => {
    return (
        <StyledSidebar>
            <StyledForm>
                {
                    filters.map((filter, index) => (
                        <Fragment key={index}>
                            <input type="checkbox"
                                id={filter}
                                value={filter}
                                defaultChecked
                                onChange={e => toggleFilterHandler(e)}
                            />
                            <label htmlFor={filter}>
                                <span></span>
                                <p>{filter}</p>
                            </label>
                            <br />
                        </Fragment>
                    ))
                }
                <Button onClick={applyFiltersHandler}>Apply</Button>
            </StyledForm>
        </StyledSidebar>
    );

    

};

export default Filters;