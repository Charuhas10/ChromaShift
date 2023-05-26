const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!checkHexCode(hex)) return;
  const strippedHex = hex.replace("#", "");

  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
});

//check to see whether the input from the user is a valid hex color code
const checkHexCode = (hexCode) => {
  if (!hexCode) return false;

  const hex = hexCode.replace("#", "");
  return hex.length === 3 || hex.length === 6;
};

//convert hex to rgb
const hextoRGB = (hex) => {
  if (!checkHexCode(hex)) return;

  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

//convert rgb to hex
const rgbToHex = (r, g, b) => {
  const pairOne = ("0" + r.toString(16)).slice(-2);
  const pairTwo = ("0" + g.toString(16)).slice(-2);
  const pairThree = ("0" + b.toString(16)).slice(-2);

  return "#" + pairOne + pairTwo + pairThree;
};

const alterColor = (hex, percentage) => {
  const { r, g, b } = hextoRGB(hex);
  const amt = Math.floor((percentage / 100) * 255);

  const R = range0to255(r, amt);
  const G = range0to255(g, amt);
  const B = range0to255(b, amt);

  return rgbToHex(R, G, B);
};

const range0to255 = (hex, amt) => {
  const newHex = hex + amt;
  if (newHex > 255) return 255;
  if (newHex < 0) return 0;
  return newHex;

  // return Math.min(255,Math.max(0,hex+amt)))
};

slider.addEventListener("input", () => {
  if (!checkHexCode(hexInput.value)) return;
  sliderText.textContent = `${slider.value}%`;

  const valueAdd = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;

  const alteredHex = alterColor(hexInput.value, valueAdd);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

const reset = () => {
  slider.value = 0;
  sliderText.textContent = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
