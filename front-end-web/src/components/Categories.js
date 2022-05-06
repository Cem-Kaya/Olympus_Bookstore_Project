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

const Categories = () => {

    let navigate = useNavigate();

    const categories = ["Classics", "History", "Fiction", "Science", "Foreign Language", "Comics",
    "Philosophy", "Self-Development", "Children", "Religious", "Textbook"]

    const [items, setItems] = useState([])
  
    useEffect (() => {
      const getCategories = async () =>  {
        const itemsFromServer = await fetchCategories()
        console.log(itemsFromServer.type)
        setItems(itemsFromServer)
      }
      getCategories()
    }, [])
  
    const fetchCategories = async () => {
      const res = await fetch(`/all_category`     , {headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }}
       )
      const data = await res.json()
  
      console.log(data)
      return data
    }

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