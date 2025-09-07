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

    const cartSection = getById("cart-section");
    if (cartSection.classList.contains("opacity-100")) {
      cartSection.classList.replace("opacity-100", "opacity-0");
      cartSection.classList.replace("top-16", "top-12");
      cartSection.classList.add("pointer-events-none");
    }
  } else {
    mobileNav.classList.replace("opacity-100", "opacity-0");
    mobileNav.classList.replace("left-8", "left-5");
    menuBar.classList.replace("fa-bars-staggered", "fa-bars");
  }
});
// mobile cart menu function
const cartBtn = getById("cart-btn");
cartBtn.addEventListener("click", () => {
  const cartSection = getById("cart-section");
  cartSection.classList.toggle("pointer-events-none");
  if (cartSection.classList.contains("opacity-0")) {
    cartSection.classList.replace("opacity-0", "opacity-100");
    cartSection.classList.replace("top-12", "top-16");
    const mobileNav = getById("mobile-nav");

    mobileNav.classList.toggle("pointer-events-none");
    if (mobileNav.classList.contains("opacity-100")) {
      mobileNav.classList.replace("opacity-100", "opacity-0");
      mobileNav.classList.replace("left-8", "left-5");
      menuBar.classList.replace("fa-bars-staggered", "fa-bars");
      mobileNav.classList.add("pointer-events-none");
    }
  } else {
    cartSection.classList.replace("opacity-100", "opacity-0");
    cartSection.classList.replace("top-16", "top-12");
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
    categoryBtn.classList.add(
      "bg-green-100",
      "md:bg-transparent",
      "category-btn"
    );
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
      "shadow-lg"
    );
    itemCard.innerHTML = `
    <div class="aspect-[5/3] w-full overflow-hidden rounded-t-md"><img class="w-full h-full object-cover" src="${item.image}" alt=""></div>
      <p class="name font-semibold text-lg">${item.name}</p>
      <p class="text-[10px] text-gray-600">${item.description}</p>
      <div class="flex justify-between items-center">
      <button class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">${item.category}</button>
      <p class="text-lg">৳<span class="price" class="font-semibold text-sm"> ${item.price}</span></p>
      </div>
    <button class="add-btn text-white px-4 py-2 mt-2 bg-green-700 text-sm font-semibold rounded-lg hover:bg-green-700/80">Add to Cart</button>
    `;
    itemContainer.append(itemCard);
  });
};

// item by category button
const categoriesBtn = getById("categories");
categoriesBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-btn")) {
    const categoryBtnAll = document.querySelectorAll(".category-btn");
    categoryBtnAll.forEach((btn) => {
      btn.classList.remove("!bg-green-600", "!text-white");
    });
    e.target.classList.add("!bg-green-600", "!text-white");
    const btnId = e.target.id;
    const url = `https://openapi.programming-hero.com/api/category/${btnId}`;
    fetch(url)
      .then((res) => res.json())
      .then((items) => showPlantsCategories(items.plants));
    const showPlantsCategories = (items) => {
      const itemContainer = getById("items-container");
      itemContainer.innerHTML = "";
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
          "shadow-lg"
        );
        itemCard.innerHTML = `
    <div class="aspect-[5/3] w-full overflow-hidden rounded-t-md"><img class="w-full h-full object-cover" src="${item.image}" alt=""></div>
      <p class="name font-semibold text-lg">${item.name}</p>
      <p class="text-[10px] text-gray-600">${item.description}</p>
      <div class="flex justify-between items-center">
      <button class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">${item.category}</button>
      <p class="text-lg">৳<span class="price" class="font-semibold text-sm"> ${item.price}</span></p>
      </div>
    <button class="add-btn text-white px-4 py-2 mt-2 bg-green-700 text-sm font-semibold rounded-lg hover:bg-green-700/80">Add to Cart</button>
    `;
        itemContainer.append(itemCard);
      });
    };
  }
});

// add btn and cart features
const productContainer = getById("items-container");
let totalPrice = getById("total-price").innerText;
productContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    alert("✅ Item Added");
    const cartItemContainer = getById("cart-items");
    const item = e.target.closest("div");
    const itemName = item.querySelector(".name").innerText;
    const itemPrice = item.querySelector(".price").innerText;
    const cartItem = document.createElement("div");
    cartItem.classList.add(
      "cart-item",
      "flex",
      "justify-between",
      "items-center",
      "bg-green-50",
      "px-3",
      "py-1",
      "gap-1",
      "my-2"
    );
    cartItem.innerHTML = `<div>
    <p class="font-bold">${itemName}</p>
    <p class="text-gray-500"><span class=" item-price">${itemPrice}</span> x <span class="count">1</span></p></div>
    <i class="fa-solid fa-xmark text-red-400/50 close-btn"></i>
    `;
    cartItemContainer.append(cartItem);

    totalPrice = Number(totalPrice) + Number(itemPrice);
    getById("total-price").innerText = totalPrice;
  }
});

const cartItems = getById("cart-items");
cartItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-btn")) {
    const cartItem = e.target.closest(".cart-item");
    const itemPrice = cartItem.querySelector(".item-price").innerText;
    if (cartItem) {
      alert("❌ Item Removed");
      totalPrice = Number(totalPrice) - Number(itemPrice);
      getById("total-price").innerText = totalPrice;
      cartItem.remove();
    }
  }
});
