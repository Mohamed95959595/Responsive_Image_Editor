let imgDiv = document.querySelector(".image");
let image = document.querySelector(".image img");
let upload = document.querySelector(".upload input");
let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue-rotate");
let reset = document.querySelector(".control-btns .reset");
let download = document.querySelector(".control-btns .download");
let allFilters = document.querySelectorAll(".section-two input");

let canvas = document.querySelector('.image .canvas');
let ctx = canvas.getContext("2d")

window.onload = function() {
  download.style.display= 'none'
  reset.style.display= 'none'
  imgDiv.style.display= 'none'
}

// 1- Upload Image
upload.onchange = function () {
  download.style.display= 'block'
  reset.style.display= 'block'
  imgDiv.style.display= 'block'
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    image.src = file.result;
  };
  // draw the image into canvas (to download it)
  image.onload = function() {
    canvas.width = image.width
    canvas.height = image.height
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    image.style.display = 'none'
  }

  // reset image & filter
  resetFilters();
};

// 2- Filter Image (canvas)
allFilters.forEach(function (filter) {
  filter.oninput = function () {
    ctx.filter = `
    saturate(${saturate.value}%) 
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value}%)
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  };
});

// 3- Reset & Download Btns
reset.onclick = resetFilters

download.onclick = function() {
  download.href = canvas.toDataURL()
}

//! Functions
function resetFilters() {
  // reset image
  ctx.filter = "none";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  // reset filters
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hueRotate.value = "0";
}

