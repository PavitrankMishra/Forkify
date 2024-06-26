// import { search } from 'core-js/fn/symbol';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime';
import searchView from './views/searchView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// KEY:04477cbd-a616-4574-99ac-2ba16d85231c

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update resultws view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 1)Loading Recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state;

    // Rendering recipe
    recipeView.render(model.state.recipe);
    // controlServings();
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1.)Get query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2.)Load Search Results
    await model.loadSearchResults(query);

    // 3.)Render Results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render initial Pagination Buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1.)Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2.)Render new Pagination Buttons
  paginationView.render(model.state.search);
  console.log(goToPage);
};
// controlSearchResults();

const controlServings = function (newServings) {
  // Update the recipe servings in the (state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
