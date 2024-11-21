document.addEventListener("DOMContentLoaded", () => {
  const equipmentOptions = [
    { name: "Towbar, foldable", price: 1200 },
    { name: "Load carrier, roof", price: 170 },
    { name: "Protect Plan | TOL Automotive", price: 670 },
  ];

  function handleEquipmentSelection(index) {
    const selectedEquipment = equipmentOptions[index];
    if (!selectedEquipment) return;

    if (window.updatePrice) {
      updatePrice(selectedEquipment.price, selectedEquipment.name);
    }

    equipmentListItems.forEach((item, i) => {
      item.style.backgroundColor = i === index ? "#ddd" : "#f4f4f4";
    });
  }

  const equipmentListItems = document.querySelectorAll(".confSelector ul li");
  equipmentListItems.forEach((item, index) => {
    item.addEventListener("click", () => handleEquipmentSelection(index));
  });
});
