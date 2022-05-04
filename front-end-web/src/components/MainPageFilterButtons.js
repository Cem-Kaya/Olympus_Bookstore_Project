import React from 'react'
import styled from "styled-components"
import '../App.css';

const ButtonContainer = styled.div`
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 60px;
`;

const MainPageFilterButtons = () => {
  return (
    <ButtonContainer>
        <div className="button-group-horizontal">
            <button className="button">Best Seller</button>
            <button className="button">Top Rated</button>
            <button className="button">New Books</button>
            <button className="button">Top Deals</button>
        </div>
    </ButtonContainer>
  )
}

export default MainPageFilterButtons