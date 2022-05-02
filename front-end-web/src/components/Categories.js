import {
    DoubleArrow,
} from "@material-ui/icons";

import React from 'react';
import styled from "styled-components";
import '../App.css';
import { useNavigate } from "react-router-dom";

const TextStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Categories = () => {

    let navigate = useNavigate();

    const categories = ["Classics", "History", "Fiction", "Science", "Foreign Language", "Comics",
    "Philosophy", "Self-Development", "Children", "Religious", "Textbook"]

    return (
        <div className="button-group-vertical">
            {categories.map((element, index) => (
                <button className='button' key={index}
                    onClick={() => {
                        navigate(`/Search/category=${element}/&author=*/&publisher=*/&language=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
                    }}>
                    <TextStyle>{element}
                        <DoubleArrow/>
                    </TextStyle>
                </button>
            ))}
        </div>
  )
}

export default Categories