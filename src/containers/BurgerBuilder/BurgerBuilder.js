import React, { Component } from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Aux from '../../hoc/Auxiliary/Auxiliary'; 

  const  INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
  }

  class BurgerBuilder extends Component {
    state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    }

    addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients }); this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
      this.setState({ purchasing: true });
    }

    // method to check if purchasable needs to be 
    // turned true or false
    updatePurchaseState = (ingredients) => {
      // Make an array from ing. object to get the value
      const sum = Object.keys(ingredients).map((igKey) => {
        // Return ingredients and the value for a given key
        // console.log('ingredients[igKey]', ingredients[igKey]);
        return ingredients[igKey];
      })

      // Sum of all ingredients, reduce, with starting total zero
      // sum is the new sum
      // el is the each element, and is a number, is ingredients[igKey]
      .reduce((sum, el) => {
        return sum + el;
        // sum is zero if no ingredients
      }, 0);

      // Set the state if we add sum is true
      this.setState({ purchasable: sum > 0 });
    }

    purchaseHandler = () => {
      this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
      this.setState({ loading: true });
      // const order = {
      //   ingredients: this.state.ingredients,
      //   price: this.state.totalPrice,
      //   customer: {
      //     name: 'Dan',
      //     address: {
      //       street: 'Elm Street',
      //       zipCode: '34312',
      //       country: 'United States of America'
      //     },
      //     emal: 'test@test.com'
      //   },
      //   deliveryMethod: 'fastest'
      // };
    }

    render() {
      // Copy the state in an immutable way
      const disableInfo = {
        ...this.state.ingredients
      }
      for (let key in disableInfo) {
        // Check disableInfo[key]: true or false, which is 
        // the state ingredients value
        disableInfo[key] = disableInfo[key] <= 0;
      }
      
      return(
        <Aux>
          <Modal 
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
              ingredients={this.state.ingredients}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
              price={this.state.totalPrice} />
          </Modal>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler} 
            disabled={disableInfo} />
        </Aux>
      );
    }
  }

  export default BurgerBuilder;