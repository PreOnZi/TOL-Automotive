let totalPrice = parseInt(localStorage.getItem("totalPrice")) || 0;
let selections = JSON.parse(localStorage.getItem("selections")) || [];

const priceValueElement = document.getElementById("priceValue");
const priceDisplayElement = document.getElementById("priceDisplay");

function togglePriceBox() {
  if (totalPrice > 0 && priceDisplayElement) {
    priceDisplayElement.style.display = "block";
    if (priceValueElement) {
      priceValueElement.textContent = totalPrice.toLocaleString();
    }
  } else if (priceDisplayElement) {
    priceDisplayElement.style.display = "none";
  }
}

function clearLocalData() {
  localStorage.clear();
  totalPrice = 0;
  selections = [];
  togglePriceBox();
}

function updatePrice(newPrice = 0, itemName = "Unknown Item") {
  const currentPage = window.location.pathname;

  const previousSelection = selections.find(
    (selection) => selection.page === currentPage
  );
  const previousPrice = previousSelection ? previousSelection.price : 0;

  totalPrice -= previousPrice;
  totalPrice += newPrice;

  if (priceValueElement) {
    priceValueElement.textContent = totalPrice.toLocaleString();
  }
  localStorage.setItem("totalPrice", totalPrice);

  togglePriceBox();

  const basePath = window.location.hostname.includes("github.io")
    ? "/TOL-Automotive"
    : "";

  const pages = {
    Powertrain: `${basePath}/3powertrain.html`,
    Colour: `${basePath}/4.1colour.html`,
    Wheels: `${basePath}/4wheels.html`,
    Interior: `${basePath}/5interior.html`,
    Advertising: `${basePath}/6ads.html`,
    Extras: `${basePath}/7addons.html`,
  };

  const category = Object.keys(pages).find((key) =>
    currentPage.endsWith(pages[key])
  );

  selections = selections.filter((selection) => selection.page !== currentPage);

  selections.push({
    name: itemName,
    price: newPrice,
    page: currentPage,
    category: category || "Unknown",
  });

  localStorage.setItem("selections", JSON.stringify(selections));

  displaySelections();
}

function displaySelections() {}

togglePriceBox();
