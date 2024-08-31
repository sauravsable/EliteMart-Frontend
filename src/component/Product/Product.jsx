import React, { Fragment, useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./product.css";
import { TbShoppingCartShare } from 'react-icons/tb';
import { IoMdClose } from 'react-icons/io';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetail,
  newReview,
} from "../../actions/productActions";
import ReviewCard from '../layout/ReviewCard/ReviewCard.jsx'
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData/MetaData.jsx";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {addProductToCart} from '../../actions/cartActions.js';
import { ADD_PRODUCT_TO_CART_RESET } from "../../constants/cartConstants.js";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);

  const { isAuthenticated} = useSelector((state) => state.user);
  const {carts} = useSelector(state=> state.newcart);

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );


  const { isAdded, error: productError } = useSelector(
    (state) => state.cartProduct
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    setShowOptions(false)
  };

  const addProductToCartHandler = (e,cartId)=>{
    e.preventDefault();
    dispatch(addProductToCart({cartId,productId:id,quantity}));
    setShowOptions(false);
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    if (productError) {
      alert.error(productError);
      dispatch(clearErrors());
    }
    
    if (isAdded) {
      alert.success("Product Added to Cart Successfully");
      dispatch({ type: ADD_PRODUCT_TO_CART_RESET });
    }


    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert, reviewError, success,productError,isAdded]);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- EliteMart`} />
          <div className="ProductDetails">
            <div>
              <Carousel className="imageCarousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button className="addtocartbtn"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={handleButtonClick}
                  >
                    Add to Cart
                  </button>
                  {showOptions && (
                    <div className="options-container">
                      <IoMdClose className="close-icon" onClick={()=>{setShowOptions(false)}} />
                      <h6 style={{color:"white"}}>Select Cart</h6>
                      
                      <button className="option-button" onClick={addToCartHandler}><TbShoppingCartShare /> My Cart</button>
                      {isAuthenticated && isAuthenticated === true && carts && carts.length > 0 ? 
                        carts.map((cart) => (
                        <button key={cart.id} className="option-button" 
                            onClick={(e) => addProductToCartHandler(e,cart._id)}>
                          <TbShoppingCartShare /> {cart.cartName}
                        </button>
                      ))
                      :
                      <button className="option-button" onClick={()=>{navigate("/create/Cart")}}>Others</button>
                      }
                    </div>
                    )}
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;