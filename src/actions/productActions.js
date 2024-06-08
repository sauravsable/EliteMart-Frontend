import axios from 'axios';

import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS  
} from "../constants/productConstants";

import APIURL from '../API/Api';

export const getProduct = (keyword = "",currentPage=1, price=[0,100000],category,rating = 0)=> async(dispatch)=>{
    try{
        dispatch({
            type : ALL_PRODUCT_REQUEST
        });

        let link = `${APIURL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

        if(category){
            link = `${APIURL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const {data} = await axios.get(link);
        
        dispatch({
            type : ALL_PRODUCT_SUCCESS,
            payload  : data
        })
    }
    catch(error){
        dispatch({
            type : ALL_PRODUCT_FAIL,
            payload : error.response.data.message
        });
    }
};

export const getAdminProduct = ()=> async(dispatch)=>{
    try{
        dispatch({
            type : ADMIN_PRODUCT_REQUEST
        });

        const config = { header : {"Content-Type" : "application/json"}, withCredentials : true };

        const {data} = await axios.get(`${APIURL}/admin/products`,config);
        
        dispatch({
            type : ADMIN_PRODUCT_SUCCESS,
            payload  : data
        })
    }
    catch(error){
        dispatch({
            type : ADMIN_PRODUCT_FAIL,
            payload : error.response.data.message
        });
    }
};

// Create New Product (Admin)
export const createProduct = (productData)=> async(dispatch)=>{
    try{
        dispatch({
            type : NEW_PRODUCT_REQUEST
        });

        const config = {header : {"Content-Type":"application/json"}, withCredentials: true}

        const {data} = await axios.post(`${APIURL}/admin/product/new`,productData,config);
        
        dispatch({
            type : NEW_PRODUCT_SUCCESS,
            payload  : data
        })
    }
    catch(error){
        dispatch({
            type : NEW_PRODUCT_FAIL,
            payload : error.response.data.message
        });
    }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" }, withCredentials : true
      };
  
      const { data } = await axios.put(`${APIURL}/admin/product/${id}`,productData,config);
  
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Product (Admin)
export const deleteProduct = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type : DELETE_PRODUCT_REQUEST
        });

        const config = {header : {"Content-Type":"application/json"}, withCredentials: true}

        const {data} = await axios.delete(`${APIURL}/admin/product/${id}`,config);
        
        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload  : data.success
        })
    }
    catch(error){
        dispatch({
            type : DELETE_PRODUCT_FAIL,
            payload : error.response.data.message
        });
    }
};

export const getProductDetail = (id)=> async(dispatch)=>{
    try{
        dispatch({
            type : PRODUCT_DETAIL_REQUEST
        });

        const {data} = await axios.get(`${APIURL}/product/${id}`);
        
        dispatch({
            type : PRODUCT_DETAIL_SUCCESS,
            payload  : data
        })
    }
    catch(error){
        dispatch({
            type : PRODUCT_DETAIL_FAIL,
            payload : error.response.data.message
        });
    }
};

// New Review
export const newReview = (newReviewData)=> async(dispatch)=>{
    try{
        dispatch({
            type : NEW_REVIEW_REQUEST
        });

        const config = {header : {"Content-Type":"application/json"}, withCredentials: true}

        const {data} = await axios.put(`${APIURL}/review`,newReviewData,config);
        
        dispatch({
            type : NEW_REVIEW_SUCCESS,
            payload  : data
        })
    }
    catch(error){
        dispatch({
            type : NEW_REVIEW_FAIL,
            payload : error.response.data.message
        });
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
      dispatch({ type: ALL_REVIEW_REQUEST });
  
      const config = {header : {"Content-Type":"application/json"}, withCredentials: true}

      const { data } = await axios.get(`${APIURL}/reviews?id=${id}`,config);
  
      dispatch({
        type: ALL_REVIEW_SUCCESS,
        payload: data.reviews,
      });
    } catch (error) {
      dispatch({
        type: ALL_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Review of a Product
  export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
  
      const config = {header : {"Content-Type":"application/json"}, withCredentials: true}

      const { data } = await axios.delete(`${APIURL}/reviews?id=${reviewId}&productId=${productId}`,config);
  
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: DELETE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
        type : CLEAR_ERRORS})
}