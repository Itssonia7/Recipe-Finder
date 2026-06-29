
const recipes = [
  {
    id: 1,
    name: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
    category: "Italian"
  },
  {
    id: 2,
    name: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d29d?w=600",
    category: "Indian"
  },
  {
    id: 3,
    name: "Veg Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    category: "Fast Food"
  },
  {
    id: 4,
    name: "Pasta Alfredo",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    category: "Italian"
  },
  {
    id: 5,
    name: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    category: "Dessert"
  }
];

const recipeContainer = document.getElementById("recipe-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

function displayRecipes(recipeList) {
  recipeContainer.innerHTML = "";

  if (recipeList.length === 0) {
    recipeContainer.innerHTML = "<h3>No recipes found.</h3>";
    return;
  }

  recipeList.forEach((recipe) => {
    recipeContainer.innerHTML += `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p>${recipe.category}</p>
        <button>❤️ Save</button>
      </div>
    `;
  });
}

displayRecipes(recipes);

searchBtn.addEventListener("click", () => {
  const searchText = searchInput.value.toLowerCase().trim();

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.category.toLowerCase().includes(searchText)
    );
  });

  displayRecipes(filteredRecipes);
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

