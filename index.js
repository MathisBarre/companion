class Companion {

  constructor (x, y, height, width, bgColor) {
    // Initialize variables
    this.height = height || random(10, 100)
    this.width = width || this.height || random(10, 100)
    this.bgColor = bgColor || getRandomColor()

    // Create element
    this.elt = document.createElement("div")

    this.elt.style.height = this.height + 'px'
    this.elt.style.width = this.width + 'px'
    this.elt.style.backgroundColor = this.bgColor
    this.elt.style.transitionDuration = random(1,5) + "s"

    this.elt.style.position = 'absolute'
    this.y = y || random(0,window.innerHeight)
    this.x = x || random(0,window.innerWidth)

    this.elt.style.zIndex = "9999999"
    document.getElementsByTagName("body")[0].appendChild(this.elt)

    // Let the companion be alive
    this.beAlive()
  }

  beAlive() {
    setInterval(() => {
      const randomY = Math.random() * 50 - 25 // Nombre entre -25 et 25
      const randomX = Math.random() * 50 - 25 // Nombre entre -25 et 25
      this.x = this._x + randomX
      this.y = this._y + randomY
    }, random(1,5) * 1000) // Toutes les 5 secondes
  }

  set x(newX) {
    this._x = newX
    this.elt.style.left = newX + 'px'
  }

  set y(newY) {
    this._y = newY
    this.elt.style.top = newY + 'px'
  }
}

/**
 * Retourne un nombre entier entre min et max
 * @param {number} min Nombre minimum
 * @param {number} max Nombre maximal
 */
function random(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()
new Companion()