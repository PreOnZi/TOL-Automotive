document.addEventListener("DOMContentLoaded", () => {
  const equipmentOptions = [
    { name: "Tow bar, electronic, foldable", price: 1200 },
    { name: "Load carrier, roof", price: 170 },
    { name: "Panoramic roof", price: 1070 },
    { name: "Panoramic roof shade", price: 130 },
    { name: "TOL Automotive mystery merch box", price: 150 },
    { name: "Protect Plan | TOL Automotive", price: 670 },
  ];

  let savedSelections =
    JSON.parse(localStorage.getItem("selectedEquipment")) || [];
  let addonsPrice = savedSelections.reduce(
    (sum, index) => sum + (equipmentOptions[index]?.price || 0),
    0
  );
  let totalPrice = parseInt(localStorage.getItem("totalPrice")) || 0;
  let selections = JSON.parse(localStorage.getItem("selections")) || [];

  const priceDisplay = document.getElementById("priceDisplay");
  const priceValue = document.getElementById("priceValue");

  function updatePriceDisplay() {
    const subtotal = totalPrice + addonsPrice;

    if (subtotal > 0 && priceDisplay) {
      priceDisplay.style.display = "block";
      if (priceValue) {
        priceValue.textContent = subtotal.toLocaleString();
      }
    } else if (priceDisplay) {
      priceDisplay.style.display = "none";
    }
  }

  function handleEquipmentSelection(index) {
    const selectedEquipment = equipmentOptions[index];
    if (!selectedEquipment) return;

    const equipmentListItems = document.querySelectorAll(
      ".confSelectorAddons ul li"
    );

    if (savedSelections.includes(index)) {
      const itemIndex = savedSelections.indexOf(index);
      savedSelections.splice(itemIndex, 1);
      equipmentListItems[index].style.backgroundColor = "#f4f4f4";

      addonsPrice -= selectedEquipment.price;
    } else {
      savedSelections.push(index);
      equipmentListItems[index].style.backgroundColor = "#ddd";

      addonsPrice += selectedEquipment.price;
    }

    const itemNames = savedSelections.map((idx) => equipmentOptions[idx].name);
    const addonsSelection = {
      name: itemNames.length > 1 ? "Multiple items" : itemNames[0] || "None",
      price: addonsPrice,
      page: window.location.pathname,
      category: "Addons",
    };

    selections = selections.filter(
      (selection) => selection.category !== "Addons"
    );
    selections.push(addonsSelection);

    localStorage.setItem("selectedEquipment", JSON.stringify(savedSelections));
    localStorage.setItem("selections", JSON.stringify(selections));

    updatePriceDisplay();
  }

  const equipmentListItems = document.querySelectorAll(
    ".confSelectorAddons ul li"
  );
  savedSelections.forEach((index) => {
    if (equipmentOptions[index] && equipmentListItems[index]) {
      equipmentListItems[index].style.backgroundColor = "#ddd";
    }
  });

  equipmentListItems.forEach((item, index) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => handleEquipmentSelection(index));
  });

  updatePriceDisplay();

  const nextButton = document.querySelector(".next-button");

  function checkAddonsSelection() {
    const selections = JSON.parse(localStorage.getItem("selections")) || [];

    const hasAddons = selections.some((item) => item.category === "Addons");

    if (hasAddons) {
      nextButton.style.pointerEvents = "auto";
      nextButton.style.opacity = "1";
    } else {
      nextButton.style.pointerEvents = "none";
      nextButton.style.opacity = "0.5";
    }
  }

  checkAddonsSelection();

  //TIMER for checking if there is selected option or not
  setInterval(() => {
    checkAddonsSelection();
  }, 500);
});
