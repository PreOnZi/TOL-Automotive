const carColorImage = document.getElementById("car-color-image");

if (carColorImage) {
  function changeImgOnClick(e) {
    const target = e.target.closest("li");
    if (!target) return;

    const configItems = document.querySelectorAll(".confSelector ul li");
    configItems.forEach((item) => {
      item.style.backgroundColor = "";
    });

    target.style.backgroundColor = "#ddd";

    const targetId = target.id;
    let newSrc = null;
    let priceChange = 0;
    let itemName = "";

    switch (targetId) {
      case "red":
        newSrc = "Assets/carImageSelection/1RedDiamond.png";
        priceChange = 370;
        itemName = "Solar Red";
        localStorage.setItem("selectedColor", "Red");
        break;
      case "silver":
        newSrc = "Assets/carImageSelection/4SilverDiamond.png";
        priceChange = 470;
        itemName = "Brilliant Silver";
        localStorage.setItem("selectedColor", "Silver");
        break;
      case "green":
        newSrc = "Assets/carImageSelection/7GreenDiamond.png";
        priceChange = 570;
        itemName = "Emerald Green";
        localStorage.setItem("selectedColor", "Green");
        break;
      default:
        console.warn("Unknown target ID:", targetId);
        return;
    }

    carColorImage.setAttribute("src", newSrc);

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

  const configItems = document.querySelectorAll(".confSelector ul li");
  configItems.forEach((item) =>
    item.addEventListener("click", changeImgOnClick)
  );
}
