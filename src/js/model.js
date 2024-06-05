import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    console.log(res);
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(`${data.message} ${data.status}`);
    }

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (err) {
    console.log(err);
  }
};
