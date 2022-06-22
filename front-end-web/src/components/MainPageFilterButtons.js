import React, { useState } from 'react'
import styled from "styled-components"
import '../styles/App.css'

const ButtonContainer = styled.div`
    margin-left: 0px;
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 60px;
`;

const MainPageFilterButtons = ({onChangeTag}) => {
  const [activeButtonID, setActiveButtonID] = useState(0)

  return (
    <ButtonContainer>
        <div className="button-group-horizontal">
            <button className={activeButtonID === 0 ? "button-active" : "button"} id='0' onClick={() => {setActiveButtonID(0); onChangeTag("Best Seller")}}>Best Seller</button>
            <button className={activeButtonID === 1 ? "button-active" : "button"} onClick={() => {setActiveButtonID(1); onChangeTag("Top Rated")}}>Top Rated</button>
            <button className={activeButtonID === 2 ? "button-active" : "button"} onClick={() => {setActiveButtonID(2); onChangeTag("New Books")}}>New Books</button>
            <button className={activeButtonID === 3 ? "button-active" : "button"} onClick={() => {setActiveButtonID(3); onChangeTag("Top Deals")}}>Top Deals</button>
        </div>
    </ButtonContainer>
  )
}

export default MainPageFilterButtons