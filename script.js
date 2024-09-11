// DOM Elements
const body = document.querySelector("body");
// Canvas
const canvas = document.getElementById("canvas");
const canvasWidth = 640;

// States
let canvasSize = 16;
let color = "#000000";

let isMouseDown = false;

function populateCanvas() {
  if (canvas.hasChildNodes()) {
    canvas.childNodes.forEach((child) => child.remove());
  }

  for (let i = 0; i < canvasSize * canvasSize; i++) {
    const pixel = document.createElement("div");
    pixel.style.backgroundColor = "#fff";
    pixel.style.width = canvasWidth / canvasSize + "px";
    pixel.style.height = canvasWidth / canvasSize + "px";

    pixel.addEventListener("mouseenter", () => {
      if (!isMouseDown) {
        return;
      }

      pixel.style.backgroundColor = color;
    });
    pixel.addEventListener("mousedown", () => {
      isMouseDown = true;

      pixel.style.backgroundColor = color;
    });

    canvas.appendChild(pixel);
  }
}

body.addEventListener("mouseup", () => (isMouseDown = false));

populateCanvas();
