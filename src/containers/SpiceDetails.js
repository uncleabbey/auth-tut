import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../syles/SpiceDetails.css';

const SpiceDetails = (props) => {
  const [food, setFood] = useState({});

  const id = props.match.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://zerohunger-backend.herokuapp.com/api/products/${id}`;
        const { data } = await axios.get(url);
        console.log(data.product);
        setFood(data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <h3>Product Details</h3>
      <div className="cont">
        <div className="food-cont">
          <img src={food.product_img} alt="" />
          <div>
            <h1>{food.name}</h1>
            <h3>CURRENT PRICE: {food.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpiceDetails;
