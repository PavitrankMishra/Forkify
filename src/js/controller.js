import * as model from "./model";
import recipeView from "./views/recipeView";

import 'core-js/stable';
import 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// KEY:04477cbd-a616-4574-99ac-2ba16d85231c

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return;
    // 1)Loading Recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    // const {recipe} = model.state;

    // Rendering recipe
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    console.error(err);
  }
};

showRecipe();
['hashchange', 'load'].forEach(ev => window.addEventListener(ev,showRecipe));

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load',showRecipe);