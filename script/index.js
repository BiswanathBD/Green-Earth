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
      "category-btn",
      "cursor-pointer"
    );
    categoryBtn.id = `${category.id}`;
    categoryBtn.innerText = `${category.category_name}`;
    categoriesContainer.append(categoryBtn);
  });
};

// fetch all plants and show on ui
const showPlants = (items) => {
  const itemContainer = getById("items-container");
  itemContainer.innerHTML = "";
  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add(
      "product-card",
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
      <p onclick = "modalView(${item.id})" class="name font-semibold text-lg cursor-pointer">${item.name}</p>
      <p class="text-[10px] text-gray-600">${item.description}</p>
      <div class="flex justify-between items-center">
      <button class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">${item.category}</button>
      <p class="text-lg">৳<span class="font-semibold text-sm price"> ${item.price}</span></p>
      </div>
    <button class="add-btn text-white px-4 py-2 mt-2 bg-green-700 text-sm font-semibold rounded-lg hover:bg-green-700/80">Add to Cart</button>
    `;
    itemContainer.append(itemCard);
  });
};
const getAllPlants = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const items = await res.json();
    showPlants(items.plants);
  } catch (error) {
    getById("items-container").innerHTML = `
    <div class="col-span-full text-center text-red-500/80">
    <h1 class="text-4xl"><i class="fa-solid fa-triangle-exclamation"></i></h1>
    <p>Failed to load Data</p>
    </div>
    `;
  }
};
getAllPlants();

// item by category button
const categoriesBtn = getById("categories");
const itemContainer = getById("items-container");
categoriesBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("category-btn")) {
    itemContainer.innerHTML =
      '<div id="loader" class="col-span-full flex justify-center text-green-500"><span class="loading loading-dots loading-xl w-20 self-start"></span></div>';

    const categoryBtnAll = document.querySelectorAll(".category-btn");
    categoryBtnAll.forEach((btn) => {
      btn.classList.remove("!bg-green-600", "!text-white");
    });
    e.target.classList.add("!bg-green-600", "!text-white");
    const btnId = e.target.id;
    if (btnId === "all") {
      getAllPlants();
      return;
    }
    const url = `https://openapi.programming-hero.com/api/category/${btnId}`;

    const fetchItems = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const items = data.plants;
        showPlantsCategories(items);
      } catch (error) {
        getById("items-container").innerHTML = `
    <div class="col-span-full text-center text-red-500/80">
    <h1 class="text-4xl"><i class="fa-solid fa-triangle-exclamation"></i></h1>
    <p>Failed to load Data</p>
    </div>
    `;
      }
    };
    fetchItems();

    const showPlantsCategories = (items) => {
      itemContainer.innerHTML = "";
      items.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add(
          "product-card",
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
      <p onclick = "modalView(${item.id})" class="name font-semibold text-lg cursor-pointer">${item.name}</p>
      <p class="text-[10px] text-gray-600">${item.description}</p>
      <div class="flex justify-between items-center">
      <button class="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md">${item.category}</button>
      <p class="text-lg">৳<span class="font-semibold text-sm price"> ${item.price}</span></p>
      </div>
    <button class="add-btn text-white px-4 py-2 mt-2 bg-green-700 text-sm font-semibold rounded-lg hover:bg-green-700/80">Add to Cart</button>
    `;
        itemContainer.append(itemCard);
      });
    };
  }
});

// open item details modal
const modalView = async (id) => {
  const modalContainer = getById("modal-container");

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/plant/${id}`
    );
    const data = await res.json();
    const details = data.plants;

    modalContainer.innerHTML = `<div class="bg-white rounded-2xl m-4 p-4 shadow-xl grid gap-4 w-4/5 md:w-2/6 border border-gray-200">
    <p class="text-3xl font-bold">${details.name}</p>

    <div class="aspect-[5/3] overflow-hidden rounded-lg border border-gray-100">
      <img class="w-full h-full object-cover" src="${details.image}" alt="">
    </div>

    <p class="text-xl"><span class="font-bold">Category: </span>${details.category}</p>
    <p class="text-xl"><span class="font-bold">Price: </span>${details.price}</p>
    <p class="text-lg text-gray-500">
      <span class="font-bold text-black">Description: </span>${details.description}</p>

    <div id="close-btn" class="flex justify-end">
      <button class="px-3 py-1.5 bg-red-50 rounded-md text-sm font-bold border border-red-100 hover:bg-red-100">Close</button>
    </div>
  </div>`;
    modalContainer.classList.replace("opacity-0", "opacity-100");
    modalContainer.classList.remove("pointer-events-none");

    const closeBtn = getById("close-btn");
    closeBtn.addEventListener("click", () => {
      modalContainer.classList.replace("opacity-100", "opacity-0");
      modalContainer.classList.add("pointer-events-none");
    });
  } catch (error) {
    modalContainer.innerHTML = `
    <div class="bg-white rounded-2xl m-4 p-4 shadow-xl grid gap-4 w-4/5 md:w-1/3 border border-gray-200">
    <div class="col-span-full text-center text-red-500/80">
    <h1 class="text-4xl"><i class="fa-solid fa-triangle-exclamation"></i></h1>
    <p>Failed to load Data</p>
    </div>

    <div id="close-btn" class="flex justify-end">
      <button class="px-3 py-1.5 bg-red-50 rounded-md text-sm font-bold border border-red-100 hover:bg-red-100">Close</button>
    </div>
    </div>`;
    modalContainer.classList.replace("opacity-0", "opacity-100");
    modalContainer.classList.remove("pointer-events-none");

    const closeBtn = getById("close-btn");
    closeBtn.addEventListener("click", () => {
      modalContainer.classList.replace("opacity-100", "opacity-0");
      modalContainer.classList.add("pointer-events-none");
    });
  }
};

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
