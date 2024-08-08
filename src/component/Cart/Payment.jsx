import React, { Fragment, useEffect, useRef,useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { useNavigate } from "react-router-dom";
import APIURL from "../../API/Api";
import { useParams } from "react-router-dom";
import { getCartDetails } from "../../actions/cartActions";
const Payment = () => {
  const navigate = useNavigate();
  const {cartId} = useParams();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const {cartDetails} = useSelector((state)=>state.newcart);

  const [cartItemsToDisplay, setCartItemsToDisplay] = useState([]);

  useEffect(() => {
    if (cartId !== 'myCart') {
      dispatch(getCartDetails(cartId));
    }
  }, [cartId, dispatch]);

  useEffect(() => {
    console.log("cartDetails: ", cartDetails);

    const fetchedCartItems = cartDetails && cartDetails.products && cartDetails.products.length > 0 ? cartDetails.products.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0].url,
      stock: item.product.stock,
      quantity: item.quantity,
    })) : [];

    const itemsToDisplay = cartId === 'myCart' ? cartItems : fetchedCartItems;
    setCartItemsToDisplay(itemsToDisplay);
    console.log("cart display items", itemsToDisplay);

  }, [cartDetails, cartItems, cartId]);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItemsToDisplay,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {header : {"Content-Type":"application/json"},withCredentials: true} ;
      const { data } = await axios.post(`${APIURL}/payment/process`,paymentData,config);
      console.log(data);
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
        console.log(result.error.message);
        
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <section style={{paddingTop:"120px"}}>
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      </section>
    </Fragment>
  );
};

export default Payment;