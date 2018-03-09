import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // gives you an array of the object <ingredients></ingredients> keys
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // make an array 
      // console.log('igKey', igKey)
      // console.log('props.ingredients', Object.keys(props.ingredients))
      // console.log('aaa', [...Array(props.ingredients[igKey])]);
      // ...Array(props.ingredients[igKey]) is an array with 2 elem [ , ]
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log('i',i, igKey)
        // salad + 2 for example
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}
 
export default burger;