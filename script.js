// DOM Elements
const body = document.querySelector("body");
// Canvas
const canvas = document.getElementById("canvas");
const canvasWidth = 640;
// Settings
const colorSettings = document.getElementById("color");
const sizeSettings = document.getElementById("pixels");
const rainbowMode = document.getElementById("rainbow");
const resetCanvas = document.getElementById("reset-canvas");

// States
const pixels = [];
let canvasSize = 16;
let color = "#000000";

let isMouseDown = false;
let isRainbowModeOn = false;
let hueCycle = 0;

function populateCanvas() {
  if (pixels.length > 0) {
    pixels.forEach((pixel) => pixel.remove());
    pixels.length = 0;
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
    pixels.push(pixel);
  }
}

body.addEventListener("mouseup", () => (isMouseDown = false));

colorSettings.addEventListener("focusout", () => (color = colorSettings.value));
sizeSettings.addEventListener("focusout", () => {
  const value = sizeSettings.value;
  if (value > 64) {
    canvasSize = 64;
    sizeSettings.value = 64;
  } else if (value < 16) {
    canvasSize = 16;
    sizeSettings.value = 16;
  } else {
    canvasSize = value;
  }

  populateCanvas();
});
resetCanvas.addEventListener("click", populateCanvas);

colorSettings.value = color;
sizeSettings.value = canvasSize;

populateCanvas();

async function startRainbowMode() {
  while (isRainbowModeOn) {
    await new Promise((r) => setTimeout(r, 1000));

    hueCycle += 25;
    if (hueCycle > 255) {
      hueCycle = 0;
    }

    color = `hsl(${hueCycle.toString(16)},100%,50%)`;
  }
}

rainbowMode.addEventListener("change", () => {
  isRainbowModeOn = rainbowMode.checked;
  if (isRainbowModeOn) {
    startRainbowMode();
  }
});
