class Companion {
  /**
   * 
   * @param {number} x x initial
   * @param {number} y y initial
   * @param {number} height Height of the companion
   * @param {number} width Width of the companion
   * @param {hexadecimal} bgColor Background color of the companion
   */
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
    this.y = y || random(0,window.innerHeight-this.height)
    this.x = x || random(0,window.innerWidth-this.width)

    this.elt.style.zIndex = "9999999"
    document.getElementsByTagName("body")[0].appendChild(this.elt)

    // Let the companion be alive
    this.beAlive()
  }

  beAlive() {
    const docElt = document.documentElement
    setInterval(() => {
      // Move
      const randomX = random(-100,100)
      const randomY = random(-100,100)
      if (this._x + randomX + this.width < docElt.scrollWidth && this._x + randomX > 0) this.x = this._x + randomX
      if (this._y + randomY + this.height < docElt.scrollHeight && this._y + randomY > 0) this.y = this._y + randomY
    }, random(1,5) * 1000)
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

for (let i = 0; i < 10; i++) new Companion()