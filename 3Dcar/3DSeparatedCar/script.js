window.addEventListener("message", (event) => {
  const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://preonzi.github.io/TOL-Automotive",
  ];
  if (!allowedOrigins.includes(event.origin)) {
    console.warn("Blocked message from untrusted origin:", event.origin);
    return;
  }

  console.log("Message received in iframe:", event.data);

  if (event.data && event.data.variable && event.data.value) {
    const { variable, value } = event.data;

    // apply the CSS variable to the iframe
    document.documentElement.style.setProperty(variable, value);
    console.log(`CSS variable set: ${variable} = ${value}`);
  } else {
    console.warn("Invalid message format received in iframe.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const carGroup = document.querySelector(".simpleRoad .carGroup");

  if (carGroup) {
    let rotateY = 0;

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        rotateY -= 5;
      } else if (event.key === "ArrowRight") {
        rotateY += 5;
      }

      carGroup.style.transform = `rotateY(${rotateY}deg)`;
      console.log(`Car rotated to: ${rotateY} degrees`);
    });
  } else {
    console.error("Could not find .carGroup element.");
  }
});
