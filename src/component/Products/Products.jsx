import React, { useEffect, useState } from 'react'
import './products.css';
import { useSelector,useDispatch } from 'react-redux';
import {getProduct,clearErrors} from "../../actions/productActions";
import ProductCard from '../layout/ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData/MetaData';
import ProductShimmer from '../Shimmer/ProductShimmer';

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

export default function Products() {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();


    const [currentPage, setcurrentPage] = useState(1);
    const [price, setPrice] = useState([0,100000]);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const setCurrentPageNo = (e)=>{
      setcurrentPage(e);
    }

    const priceHandler = (e,newPrice)=>{
      setPrice(newPrice);
    }

    const {products,loading,error,productsCount,resultPerPage,filteredProductCount} = useSelector(state => state.products);
 
    useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors())
      }
      dispatch(getProduct(keyword,currentPage,price,category,rating));
    },[dispatch,keyword,currentPage,price,category,rating,error,alert]);

    let count  = filteredProductCount;


  return (
    <>
      <MetaData title="Products -- EliteMart"/>
      <h2 className='productsHeading'>Products</h2>
      {
      loading ? 
      <ProductShimmer/>
      :
      <div className="products">
        {
          products && 
          products.map((product)=>(
            <ProductCard key={product._id} product={product}/>
          ))
        }
      </div>
      }

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={25000}/>
        <Typography>Categories</Typography>
          <ul className='categoryBox'>
            {
              categories.map((category)=>(
                <li className='category-link'
                key={category}
                onClick={()=>{setCategory(category)}}
                >
                  {category}
                </li>
              ))
            }
          </ul>
          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider value={rating} onChange={(e,newRating)=>{
              setRating(newRating);
            }}
            valueLabelDisplay='auto'
            aria-labelledby='continous-slider' min={0} max={5}/>
          </fieldset>
      </div>
        {
          resultPerPage < count && 
          <div className="paginationBox">
          <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
          />
        </div>
        }
   </>
  )
}
