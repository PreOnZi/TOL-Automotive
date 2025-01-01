document.addEventListener("DOMContentLoaded", () => {
  const rawSelections = localStorage.getItem("selections");
  let selections = [];
  try {
    selections = rawSelections ? JSON.parse(rawSelections) : [];
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
  console.log(selectedWheels, wheelBackground);

  // SEATS
  const seatSelection = selections.find((item) => item.category === "Interior");
  let selectedSeatColor = "blackText";
  if (seatSelection && seatSelection.name) {
    if (seatSelection.name === "Recycled textiles | black") {
      selectedSeatColor = "blackText";
    } else if (seatSelection.name === "Vegan leather | black") {
      selectedSeatColor = "blackLead";
    } else if (seatSelection.name === "Vegan leather | cream") {
      selectedSeatColor = "creamLead";
    }
  }
  const seatColor = seatColorMap[selectedSeatColor];

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
    };
  } else {
    console.error("Iframe not found.");
  }
});
