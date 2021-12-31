import { useEffect, useState } from 'react';

import UseHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

const request = {
  url: 'https://food-order-app-6219c-default-rtdb.firebaseio.com/meals.json',
};

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const {
    error: mealsFetchError,
    fetchHandler: fetchMealsHandler,
    isLoading,
  } = UseHttp();

  const setMealsData = (data) => {
    const mealsData = [];
    for (const key in data) {
      mealsData.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      });
    }
    setMeals(mealsData);
  };

  useEffect(() => {
    fetchMealsHandler(request, setMealsData);
  }, [fetchMealsHandler]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const content = (
    <Card>{meals.length > 0 ? mealsList : <p>{mealsFetchError}</p>}</Card>
  );
  const loader = <Card>{<p>Loading...</p>}</Card>;

  return (
    <section className={classes.meals}>{isLoading ? loader : content}</section>
  );
};

export default AvailableMeals;
