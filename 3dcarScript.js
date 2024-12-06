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

  console.log("Selections:", selections);
  console.log("Color selection:", colorSelection);
  console.log("Selected color name:", selectedColor);

  //passing color info to iframe
  const iframe = document.querySelector("#animationFrame");
  if (iframe) {
    iframe.onload = () => {
      const iframeOrigin = new URL(iframe.src).origin;
      iframe.contentWindow.postMessage(
        { variable: "--default-car", value: color },
        iframeOrigin
      );
      console.log(`Sent color ${color} to iframe.`);
    };
  } else {
    console.error("Iframe not found.");
  }
});


