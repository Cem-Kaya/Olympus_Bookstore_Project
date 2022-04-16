import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import React from 'react';

const Container = styled.div`
  width: 50%;
  height: 55vh;
  display: flex;
  position: relative;
  overflow: hidden;
  background-color:pink;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -50}vw);
`;

const Slide = styled.div`
  width: 50vw;
  height: 50vh;
  display: flex;
  align-items: center;
  
`;

const ImgContainer = styled.div`
  height: 50%;
  width: 50%;
  flex: 1;
  position:relative;
`;

const Image = styled.img`
  height: 80%;
  width:80%;
  align-items: center;
  justify-content: center;
  

`;

const InfoContainer = styled.div`
  flex: 1;
  width: 50%;
  padding: 50px;
  height: 50%;
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
 
    return (
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <h1> ---</h1>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item) => (
            <Slide bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <h1>---</h1>
        </Arrow>
      </Container>
    );
  };


  export default Slider;