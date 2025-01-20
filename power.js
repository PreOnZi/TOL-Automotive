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
