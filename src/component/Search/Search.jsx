import React, { useState } from 'react'
import './search.css';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();

    const [Keyword,setKeyword] = useState("");

    const searchSubmitHandler = (e)=>{
        e.preventDefault();

        if(Keyword.trim()){
            navigate(`/products/${Keyword}`)
        }
        else{
            navigate("/products"); 
        }

    }

  return (
   <>
   <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input type="text" 
        placeholder='Search a Product'
        onChange={(e)=>{setKeyword(e.target.value)}}
        />
        <input type="submit" value="Search" />
   </form>
   </>
  )
}
