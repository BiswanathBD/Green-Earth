const getById = (id) => document.getElementById(id);
// mobile menu function
const menuBar = getById("menu-bar");
menuBar.addEventListener("click", () => {
  const mobileNav = getById("mobile-nav");
  mobileNav.classList.toggle("pointer-events-none");
  if (mobileNav.classList.contains("opacity-0")) {
    mobileNav.classList.replace("opacity-0", "opacity-100");
    mobileNav.classList.replace("left-5", "left-8");
    menuBar.classList.replace("fa-bars", "fa-bars-staggered");
  } else {
    mobileNav.classList.replace("opacity-100", "opacity-0");
    mobileNav.classList.replace("left-8", "left-5");
    menuBar.classList.replace("fa-bars-staggered", "fa-bars");
  }
});

// fetch categories data and add to ui
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((categories) => showCategories(categories.categories));

const showCategories = (categories) => {
  const categoriesContainer = getById("category-container");
  categories.forEach((category) => {
    const categoryBtn = document.createElement("li");
    categoryBtn.id = `${category.id}`;
    categoryBtn.innerText = `${category.category_name}`;
    categoriesContainer.append(categoryBtn);
  });
};

// fetch all plants and show on ui
fetch("https://openapi.programming-hero.com/api/plants")
  .then((res) => res.json())
  .then((items) => showPlants(items.plants));

const showPlants = (items) => {
  const itemContainer = getById("items-container");
  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add(
      "flex",
      "flex-col",
      "gap-1",
      "justify-between",
      "bg-white",
      "p-3",
      "rounded-xl",
      "shadow-md"
    );
    itemCard.innerHTML = `
    <div class="aspect-[4/3] w-full overflow-hidden rounded-md"><img class="w-full h-full object-cover" src="${item.image}" alt=""></div>
      <p class="font-semibold text-lg">${item.name}</p>
      <p class="text-sm text-gray-600">${item.description}</p>
      <div class="flex justify-between items-center">
      <button class="px-2 pb-1 text-xs bg-green-100 text-green-700 rounded-full">${item.category}</button>
      <p class="text-lg">৳<span id="price" class="font-semibold text-sm"> ${item.price}</span></p>
      </div>
    <button id="add-btn" class="text-white px-3 py-1 bg-green-700 text-sm font-semibold rounded-full">Add to Cart</button>
    `;
    itemContainer.append(itemCard);
  });
};
