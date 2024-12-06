document.addEventListener("DOMContentLoaded", () => {
  const rawSelections = localStorage.getItem("selections");
  let selections = [];
  try {
    selections = JSON.parse(rawSelections);
  } catch (error) {
    console.error("Failed to parse selections from localStorage:", error);
  }

  const colorMap = {
    red: "#aa0000",
    green: "#aefec0",
    silver: "#a6a6a6",
    default: "#7d7c7c",
  };

  const wheelMap = {
    diamond: "url(./assets/pattern1.avif)",
    square: "url(./assets/pattern2.png)",
    dark: "url(./assets/pattern3.jpg)",
  };

  const colorSelection = selections.find((item) => item.category === "Colour");
  let selectedColor = "default";
  if (colorSelection) {
    const colorName = colorSelection.name.toLowerCase();
    if (colorName.includes("red")) {
      selectedColor = "red";
    } else if (colorName.includes("green")) {
      selectedColor = "green";
    } else if (colorName.includes("silver")) {
      selectedColor = "silver";
    }
  }

  const color = colorMap[selectedColor];

  let selectedWheels = localStorage.getItem("selectedWheels");
  selectedWheels = selectedWheels ? selectedWheels.toLowerCase() : "diamond"; // Use diamond if no selection

  const wheelBackground = wheelMap[selectedWheels] || wheelMap.diamond; // Fallback to diamond if invalid key

  console.log("Selections:", selections);
  console.log("Color selection:", colorSelection);
  console.log("Selected color name:", selectedColor);
  console.log("Selected wheels:", selectedWheels);
  console.log("Wheel background:", wheelBackground);

  const items = document.querySelectorAll(".item.index4.xFaces");
  items.forEach((item) => {
    item.style.backgroundImage = wheelBackground;
    item.style.backgroundSize = "cover";
  });

  const iframe = document.querySelector("#animationFrame");
  if (iframe) {
    iframe.onload = () => {
      const iframeOrigin = new URL(iframe.src).origin;

      iframe.contentWindow.postMessage(
        { variable: "--default-car", value: color },
        iframeOrigin
      );

      iframe.contentWindow.postMessage(
        { variable: "--default-wheel", value: selectedWheels },
        iframeOrigin
      );

      console.log(`Sent color ${color} and wheel ${selectedWheels} to iframe.`);
    };
  } else {
    console.error("Iframe not found.");
  }
});
