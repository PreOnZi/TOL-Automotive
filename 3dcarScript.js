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

  const seatColorMap = {
    blackText: "#4A4A4A",
    blackLead: "#101010",
    creamLead: "#D9D2AF",
  };

  // COLOR
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

  // WHEELS
  let selectedWheels = localStorage.getItem("selectedWheels");
  selectedWheels = selectedWheels ? selectedWheels.toLowerCase() : "diamond";
  const wheelBackground = wheelMap[selectedWheels] || wheelMap.diamond;

  // SEATS
  const seatSelection = selections.find((item) => item.category === "Seats");
  let selectedSeatColor = "blackText";
  if (seatSelection) {
    const seatColorName = seatSelection.name.toLowerCase();
    if (seatColorName.includes("lead") && seatColorName.includes("black")) {
      selectedSeatColor = "blackLead";
    } else if (
      seatColorName.includes("lead") &&
      seatColorName.includes("cream")
    ) {
      selectedSeatColor = "creamLead";
    }
  }
  const seatColor = seatColorMap[selectedSeatColor];


  console.log("Selections:", selections);
  console.log("Color selection:", colorSelection);
  console.log("Selected color name:", selectedColor);
  console.log("Selected wheels:", selectedWheels);
  console.log("Wheel background:", wheelBackground);
  console.log("Selected seat color:", selectedSeatColor);

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

      iframe.contentWindow.postMessage(
        { variable: "--default-seat-color", value: seatColor },
        iframeOrigin
      );

      console.log(
        `Sent color ${color}, wheel ${selectedWheels}, and seat color ${seatColor} to iframe.`
      );
    };
  } else {
    console.error("Iframe not found.");
  }
});
