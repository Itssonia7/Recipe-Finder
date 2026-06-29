
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
  }
];

const recipeContainer = document.getElementById("recipe-container");

function displayRecipes() {
  recipeContainer.innerHTML = "";

  recipes.forEach((recipe) => {
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

displayRecipes();

