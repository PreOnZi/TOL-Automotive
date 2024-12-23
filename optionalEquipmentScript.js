document.addEventListener("DOMContentLoaded", () => {
  const equipmentOptions = [
    { name: "Tow bar, electronic, foldable", price: 1200 },
    { name: "Load carrier, roof", price: 170 },
    { name: "Panoramic roof", price: 1070 },
    { name: "Panoramic roof shade", price: 130 },
    { name: "TOL Automotive mystery merch box", price: 100 },
    { name: "Protect Plan | TOL Automotive", price: 670 },
  ];

  // Load saved selections from localStorage
  const savedSelections = JSON.parse(localStorage.getItem("selectedEquipment")) || [];

  function updatePrice(amount, name) {
    const priceDisplay = document.getElementById("priceDisplay");
    const priceValue = document.getElementById("priceValue");

    if (!priceDisplay || !priceValue) return;

    const currentPrice = parseInt(priceValue.textContent, 10);
    const newPrice = currentPrice + amount;
    priceValue.textContent = newPrice;

    // Show price display if it's hidden and price > 0
    if (newPrice > 0) {
      priceDisplay.style.display = "block";
    } else {
      priceDisplay.style.display = "none";
    }

    console.log(`${amount > 0 ? "Added" : "Removed"} ${name}. Total: £${newPrice}`);
  }

  function handleEquipmentSelection(index) {
    const selectedEquipment = equipmentOptions[index];
    if (!selectedEquipment) return;

    const equipmentListItems = document.querySelectorAll(".confSelectorAddons ul li");

    // Toggle selection
    if (savedSelections.includes(index)) {
      // Remove from selections
      const itemIndex = savedSelections.indexOf(index);
      savedSelections.splice(itemIndex, 1);
      equipmentListItems[index].style.backgroundColor = "#f4f4f4";

      updatePrice(-selectedEquipment.price, selectedEquipment.name);
    } else {
      // Add to selections
      savedSelections.push(index);
      equipmentListItems[index].style.backgroundColor = "#ddd";

      updatePrice(selectedEquipment.price, selectedEquipment.name);
    }

    // Save updated selections
    localStorage.setItem("selectedEquipment", JSON.stringify(savedSelections));
  }

  const equipmentListItems = document.querySelectorAll(".confSelectorAddons ul li");

  // Restore selections from localStorage
  savedSelections.forEach((index) => {
    if (equipmentOptions[index] && equipmentListItems[index]) {
      equipmentListItems[index].style.backgroundColor = "#ddd";
    }
  });

  // Attach event listeners to equipment list items
  equipmentListItems.forEach((item, index) => {
    item.addEventListener("click", () => handleEquipmentSelection(index));
  });
});
