import React, { Fragment, useEffect, useState } from "react";
import "./CartDetails.css";
import "./cart.css";
import CartItems from "./CartItems";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCart } from "../../actions/cartActions";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData/MetaData";
import { getCartDetails } from "../../actions/cartActions";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../../actions/userActions";
import Members from "../layout/Members/Members";
import { addProductToCart } from "../../actions/cartActions";
import Chat from "../chat/Chat";
import axios from "axios";
import APIURL from "../../API/Api";
import ProductCard from "../layout/ProductCard/ProductCard";

const CartDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cameras,setCameras] = useState();

  const getCameras = async()=>{

    const config = { header : {"Content-Type" : "application/json"}, withCredentials : true };

    const {data} = await axios.get(`${APIURL}/getCameras`,config);

    setCameras(data.products);

    console.log("cameras data",data);
    

  }

  useEffect(() => {
    dispatch(getCartDetails(id));
    dispatch(getAllUsers());

    getCameras();

  }, [dispatch, id]);

  const { cartDetails } = useSelector((state) => state.newcart);

  const increaseQuantity = (productId, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addProductToCart({ cartId: id, productId, quantity: newQty }));
    setTimeout(() => {
      dispatch(getCartDetails(id));
    }, 500);
  };

  const decreaseQuantity = (productId, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addProductToCart({ cartId: id, productId, quantity: newQty }));
    setTimeout(() => {
      dispatch(getCartDetails(id));
    }, 500);
  };

  const deleteCartProduct = (productId) => {
    dispatch(removeProductFromCart({ cartId: id, productId }));
    setTimeout(() => {
      dispatch(getCartDetails(id));
    }, 500);
  };

  const checkoutHandler = () => {
    navigate(`/shipping/${id}`);
  };

  return (
    <Fragment>
    <Fragment>
      <MetaData title="Cart" />
      {cartDetails?.products?.length === 0 ? (
        <div className="emptyCart">
          <h2 className="homeheading" style={{ textTransform: "capitalize" }}>
            {cartDetails.cartName}
          </h2>
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <h2 className="homeheading" style={{ textTransform: "capitalize" }}>
              {cartDetails.cartName}
            </h2>
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartDetails &&
              cartDetails.products &&
              cartDetails.products.length > 0 &&
              cartDetails.products.map((item) => (
                <div className="cartContainer" key={item.product._id}>
                  <CartItems
                    item={item.product}
                    deleteCartProduct={deleteCartProduct}
                    cartId={id}
                  />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product._id, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item?.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product._id,
                          item.quantity,
                          item.product.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.product.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${
                  cartDetails.products && Array.isArray(cartDetails.products)
                    ? cartDetails.products.reduce(
                        (acc, item) =>
                          acc + (item.product.price * item.quantity || 0),
                        0
                      )
                    : 0
                }`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}

      <div className="cartusersdiv ">
        <Members id={id} />
        <div className="usersdiv ">
          <h2 className="homeheading" style={{ textTransform: "capitalize" }}>
            Chat With Cart Members
          </h2>
          <Chat roomId={id} className=""/>
        </div>
      </div>
    </Fragment>
    <>
     <div className="cartdetailcontainer">
        {cameras &&
         cameras.map((product) => <ProductCard product={product} />)}
      </div>
    </>
    </Fragment>
  );
};

export default CartDetails;
