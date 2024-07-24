import React, { useState } from "react";
// import './App.css'

let stars = ["⭐", "⭐ ⭐", "⭐ ⭐ ⭐", "⭐ ⭐ ⭐ ⭐", "⭐ ⭐ ⭐ ⭐ ⭐"];

function RateAndReview(props) {
  
  function GiveRating() { 
    return <h3>{stars[props.rating - 1]}</h3>
  } 

  return (props.rating > 0 && props.rating <= 5) ? GiveRating() : null;

}

export default RateAndReview

