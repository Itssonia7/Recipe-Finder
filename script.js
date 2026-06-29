
const recipeContainer = document.getElementById("recipe-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchRecipes(query = "") {
    recipeContainer.innerHTML = "<h2>Loading recipes...</h2>";

    try {
        const response = await fetch(API_URL + query);
        const data = await response.json();

        displayRecipes(data.meals);

    } catch (error) {
        recipeContainer.innerHTML =
            "<h2>Something went wrong. Please try again.</h2>";
    }
}

function displayRecipes(meals) {

    recipeContainer.innerHTML = "";

    if (!meals) {
        recipeContainer.innerHTML = "<h2>No recipes found.</h2>";
        return;
    }

    meals.forEach(meal => {

        recipeContainer.innerHTML += `
        <div class="recipe-card">

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h3>${meal.strMeal}</h3>

            <p>${meal.strArea} • ${meal.strCategory}</p>

            <button class="view-btn"
                onclick="window.open('${meal.strSource || meal.strYoutube}','_blank')">
                View Recipe
            </button>

        </div>
        `;

    });

}

searchBtn.addEventListener("click", () => {

    fetchRecipes(searchInput.value.trim());

});

searchInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        fetchRecipes(searchInput.value.trim());

    }

});

fetchRecipes();

