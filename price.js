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

  // Ensure the current page matches the format in `pages`
  const category = Object.keys(pages).find((key) =>
    currentPage.endsWith(pages[key])
  );

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
