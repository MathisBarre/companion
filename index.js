function getDegree(Y, X) {
  if( Y > 0 && X > 0) {
    return Math.atan(Y/X) * 180 / Math.PI
  } else if(Y > 0 && X < 0) {
    return Math.atan(Y/X) * 180 / Math.PI - 180
  } else if(Y < 0 && X < 0) {
    return Math.atan(Y/X) * 180 / Math.PI + 180
  } else if(Y < 0 && X > 0) {
    return Math.atan(Y/X) * 180 / Math.PI
  } 
}

/**
 * Return an integer between min and max
 * @param {number} min nb min
 * @param {number} max nb max
 */
function random(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return an hexadecimal code (=color)
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

for (let i = 0; i < 1; i++) new Companion(null, null, 100, null, "white", 100)

window.addEventListener("keyup", () => {
  new Companion(null, null, 100, null, "white", 100)
})