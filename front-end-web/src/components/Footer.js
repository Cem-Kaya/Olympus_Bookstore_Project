import React from 'react';
import styled from "styled-components";

const FooterBlock = styled.div`
  width: 100%;
  height: 250px;
  background-color: #282c34;
  float:bottom;
  border-top: 1px solid pink;
`;

const Footer = () => {
  return (
    <FooterBlock></FooterBlock>
  )
}

export default Footer