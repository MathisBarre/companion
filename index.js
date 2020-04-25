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
    
    this.rotateSec = 0.5
    this.moveSec = random(1,5)
    this.wrapper = document.documentElement

    // Create element
    this.elt = document.createElement("div")

    this.elt.style.height = this.height + 'px'
    this.elt.style.width = this.width + 'px'
    this.elt.style.backgroundColor = this.bgColor
    this.elt.style.backgroundImage = `url(https://www.girod-signalisation.com/Content/images/PRO_/PRO_signalisation-temporaire-panneaux-composables-symbole-pointe-de-fleche.jpg)`
    this.elt.style.backgroundSize = `contain`
    this.elt.style.border = `solid 1px blue`
    this.elt.style.
    
    this.elt.style.transitionDuration = `${this.moveSec}s, ${this.moveSec}s, ${this.rotateSec}s`
    this.elt.style.transitionProperty = `top, left, transform`
    this.elt.style.transitionTimingFunction = `linear`

    this.elt.style.position = 'absolute'
    this.y = y || random(0,window.innerHeight-this.height)
    this.x = x || random(0,window.innerWidth-this.width)

    this.elt.style.zIndex = "9999999"
    document.getElementsByTagName("body")[0].appendChild(this.elt)

    // Let the companion be alive
    this.beAlive()
  }

  async beAlive() {
    const randomX = random(-100,100)
    const randomY = random(-100,100)
    const newX = this._x + randomX
    const newY = this._y + randomY

    if (!(newX + this.width < this.wrapper.scrollWidth && newX > 0)) { // Si les x dépassent
      randomX = randomX * -1 // Inverse les x
    }
    if (!(newY + this.height < this.wrapper.scrollHeight && newY > 0)) { // Si les y dépassent
      randomY = randomY * -1 // Inverse les y
    }

    const degree = getDegree(randomY, randomX)
    this.elt.style.transform = `rotate(${degree}deg)`
    await sleep(this.rotateSec * 1000)
    this.x = newX
    this.y = newY
    await sleep(this.moveSec * 1000 + 1000)
    this.beAlive()
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

for (let i = 0; i < 10; i++) new Companion()