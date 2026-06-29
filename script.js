
const recipeContainer = document.getElementById("recipe-container");
const favoritesContainer = document.getElementById("favorites-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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

    meals.forEach((meal) => {

        recipeContainer.innerHTML += `
        <div class="recipe-card">

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <h3>${meal.strMeal}</h3>

            <p>${meal.strArea} • ${meal.strCategory}</p>

            <button class="view-btn"
            onclick="window.open('${meal.strSource || meal.strYoutube}','_blank')">
            View Recipe
            </button>

            <button class="save-btn"
            onclick="saveFavorite(${meal.idMeal},
            '${meal.strMeal.replace(/'/g, "\\'")}',
            '${meal.strMealThumb}')">
            ❤️ Save
            </button>

        </div>
        `;
    });
}

function saveFavorite(id, name, image) {

    const exists = favorites.some(recipe => recipe.id == id);

    if (exists) {
        alert("Recipe already saved!");
        return;
    }

    favorites.push({ id, name, image });

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();
}

function displayFavorites() {

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorite recipes yet.</p>";
        return;
    }

    favorites.forEach(recipe => {

        favoritesContainer.innerHTML += `
        <div class="recipe-card">

            <img src="${recipe.image}" alt="${recipe.name}">

            <h3>${recipe.name}</h3>

            <button class="delete-btn"
            onclick="removeFavorite(${recipe.id})">
            Remove
            </button>

        </div>
        `;

    });

}

function removeFavorite(id){

    favorites = favorites.filter(recipe => recipe.id != id);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    displayFavorites();

}

searchBtn.addEventListener("click", () => {
    fetchRecipes(searchInput.value.trim());
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        fetchRecipes(searchInput.value.trim());
});

displayFavorites();
fetchRecipes();

