import {
    DoubleArrow,
} from "@material-ui/icons";

import React from 'react';
import styled from "styled-components";
import '../App.css';

const TextStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Categories = () => {
  return (
        <div className="btn-group-vertical">
            <button className='button'>
                <TextStyle>Classics
                    <DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    History<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Fiction<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Science<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Foreign Language<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Philosophy<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Comics<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Self-Development<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Children<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Religious<DoubleArrow/>
                </TextStyle>
            </button>
            <button className='button'>
                <TextStyle>
                    Textbook<DoubleArrow/>
                </TextStyle>
            </button>
        </div>
  )
}

export default Categories