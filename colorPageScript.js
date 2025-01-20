const carColorImage = document.getElementById("car-color-image");

document.addEventListener("DOMContentLoaded", () => {
  let selectedColor = localStorage.getItem("selectedColor") || "red";
  let selectedWheels = localStorage.getItem("selectedWheels") || "Diamond";

  if (!localStorage.getItem("selectedColor")) {
    localStorage.setItem("selectedColor", "red");
    console.log("No selectedColor in localStorage. Defaulting to 'red'.");
  }
  if (!localStorage.getItem("selectedWheels")) {
    localStorage.setItem("selectedWheels", "Diamond");
    console.log("No selectedWheels in localStorage. Defaulting to 'Diamond'.");
  }

  const imageOptions = {
    reddiamond: "1RedDiamond.png",
    redsquare: "2RedSquare.png",
    reddark: "3RedDark.png",
    silverdiamond: "4SilverDiamond.png",
    silversquare: "6SilverSquare.png",
    silverdark: "5SilverDark.png",
    greendiamond: "7GreenDiamond.png",
    greensquare: "8GreenSquare.png",
    greendark: "9GreenDark.png",
  };

  const imageKey = `${selectedColor.toLowerCase()}${selectedWheels.toLowerCase()}`;
  const selectedImage = imageOptions[imageKey];

  if (selectedImage) {
    if (carColorImage) {
      carColorImage.setAttribute(
        "src",
        `assets/carImageSelection/${selectedImage}`
      );
      console.log(
        `Image src updated on page load based on selected color (${selectedColor}) and wheels (${selectedWheels}):`,
        carColorImage.src
      );
    } else {
      console.error(
        "No <img> element found with ID 'car-color-image' on page load."
      );
    }
  } else {
    console.error(
      `No image found for the key "${imageKey}". Check the 'imageOptions' object.`
    );
  }
});

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
        priceChange = 0;
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
