// API Key = 296e8af9-a496-463a-b03e-1dd93f31a062;
console.log("Welcome to website");

function getRecipe(index) {
fetch ("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&apikey=296e8af9-a496-463a-b03e-1dd93f31a062")
.then((response) => {
    // console.log(response);
    return response.json();
})
.then((actualData) => {
    const myData = actualData.data.recipes;
    console.log(myData);
    document.getElementById('sec-1').innerHTML = myData[`${index}`].title;

})
.catch((error) => {
    console.log(error);
})

}

getRecipe(25);
getRecipe(20);
getRecipe(15);
getRecipe(10);