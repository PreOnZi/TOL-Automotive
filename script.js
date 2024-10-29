//GALLERY
let currentIndex = 0; // Start with the first image
const images = document.querySelectorAll('.gallery-img');

function changeImage() {
    // Hide the current image
    images[currentIndex].classList.remove('active');

    // Update the index to the next image
    currentIndex = (currentIndex + 1) % images.length; // Wrap around to the first image

    // Show the new image
    images[currentIndex].classList.add('active');
}

// Initialize the gallery on page load
window.onload = function() {
    images[currentIndex].classList.add('active'); // Show the first image
    setInterval(changeImage, 10000); // Change image every 10 seconds
};


//PRICE TRACKING
let totalPrice = parseInt(localStorage.getItem('totalPrice')) || 0;
let previousPrice = 0;
let selections = JSON.parse(localStorage.getItem("selections")) || [];

// Display the current total price on page load
document.getElementById('priceValue').textContent = totalPrice.toLocaleString();

// Display selections on page load (if any exist)
displaySelections();

function showImage(index) {
  const listItems = document.querySelectorAll('.confSelector ul li');
  
  // Remove 'selected' class from all list items
  listItems.forEach((item) => item.classList.remove('selected'));
  
  // Add 'selected' class to the clicked item
  listItems[index].classList.add('selected');
  
  // Show the price button
  document.getElementById('priceDisplay').style.display = 'flex';
  
  // Extract price and item name (first two words from the h3 tag)
  const itemName = listItems[index].querySelector('h3').textContent.split(' ').slice(0, 2).join(' '); // Limit to first two words
  const priceText = listItems[index].querySelector('i').textContent;
  const isNegative = priceText.startsWith("-"); // Check if price is negative
  const priceMatch = priceText.match(/£([\d,]+)/);
  
  if (priceMatch) {
    const newPrice = parseInt(priceMatch[1].replace(/,/g, ''));
    updatePrice(isNegative ? -newPrice : newPrice, itemName); // Pass negative price if applicable
  }
}

function updatePrice(newPrice, itemName) {
  // Remove the previously selected item's price from the total
  totalPrice -= previousPrice;
  
  // Update the total with the new price
  totalPrice += newPrice;
  document.getElementById('priceValue').textContent = totalPrice.toLocaleString();
  localStorage.setItem('totalPrice', totalPrice);

  // Update the previous price to the current selection
  previousPrice = newPrice;

  // Ensure only the last selection is saved for each page
  const currentPage = window.location.pathname; // Get the current page's path as a unique identifier
  selections = selections.filter(selection => selection.page !== currentPage); // Remove previous selection for the page
  selections.push({ name: itemName, price: newPrice, page: currentPage }); // Add the new selection with page info
  localStorage.setItem("selections", JSON.stringify(selections));

  // Update displayed list of selections
  displaySelections();
}

// Function to display selections
function displaySelections() {
  const selectionList = document.getElementById('selectionList');
  selectionList.innerHTML = ""; // Clear previous list
  
  selections.forEach((item) => {
    const listItem = document.createElement("p");
    listItem.textContent = `${item.name}: £${item.price < 0 ? '-' : ''}${Math.abs(item.price).toLocaleString()}`;
    selectionList.appendChild(listItem);
  });
}

// Clear price and selections (optional)
function resetPrice() {
  totalPrice = 0;
  previousPrice = 0;
  selections = [];
  localStorage.setItem('totalPrice', totalPrice);
  localStorage.setItem("selections", JSON.stringify(selections));
  document.getElementById('priceValue').textContent = totalPrice;
  displaySelections(); // Clear displayed selections
}


//CLEAR LOCAL DATA

function clearLocalData() {
  // Clear local storage items
  localStorage.removeItem('totalPrice');
  localStorage.removeItem('selections');
  
  // Reset variables
  totalPrice = 0;
  previousPrice = 0;
  selections = [];
  
  // Update displayed price and selections
  document.getElementById('priceValue').textContent = totalPrice;
  displaySelections(); // Clears the selections display
  
  alert("All data has been cleared!");
}
