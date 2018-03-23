import React from 'react';
import Aux from '../../../hoc/Auxiliary'; 
import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
  // Make an array from ingredients object
  const ingredientsSummary = Object.keys(props.ingredients).map(
    ingKey => {
      return (
        <li key={ingKey}>
          <span style={{ textTransform: "capitalize" }}>
            {ingKey}
          </span>: {props.ingredients[ingKey]}
        </li>
      );
    }
  );
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>This burger has the ingredients: </p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>
        <strong>
          Total Price: $ {props.price.toFixed(2)}
        </strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;