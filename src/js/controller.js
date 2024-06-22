// import { search } from 'core-js/fn/symbol';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime';
import searchView from './views/searchView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// KEY:04477cbd-a616-4574-99ac-2ba16d85231c

if(module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    // 1)Loading Recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    // const {recipe} = model.state;

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {

    resultsView.renderSpinner();
    // 1.)Get query
    const query = searchView.getQuery();
    if (!query) return;


    // 2.)Load Search Results
    await model.loadSearchResults(query);

    // 3.)Render Results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.error(err);
  }
};

// controlSearchResults();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
