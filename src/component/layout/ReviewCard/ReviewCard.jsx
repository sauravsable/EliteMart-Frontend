import { Rating } from "@material-ui/lab";
// import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../../images/Profile.png";
import './reviewcard.css';

const ReviewCard = ({ review }) => {
    
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      {/* <ReactStars {...options} /> */}
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;