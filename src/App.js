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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Loader from './component/layout/Loader/Loader.jsx';
import ProductShimmer from './component/Shimmer/ProductShimmer.jsx';


const Cart = lazy(()=> import("./component/Cart/Cart.jsx"));
const About = lazy(()=> import("./component/About/About"));
const Contact = lazy(()=> import("./component/Contact/Contact"));
const Product = lazy(()=> import('./component/Product/Product'));
const Products = lazy(()=> import("./component/Products/Products"));

const Profile = lazy(()=> import("./component/User/Profile"));
const UpdateProfile = lazy(()=> import("./component/User/UpdateProfile"))
const ForgotPassword = lazy(()=>import('./component/User/ForgotPassword'));
const ResetPassword = lazy(()=>import('./component/User/ResetPassword'));
const UpdatePassword =  lazy(()=> import('./component/User/UpdatePassword'));

const Shipping = lazy(()=> import('./component/Cart/Shipping'));
const ConfirmOrder = lazy(()=> import('./component/Cart/ConfirmOrder'));
const Payment = lazy(()=> import('./component/Cart/Payment'));
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
 

    if(isAuthenticated===true){
      getStripeApiKey();
      console.log(setstripeApiKey);
    }
    
  }, []);

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
           <Route path='/about' element={<Suspense fallback={<Loader/>}><About/></Suspense>}/>
           <Route path='/contact' element={<Suspense fallback={<Loader/>}><Contact/></Suspense>}/>
           <Route exact path="/login" Component={LoginSignup}/>

           <Route path='/cart' element={<Suspense fallback={<Loader/>}><Cart/></Suspense>}/>
           <Route path='/products' element={<Suspense fallback={<ProductShimmer/>}><Products/></Suspense>}/>
           <Route exact path='/product/:id' element={<Suspense fallback={<Loader/>}><Product/></Suspense>}/>
           <Route path='/products/:keyword' element={<Suspense fallback={<ProductShimmer/>}><Products/></Suspense>}/>

           <Route path='/password/forgot' element={<Suspense fallback={<Loader/>}><ForgotPassword/></Suspense>}/>
           <Route path='/password/reset/:token' element={<Suspense fallback={<Loader/>}><ResetPassword/></Suspense>}/>


           <Route path='/account' element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><Profile/></Suspense>} />}/>
           <Route path="/me/update" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UpdateProfile/></Suspense>} />}/>
           <Route path="/password/update" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><UpdatePassword/></Suspense>} />}/>
  
           <Route path='/shipping' element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><Shipping/></Suspense>} />}/>
           <Route exact path="/order/confirm" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><ConfirmOrder/></Suspense>} />}/>
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
          
          {isAuthenticated && (
          <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          )}

        </Routes>
        <Footer/>
    </Router>
  
  );
}

export default App;
