/* API KEY:9bd96907-1584-4479-850a-72eeb377c6f1 */ const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async function() {
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40");
        const data = await response.json();
        console.log(response);
        console.log(data);
        if (!response.ok) throw new Error(`${data.message} ${response.status}`);
        console.log(data.data);
        let { recipe } = data.data;
        // console.log( recipe );
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (err) {
        console.log("Error Ocurrered");
        alert(err);
    }
};
showRecipe(); // fetch('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=9bd96907-1584-4479-850a-72eeb377c6f1');

//# sourceMappingURL=index.62406edb.js.map
