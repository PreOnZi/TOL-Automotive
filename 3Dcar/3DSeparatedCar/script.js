window.addEventListener("message", (event) => {
  const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://preonzi.github.io/TOL-Automotive",
    "https://preonzi.github.io/TOL-Automotive/4.1colour.html",
    "https://preonzi.github.io/TOL-Automotive/4wheels.html",
  ];
  if (!allowedOrigins.includes(event.origin)) {
    console.warn("Blocked message from untrusted origin:", event.origin);
    return;
  }

  console.log("Message received in iframe:", event.data);

  if (event.data && event.data.variable && event.data.value) {
    const { variable, value } = event.data;
    console.log(`./assets/${value}.png`);
    if (variable === "--default-car") {
      document.documentElement.style.setProperty(variable, value);
      console.log(`Car color set: ${variable} = ${value}`);
    } else if (variable === "--default-wheel") {
      const wheelElements = document.querySelectorAll(
        ".wheelNode1 .item.xFaces, .wheelNode2 .item.xFaces, .wheelNode3 .item.xFaces, .wheelNode4 .item.xFaces"
      );
      if (wheelElements.length > 0) {
        const wheelImageUrl = `./assets/${value}.png`;
        wheelElements.forEach((wheel) => {
          wheel.style.backgroundImage = `url('${wheelImageUrl}')`;
          wheel.style.backgroundSize = "cover";
        });
        console.log(`Wheel pattern applied dynamically: ${wheelImageUrl}`);
      } else {
        console.warn("No wheel elements found to apply the pattern.");
      }
    } else {
      console.warn(`Unknown variable received: ${variable}`);
    }
  } else {
    console.warn("Invalid message format received in iframe.");
  }
});
