import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Spice from '../components/Spice';
import '../syles/Spices.css';

const Spices = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const url =
          'https://zerohunger-backend.herokuapp.com/api/products?page=1';
        const { data } = await axios.get(url);
        console.log(data.results);
        setFoods([...data.results]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchFood();
  }, []);
  return (
    <div>
      <h1>List of Product</h1>
      {isLoading && <Loading />}
      <div className="spice-cont">
        {foods.map((food) => (
          <Spice food={food} key={food.id} />
        ))}
      </div>
    </div>
  );
};

export default Spices;
