import React from 'react'
import styled from "styled-components"
import '../App.css';

const ButtonContainer = styled.div`
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 60px;
`;

const MainPageFilterButtons = ({onChangeTag}) => {
  return (
    <ButtonContainer>
        <div className="button-group-horizontal">
            <button className="button" onClick={() => onChangeTag("Best Seller")}>Best Seller</button>
            <button className="button" onClick={() => onChangeTag("Top Rated")}>Top Rated</button>
            <button className="button" onClick={() => onChangeTag("New Books")}>New Books</button>
            <button className="button" onClick={() => onChangeTag("Top Deals")}>Top Deals</button>
        </div>
    </ButtonContainer>
  )
}

export default MainPageFilterButtons