import React from 'react';
import { Link } from 'react-router-dom';

const Spice = ({ food }) => {
  return (
    <div>
      <Link to={`/spices/${food.id}`}>
        <img src={food.product_img} alt="" />
        <h5>{food.name}</h5>
        <p>₦{food.price}</p>
      </Link>
    </div>
  );
};

export default Spice;
