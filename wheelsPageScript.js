function changeWheelOnClick(e) {
  const target = e.target.closest("li");
  if (!target) {
    console.error("No <li> element was clicked.");
    return;
  }

  let wheelType = "Diamond";
  let priceChange = 0;
  let itemName = "Diamond on the rise";

  // Determine the wheel type based on <h3> content
  const h3Text = target.querySelector("h3")?.textContent || "";
  console.log("Clicked item text:", h3Text);

  if (h3Text.includes("Square")) {
    wheelType = "Square";
    priceChange = 670;
    itemName = "Square targets";
  } else if (h3Text.includes("Dark")) {
    wheelType = "Dark";
    priceChange = 870;
    itemName = "Dark circular";
  }

  // Update styles for the clicked item
  const configItems = document.querySelectorAll(".confSelector ul li");
  configItems.forEach((item) => {
    item.style.backgroundColor = "";
  });
  target.style.backgroundColor = "#ddd";

  // Get the selected colour from localStorage (default to "Red")
  const selectedColor = localStorage.getItem("selectedColor") || "red"; // Default to "red"
  console.log("Selected colour from localStorage:", selectedColor);

  // Combine the selected colour and wheel type to form the image key
  const imageKey = `${selectedColor}${wheelType}`;
  console.log("Generated image key:", imageKey);

  // Define the mapping of image keys to file names (all lowercase keys)
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

  // Convert imageKey to lowercase to match the object keys
  const selectedImage = imageOptions[imageKey.toLowerCase()];
  console.log("Selected image file:", selectedImage);

  if (selectedImage) {
    const carWheelsImage = document.getElementById("car-wheels-image");
    if (carWheelsImage) {
      carWheelsImage.setAttribute(
        "src",
        `Assets/carImageSelection/${selectedImage}`
      );
      console.log("Image src updated to:", carWheelsImage.src);
    } else {
      console.error("No <img> element found with ID 'car-wheels-image'.");
    }
  } else {
    console.error(
      `No image found for the key "${imageKey}". Check the 'imageOptions' object.`
    );
  }

  // Save the selected wheel type in localStorage
  localStorage.setItem("selectedWheels", wheelType);

  // Update the price if the function exists
  if (window.updatePrice) {
    updatePrice(priceChange, itemName);
  } else {
    console.error("updatePrice function is not available");
  }
}

// Load the saved wheel selection on page load
const savedWheels = localStorage.getItem("selectedWheels");
if (savedWheels) {
  console.log("Retrieved saved wheel selection from localStorage:", savedWheels);

  // Find the correct <li> element using the data-wheel attribute
  const savedWheelItem = document.querySelector(`#wheelsList li[data-wheel="${savedWheels}"]`);
  if (savedWheelItem) {
    savedWheelItem.style.backgroundColor = "#ddd";

    // Update the image and other related data
    const wheelImageOptions = {
      Diamond: "1RedDiamond.png",
      Square: "2RedSquare.png",
      Dark: "3RedDark.png",
    };
    const savedWheelImage = wheelImageOptions[savedWheels];
    if (savedWheelImage) {
      const carWheelsImage = document.getElementById("car-wheels-image");
      if (carWheelsImage) {
        carWheelsImage.setAttribute("src", `Assets/carImageSelection/${savedWheelImage}`);
      }
    }
  } else {
    console.error("No wheel item found for the saved wheel type:", savedWheels);
  }
} else {
  console.log("No saved wheel selection found in localStorage.");
}

// Attach the click event listeners
const wheelItems = document.querySelectorAll(".confSelector ul li");
wheelItems.forEach((item) =>
  item.addEventListener("click", changeWheelOnClick)
);
