document.addEventListener("DOMContentLoaded", () => {
  const selectionList = document.getElementById("selectionList");

  if (selectionList) {
    const selections = JSON.parse(localStorage.getItem("selections")) || [];
    selectionList.innerHTML = "";

    if (selections.length === 0) {
      selectionList.textContent = "No selections made.";
      return;
    }

    selections.forEach(({ category, name, price }) => {
      if (!category || !name || typeof price !== "number") {
        console.warn("Missing or invalid data for selection:", {
          category,
          name,
          price,
        });
        return;
      }

      const row = document.createElement("div");
      row.className = "selection-row";

      row.innerHTML = `
          <span class="selection-category">${category}:</span>
          <span class="selection-value">${name}</span>
          <span class="selection-price">£${price.toLocaleString()}</span>
        `;

      selectionList.appendChild(row);
    });
  }
});

const finalCar = document.getElementById("finalCar");

function getImageSrc(selections) {
  const colorSelection = selections.find((item) => item.category === "Colour");
  const wheelsSelection = selections.find((item) => item.category === "Wheels");

  const colorName = colorSelection ? colorSelection.name : "Solar Red";
  const wheelsName = wheelsSelection ? wheelsSelection.name : "Diamond wheels";

  const imageMap = {
    "Solar Red-Diamond wheels": "1RedDiamond.png",
    "Solar Red-Square wheels": "2RedSquare.png",
    "Solar Red-Dark wheels": "3RedDark.png",
    "Brilliant Silver-Diamond wheels": "4SilverDiamond.png",
    "Brilliant Silver-Dark wheels": "5SilverDark.png",
    "Brilliant Silver-Square wheels": "6SilverSquare.png",
    "Emerald Green-Diamond wheels": "7GreenDiamond.png",
    "Emerald Green-Square wheels": "8GreenSquare.png",
    "Emerald Green-Dark wheels": "9GreenDark.png",
  };

  const mapKey = `${colorName}-${wheelsName}`;

  const fileName = imageMap[mapKey] || "1RedDiamond.png";

  return `Assets/carImageSelection/${fileName}`;
}

const newSrc = getImageSrc(selections);
finalCar.setAttribute("src", newSrc);
