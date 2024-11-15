const image = document.getElementById("car-color-image");

function changeImgOnClick(e) {
  if (e.target.id === "red") {
    image.setAttribute("src", "");
  } else if (e.target.id === "silver") {
    image.setAttribute("src", "");
  } else if (e.target.id === "green") {
    image.setAttribute("src", "");
  }
}
