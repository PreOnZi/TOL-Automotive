const imageOptions = {
  RedDiamond: "1RedDiamond.png",
  RedSquare: "2RedSquare.png",
  RedDark: "3RedDark.png",
  SilverDiamond: "4SilverDiamond.png",
  SilverDark: "5SilverDark.png",
  SilverSquare: "6SilverSquare.png",
  GreenDiamond: "7GreenDiamond.png",
  GreenSquare: "8GreenSquare.png",
  GreenDark: "9GreenDark.png",
};

const carWheelsImage = document.getElementById("car-wheels-image");

if (carWheelsImage) {
  const selectedColor = localStorage.getItem("selectedColor") || "Red";

  const defaultImageSrc =
    imageOptions[`${selectedColor}Diamond`] || "1RedDiamond.png";
  carWheelsImage.setAttribute(
    "src",
    `assets/carImageSelection/${defaultImageSrc}`
  );

  function changeWheelOnClick(e) {
    const target = e.target.closest("li");
    if (!target) return;

    let wheelType = "Diamond";
    let priceChange = 0;
    let itemName = `${selectedColor} with `;

    if (target.querySelector("h3")?.textContent.includes("Square")) {
      wheelType = "Square";
      priceChange = 670;
      itemName += "Square wheels";
    } else if (target.querySelector("h3")?.textContent.includes("Dark")) {
      wheelType = "Dark";
      priceChange = 870;
      itemName += "Dark wheels";
    } else {
      itemName += "Diamond wheels";
    }

    const imageKey = `${selectedColor}${wheelType}`;
    const selectedImage = imageOptions[imageKey];

    if (selectedImage) {
      carWheelsImage.setAttribute(
        "src",
        `assets/carImageSelection/${selectedImage}`
      );
      console.log(`Updated image to: ${selectedImage}`);
    } else {
      console.warn(`No image found for key: ${imageKey}`);
    }

    if (window.updatePrice) {
      window.updatePrice(priceChange, itemName);

      const priceDisplay = document.getElementById("priceDisplay");
      if (priceDisplay) {
        priceDisplay.style.display = "flex";
      }
    } else {
      console.error("updatePrice function is not available");
    }
  }

  const wheelOptionsList = document.querySelectorAll(".confSelector ul li");
  wheelOptionsList.forEach((item) =>
    item.addEventListener("click", changeWheelOnClick)
  );
}
