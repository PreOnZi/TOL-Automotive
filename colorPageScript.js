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
        localStorage.setItem("selectedColor", "red");
        break;
      case "silver":
        newSrc = "Assets/carImageSelection/4SilverDiamond.png";
        priceChange = 470;
        itemName = "Brilliant Silver";
        localStorage.setItem("selectedColor", "silver");
        break;
      case "green":
        newSrc = "Assets/carImageSelection/7GreenDiamond.png";
        priceChange = 570;
        itemName = "Emerald Green";
        localStorage.setItem("selectedColor", "green");
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

  // Load the saved selection on page load
  const savedColor = localStorage.getItem("selectedColor");
  if (savedColor) {
    const savedItem = document.getElementById(savedColor);
    if (savedItem) {
      savedItem.style.backgroundColor = "#ddd";

      // Update the image and other related data
      let savedSrc;
      switch (savedColor) {
        case "red":
          savedSrc = "Assets/carImageSelection/1RedDiamond.png";
          break;
        case "silver":
          savedSrc = "Assets/carImageSelection/4SilverDiamond.png";
          break;
        case "green":
          savedSrc = "Assets/carImageSelection/7GreenDiamond.png";
          break;
        default:
          savedSrc = null;
      }

      if (savedSrc) {
        carColorImage.setAttribute("src", savedSrc);
      }
    }
  }

  // Attach the click event listeners
  const configItems = document.querySelectorAll(".confSelector ul li");
  configItems.forEach((item) =>
    item.addEventListener("click", changeImgOnClick)
  );
}
