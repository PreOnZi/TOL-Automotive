const galleryImages = document.querySelectorAll(".gallery-img");
const listItems = document.querySelectorAll(".confSelector ul li");

if (galleryImages.length && listItems.length) {
  let currentIndex = 0;
  let autoSwitchInterval;

  function updateGallery() {
    // Hide all images
    galleryImages.forEach((img) => img.classList.remove("active"));

    // Show the current image
    galleryImages[currentIndex].classList.add("active");
  }

  function autoSwitchImages() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGallery();
  }

  function startAutoSwitch() {
    autoSwitchInterval = setInterval(autoSwitchImages, 5000); // Change image every 5 seconds
  }

  function handleOptionClick(e) {
    const target = e.currentTarget; // The clicked list item
    const priceText = target.querySelector("i")?.textContent || "+ £0";
    const itemName =
      target.querySelector("h3")?.textContent.trim() || "Unknown Item";
    const isNegative = priceText.startsWith("-");
    const priceMatch = priceText.match(/£([\d,]+)/);

    if (priceMatch) {
      const price = parseInt(priceMatch[1].replace(/,/g, ""));
      const newPrice = isNegative ? -price : price;

      // Update the price using the shared function
      if (window.updatePrice) {
        window.updatePrice(newPrice, itemName);

        // Make the price display box visible
        const priceDisplay = document.getElementById("priceDisplay");
        if (priceDisplay) {
          priceDisplay.style.display = "flex";
        }
      }
    }

    // Highlight the clicked list item
    listItems.forEach((item) => item.classList.remove("selected"));
    target.classList.add("selected");
  }

  // Attach click events to list items
  listItems.forEach((item) => {
    item.addEventListener("click", handleOptionClick);
  });

  // Start automatic switching on page load
  startAutoSwitch();

  // Initialize gallery without altering the selection
  updateGallery();
}
