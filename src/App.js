import React,{useEffect,useState,lazy,Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import WebFont from "webfontloader";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

import Header from './component/layout/Header/Header.jsx';
import Footer from './component/layout/Footer/Footer.jsx';
import Home from './component/Home/Home.jsx';
import LoginSignup from './component/User/LoginSignup.jsx';

import APIURL from './API/Api.js';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import { getCarts} from './actions/cartActions.js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Loader from './component/layout/Loader/Loader.jsx';

import MobileViewHeader from './component/layout/MobileViewHeader/MobileViewHeader.jsx';

import Payment from './component/Cart/Payment';
import CreateCart from './component/User/CreateCart.jsx';
import CartDetails from './component/Cart/CartDetails.jsx';

import Cart from './component/Cart/Cart.jsx';
import About from './component/About/About.jsx'
import Contact from './component/Contact/Contact.jsx'
import Product from './component/Product/Product.jsx';
import Products from './component/Products/Products';

import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import UpdatePassword from './component/User/UpdatePassword';
import AcceptInvitation from './component/User/AcceptInvitation.jsx';

const Shipping = lazy(()=> import('./component/Cart/Shipping'));
const ConfirmOrder = lazy(()=> import('./component/Cart/ConfirmOrder'));
const OrderSuccess = lazy(()=> import('./component/Cart/OrderSuccess'));
const MyOrders = lazy(()=> import('./component/Order/MyOrders'));
const OrderDetails = lazy(()=> import('./component/Order/OrderDetails'));

const Dashboard = lazy(()=> import('./component/Admin/Dashboard'));
const ProductList = lazy(()=> import('./component/Admin/ProductList'));
const NewProduct = lazy(()=> import('./component/Admin/NewProduct'));
const UpdateProduct = lazy(()=> import('./component/Admin/UpdateProduct'));
const OrderList = lazy(()=> import('./component/Admin/OrderList'));
const UpdateOrder = lazy(()=> import('./component/Admin/UpdateOrder'));
const UsersList = lazy(()=> import('./component/Admin/UsersList'));
const UpdateUser = lazy(()=> import('./component/Admin/UpdateUser'));
const ProductReviews = lazy(()=> import('./component/Admin/ProductReviews'));

function App() {
  const dispatch = useDispatch();
  const {loading,isAuthenticated,user} = useSelector(state=>state.user);

  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey (){
    const config = {header : {"Content-Type":"application/json"},withCredentials: true};

    const {data} = await axios.get(`${APIURL}/stripeapikey`,config);
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());
    
  }, [dispatch]);

  useEffect(() => {
    if(isAuthenticated && isAuthenticated===true){
      getStripeApiKey();
      dispatch(getCarts())
    }
    
  }, [isAuthenticated,dispatch]);

  
  const ProtectedRoute = ({ element, isAdmin}) => {

      if (loading === false && isAuthenticated === false) {
        return <Navigate to = "/login"/> 
      }

      if (isAdmin === true && user && user.role && user.role !== "admin") {
        return <Navigate to = "/login"/> 
      }
  
    return isAuthenticated && element;
  };

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  

  return (
    <Router>
        <Header/>
        <Routes>
           <Route exact path="/" Component={Home}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route exact path="/login" Component={LoginSignup}/>

           <Route path='/cart' element={<Cart/>}/>

           <Route path='/cart/:id' element={<CartDetails/>}/>

           <Route path='/products' element={<Products/>}/>
           <Route exact path='/product/:id' element={<Product/>}/>
           <Route path='/products/:keyword' element={<Products/>}/>

           <Route path='/password/forgot' element={<ForgotPassword/>}/>
           <Route path='/password/reset/:token' element={<ResetPassword/>}/>

           <Route path='/accept-invitation' element={<AcceptInvitation/>}/>

           <Route path='/account' element={<ProtectedRoute element={<Profile/>} />}/>
           <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile/>} />}/>
           <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword/>} />}/>
  
           <Route path='/create/Cart' element={<ProtectedRoute element={<CreateCart/>} />}/>

           <Route path='/shipping/:cartId' element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><Shipping/></Suspense>} />}/>
           <Route exact path="/order/confirm/:cartId" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><ConfirmOrder/></Suspense>} />}/>
           
           <Route exact path="/success" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><OrderSuccess/></Suspense>} />}/> 
           <Route exact path="/orders" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><MyOrders/></Suspense>} />}/>
           <Route exact path="/order/:id" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><OrderDetails/></Suspense>} />}/>

           <Route path={"/admin/dashboard"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><Dashboard/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/products"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><ProductList/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/product"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><NewProduct/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/product/:id"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UpdateProduct/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/orders"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><OrderList/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/orders/:id"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UpdateOrder/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/users"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UsersList/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/user/:id"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UpdateUser/></Suspense>} isAdmin={true}/>}/>

           <Route path={"/admin/reviews"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><ProductReviews/></Suspense>} isAdmin={true}/>}/>
          
          {isAuthenticated  && isAuthenticated === true && stripeApiKey && (
          <Route exact path={"/process/payment/:cartId"} element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          )}

        </Routes>
       
        <Footer/>
        <MobileViewHeader/>
    </Router>
  
  );
}

export default App;
