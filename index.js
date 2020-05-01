class Companion {
  /**
   * 
   * @param {number} x x initial
   * @param {number} y y initial
   * @param {number} height Height of the companion
   * @param {number} width Width of the companion
   * @param {hexadecimal} bgColor Background color of the companion
   * @param {number} borderRadius Pourcentage de border-radius
   */
  constructor (x, y, height, width, bgColor, borderRadius) {
    // Initialize variables
    this.height = height || random(10, 100)
    this.width = width || this.height || random(10, 100)
    this.bgColor = bgColor || getRandomColor()
    this.borderRadius = borderRadius || 0
    this.wrapper = window

    // Time
    this.rotateSec = 0.1
    this.moveSec = random(1,5)

    // Variables
    this.shadow = "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
    this.shadowWhenDrag = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    this.timeToTransition  = `${this.moveSec}s, ${this.moveSec}s, ${this.rotateSec}s, 0.1s`
    this.eltsToTransition = `top             , left            , transform          , box-shadow`
    
    // STYLE -- Create element
    this.elt = document.createElement("div")

    this.elt.style.height = this.height + 'px'
    this.elt.style.width = this.width + 'px'
    this.elt.style.borderRadius = this.borderRadius + '%'
    this.elt.style.zIndex = "9999999"

    // STYLE -- Background
    this.elt.style.backgroundColor = this.bgColor
    this.elt.style.backgroundImage = `url(https://cdn.discordapp.com/attachments/702966328079810602/703607590269091901/image0.png)`
    this.elt.style.backgroundSize = `contain`
    this.elt.style.backgroundRepeat = `no-repeat`
    this.elt.style.backgroundPosition = `center center`
    this.elt.style.border = `solid 1px black`
    
    // STYLE -- Animations
    this.elt.style.transitionDuration = this.timeToTransition
    this.elt.style.transitionProperty = this.eltsToTransition
    this.elt.style.transitionTimingFunction = `linear`

    // STYLE -- Others
    this.elt.style.boxShadow = this.shadow

    // Coordinate
    this.elt.style.position = 'fixed'
    this.y = y || random(0,this.wrapper.innerHeight-this.height)
    this.x = x || random(0,this.wrapper.innerWidth-this.width)

    // Attach event
    this.elt.addEventListener("mousedown", this.mouseDown)
    this.elt.addEventListener("mouseup", this.mouseUp)

    // Start companion
    document.getElementsByTagName("body")[0].appendChild(this.elt)
    this.lifeAuthorized = true
    this.beAlive()
  }

  async beAlive() {
    let randomX = random(-100,100)
    let randomY = random(-100,100)
    let newX = this._x + randomX
    let newY = this._y + randomY

    if (!(newX + this.width < this.wrapper.innerWidth && newX > 0)) { // Si les x dépassent
      randomX = randomX * -1 // Inverse les x
    }
    if (!(newY + this.height < this.wrapper.innerHeight && newY > 0)) { // Si les y dépassent
      randomY = randomY * -1 // Inverse les y
    }

    // Rotate
    ////const degree = getDegree(randomY, randomX)
    ////this.elt.style.transform = `rotate(${degree}deg)`
    ////await sleep(this.rotateSec * 1000)

    // Move
    this.x = this._x + randomX
    this.y = this._y + randomY
    await sleep(this.moveSec * 1000 + /*this.dontMoveSec*/ 1000)

    // Repeat
    if(this.lifeAuthorized) {
      this.beAlive()
    }
  }

  mouseDown = () => {
    this.mouseMoveEvent = window.addEventListener("mousemove", this.mouseMove)
    this.elt.style.transform = 'scale(1.1)'
    this.elt.style.transitionDuration = `0s`
    this.lifeAuthorized = false
    this.elt.style.zIndex += 1
    this.elt.style.boxShadow = this.shadowWhenDrag
  }

  mouseUp = () => {
    window.removeEventListener("mousemove", this.mouseMove)
    this.elt.style.transform = 'scale(1)'
    this.elt.style.transitionDuration = this.timeToTransition
    this.lifeAuthorized = true
    this.beAlive()
    this.elt.style.zIndex -= 1
    this.elt.style.boxShadow = this.shadow
  }

  mouseMove = (e) => {
    this.elt
    this.x = e.pageX - ( this.width / 2 )
    this.y = e.pageY - ( this.height / 2 )
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

for (let i = 0; i < 1; i++) new Companion(null, null, 100, null, "white", 100)

window.addEventListener("keyup", () => {
  new Companion(null, null, 100, null, "white", 100)
})