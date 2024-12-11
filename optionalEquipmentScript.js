document.addEventListener("DOMContentLoaded", () => {
  const equipmentOptions = [
    { name: "Towbar, foldable", price: 1200 },
    { name: "Load carrier, roof", price: 170 },
    { name: "Protect Plan | TOL Automotive", price: 670 },
  ];

  // Load saved selections from localStorage
  const savedSelections =
    JSON.parse(localStorage.getItem("selectedEquipment")) || [];

  function handleEquipmentSelection(index) {
    const selectedEquipment = equipmentOptions[index];
    if (!selectedEquipment) return;

    const equipmentListItems = document.querySelectorAll(".confSelector ul li");

    // Toggle selection
    if (savedSelections.includes(index)) {
      // Remove from selections
      const itemIndex = savedSelections.indexOf(index);
      savedSelections.splice(itemIndex, 1);
      equipmentListItems[index].style.backgroundColor = "#f4f4f4";

      if (window.updatePrice) {
        updatePrice(-selectedEquipment.price, `Removed ${selectedEquipment.name}`);
      }
    } else {
      // Add to selections
      savedSelections.push(index);
      equipmentListItems[index].style.backgroundColor = "#ddd";

      if (window.updatePrice) {
        updatePrice(selectedEquipment.price, selectedEquipment.name);
      }
    }

    // Save updated selections
    localStorage.setItem("selectedEquipment", JSON.stringify(savedSelections));
  }

  const equipmentListItems = document.querySelectorAll(".confSelector ul li");

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
