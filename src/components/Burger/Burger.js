import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

 const burger = (props) => {
   // make an array
  // const transformedIngredients = Object.keys(props.ingredients)
  //   .map((igKey) => {
  //     return [...Array(props.ingredients[igKey])].map((_, index) => {
  //       return <BurgerIngredient 
  //         key={igKey + index}
  //         type={igKey} />;
  //     })
  //   })

  /*
  Declare an ingredients array that will hold the BurgerIngredient
  components.
  */
  let ingredients = [];
 
  // Loop through every key in the props.ingredients object
  for (const ingKey in props.ingredients) {
    /*
    For every key, use a for loop that iterates as many times as the value
    contained in each key. For every iteration, add a BurgerIngredient to the
    ingredients array.
    */
    for (let i = 0; i < props.ingredients[ingKey]; i++) {
      ingredients.push(<BurgerIngredient key={ingKey + i} type={ingKey} />);
    }
  }
  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
};

export default burger;
