import {
    FavoriteBorderOutlined,
    SearchOutlined,
    AddShoppingCart,
  } from "@material-ui/icons";
  import styled from "styled-components";
  
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 200px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  {/*rgba(0, 0, 0, 0.2); */}
  const TextBoxContainer = styled.div`
    color: white;
    width: 100%;
    height: 45%;
    position: absolute;
    flex-direction: column;
    padding-top: 2px;
    background-color: #282c34; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  `;

const TextBoxTitle = styled.div`
    font-size:20px;
`;

const TextBoxAuthor = styled.div`
    font-size:14px;
    font-style: italic;
`;
const TextBoxPublisher = styled.div`
    font-size:12px;
    font-style: italic;
`;

const TextBoxPrize = styled.div`
    font-size:18px;
`;
  const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    justify-content: space-between;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.2);
  `;
  
  const Image = styled.img`
    padding-top:10px;
    height: 50%;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;


  const Product = ({ item }) => {
    return (
      <Container>
        <InnerContainer>
            <Image src={item.img} />
            <TextBoxContainer>  
                <TextBoxTitle>{item.title}</TextBoxTitle>
                <TextBoxAuthor style={{marginTop: "8px"}}>{"Author: " + item.author}</TextBoxAuthor>
                <TextBoxPublisher style={{marginBottom: "8px"}}>{"Publisher: " + item.publisher}</TextBoxPublisher>
                <TextBoxPrize>{item.price}</TextBoxPrize>
            </TextBoxContainer>
        </InnerContainer>
        <Info>
          <Icon>
            <SearchOutlined />
          </Icon>
          <Icon>
            <AddShoppingCart />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </Info>
      </Container>
    );
  };
  
  export default Product;