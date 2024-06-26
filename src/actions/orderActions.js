import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,    
    CLEAR_ERRORS  
}
from '../constants/orderConstants';

import axios from 'axios';
import APIURL from '../API/Api';

// Create Order
export const createOrder = (order) => async (dispatch)=>{
    try{
        dispatch({
            type : CREATE_ORDER_REQUEST 
        });

        const config = {header: {"Content-Type" : "application/json"},withCredentials : true};

        const {data} = await axios.post(`${APIURL}/order/new`,order,config);
        
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})

    }
    catch(error){
        dispatch({
            type : CREATE_ORDER_FAIL,
            payload : error.response.data.message 
        })
    }  
};

// My Order
export const myOrder = () => async (dispatch)=>{
    try{
        dispatch({
            type : MY_ORDER_REQUEST 
        });

        const config = {header: {"Content-Type" : "application/json"}, withCredentials : true};

        const {data} = await axios.get(`${APIURL}/myorders`,config);
        
        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.orders
        })

    }
    catch(error){
        dispatch({
            type : MY_ORDER_FAIL,
            payload : error.response.data.message 
        })
    }  
};


// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const config = {header: {"Content-Type" : "application/json"}, withCredentials : true}

      const { data } = await axios.get(`${APIURL}/admin/orders`,config);
  
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update Order
  export const updateOrder = (id, order) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });
  
      const config = {header: {"Content-Type" : "application/json"}, withCredentials : true};

      const { data } = await axios.put(`${APIURL}/admin/order/${id}`,order,config );
  
      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Order
  export const deleteOrder = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });

      const config = {header: {"Content-Type" : "application/json"}, withCredentials : true};

      const { data } = await axios.delete(`${APIURL}/admin/order/${id}`,config);
  
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  

// Order Detail
export const orderDetails = (id) => async (dispatch)=>{
    try{
        dispatch({
            type : ORDER_DETAIL_REQUEST
        });

        const config = {header: {"Content-Type" : "application/json"}, withCredentials : true};

        const {data} = await axios.get(`${APIURL}/order/${id}`,config);
        
        dispatch({
            type:ORDER_DETAIL_SUCCESS,
            payload:data.order
        })

    }
    catch(error){
        dispatch({
            type : ORDER_DETAIL_FAIL,
            payload : error.response.data.message 
        })
    }  
}

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
        type : CLEAR_ERRORS})
}
