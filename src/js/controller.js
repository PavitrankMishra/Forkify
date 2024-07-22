// import { search } from 'core-js/fn/symbol';
import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
// import renderMessage from "./views/View";

import 'core-js/stable';
import 'regenerator-runtime';
import searchView from './views/searchView';
import bookMarksView from './views/bookMarksView';
import addRecipeView from './views/addRecipeView';

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

    // 1) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    bookMarksView.update(model.state.bookmarks);

    // 2)Loading Recipe
    await model.loadRecipe(id);
    // const {recipe} = model.state;

    // 3)Rendering recipe
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

const controlAddBookmark = function () {
  // Add/Remove a Bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);

  // Update the recipeView
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookMarksView.render(model.state.bookmarks);
};

const controlBookMarks = function () {
  bookMarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading Spinner
    addRecipeView.renderSpinner();
    
    // Upload the new Recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmarks view
    bookMarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form Window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookMarksView.addHandlerRender(controlBookMarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
