// Shared price tracking variables
let totalPrice = parseInt(localStorage.getItem("totalPrice")) || 0;
let previousPrice = 0;
let selections = JSON.parse(localStorage.getItem("selections")) || [];

// Elements for displaying price and selections
const priceValueElement = document.getElementById("priceValue");
const priceDisplayElement = document.getElementById("priceDisplay");

// Show the price box if total price exists
if (priceDisplayElement && totalPrice > 0) {
  priceDisplayElement.style.display = "flex"; // Show the price box
}

// Update total price display on page load
if (priceValueElement) {
  priceValueElement.textContent = totalPrice.toLocaleString();
}

// Display selections on page load
displaySelections();

// Shared function to update the price
function updatePrice(newPrice = 0, itemName = "Unknown Item") {
  totalPrice -= previousPrice; // Remove the old price
  totalPrice += newPrice; // Add the new price
  previousPrice = newPrice; // Update previous price

  // Update the displayed total price
  if (priceValueElement) {
    priceValueElement.textContent = totalPrice.toLocaleString();
  }
  localStorage.setItem("totalPrice", totalPrice);

  // Show the price box if it's hidden
  if (priceDisplayElement) {
    priceDisplayElement.style.display = "flex";
  }

  // Track the current selection for this page
  const pages = {
    Powertrain: "/TOL-Automotive/3powertrain.html",
    Colour: "/TOL-Automotive/4.1colour.html",
    Wheels: "/TOL-Automotive/4wheels.html",
    Interior: "/TOL-Automotive/5interior.html",
    Advertising: "/TOL-Automotive/6ads.html",
    Optional: "/TOL-Automotive/7addons.html",
  };

  const currentPage = window.location.pathname;

  // Find the category key corresponding to the current page
  const category = Object.keys(pages).find((key) => pages[key] === currentPage);

  // Update selections with the new item
  selections = selections.filter((selection) => selection.page !== currentPage); // Remove previous selection for the page

  selections.push({
    name: itemName,
    price: newPrice,
    page: currentPage,
    category: category || "Unknown", // Add category; default to "Unknown" if not found
  });

  localStorage.setItem("selections", JSON.stringify(selections));

  // Update selection list display
  displaySelections();
}

// Display the list of selections
function displaySelections() {
  const selectionList = document.getElementById("selectionList");
  if (!selectionList) return; // Skip if no selection list is present

  selectionList.innerHTML = ""; // Clear previous list
  selections.forEach((item) => {
    const listItem = document.createElement("p");
    listItem.textContent = `${item.name}: £${
      item.price < 0 ? "-" : ""
    }${Math.abs(item.price).toLocaleString()}`;
    selectionList.appendChild(listItem);
  });
}

// Reset price and selections
function resetPrice() {
  totalPrice = 0;
  previousPrice = 0;
  selections = [];
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("selections", JSON.stringify(selections));

  if (priceValueElement) {
    priceValueElement.textContent = totalPrice;
  }
  if (priceDisplayElement) {
    priceDisplayElement.style.display = "none"; // Hide the price box
  }
  displaySelections(); // Clear displayed selections
}

// Clear all local data
function clearLocalData() {
  localStorage.removeItem("totalPrice");
  localStorage.removeItem("selections");

  totalPrice = 0;
  previousPrice = 0;
  selections = [];

  if (priceValueElement) {
    priceValueElement.textContent = totalPrice;
  }
  if (priceDisplayElement) {
    priceDisplayElement.style.display = "none";
  }
  displaySelections();
  alert("All data has been cleared!");
}
