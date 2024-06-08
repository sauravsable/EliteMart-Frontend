import {createStore,combineReducers,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from './reducers/productReducer';
import { allUsersReducer, forgetpasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrderReducer, myOrderReducer, newOrderReducer, orderDetailReducer, orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products : productsReducer,
    productDetail :productDetailReducer,
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgetpasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrderReducer,
    orderDetails : orderDetailReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    product : productReducer,
    allOrders : allOrderReducer,
    order : orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart : {
        cartItems :localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],

        shippingInfo : localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    }

};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;