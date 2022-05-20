import {
    DoubleArrow,
} from "@material-ui/icons";

import React from 'react';
import styled from "styled-components";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const TextStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Categories = ({categories}) => {

    let navigate = useNavigate();

    const categoryList = ["Classics", "History", "Fiction", "Science", "Foreign Language", "Comics",
    "Philosophy", "Self-Development", "Children", "Religious", "Textbook"]

    const [items, setItems] = useState([])
  
    useEffect (() => {
        setItems(categories)
    }, [categories])

    const getCategories = () => {
        let categoryList = []
        for (var key of Object.keys(items)) {
            categoryList.push(items[key])
        }
        return categoryList
    }

    return (
        <div className="button-group-vertical">
            {getCategories().map((element, index) => (
                <button className='button' key={index}
                    onClick={() => {
                        navigate(`/Search/category=${element}/&author=*/&publisher=*/&pr_lower=*/&pr_upper=*/&raiting=*`)
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