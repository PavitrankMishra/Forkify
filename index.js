// API Key = 296e8af9-a496-463a-b03e-1dd93f31a062;
console.log("Welcome to website");

async function getRecipe(index) {
  try {
    const jsondata = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&apikey=296e8af9-a496-463a-b03e-1dd93f31a062"
    );
    console.log(jsondata);
    const jsdata = await jsondata.json();
    const mainData = jsdata.data.recipes[`${index}`].title;
    console.log(mainData);

    document.getElementById("sec-1").innerHTML = mainData;
  } catch (error) {
    console.log("The error is: " + error);
  }
}


async function search() {
    const searchbox = document.getElementById("search").value.toUpperCase();
    console.log(searchbox);
}

search();
getRecipe(25);
getRecipe(20);
getRecipe(15);
getRecipe(10);
