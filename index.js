class Companion {

  constructor(x = window.innerWidth/2, y = window.innerHeight/2, height = 50, width = 50, bgColor = "grey") {
    // Initialize variables
    this.height = height
    this.width = width

    // Create element
    this.elt = document.createElement("div")

    this.elt.style.height = this.height + 'px'
    this.elt.style.width = this.width + 'px'
    this.elt.style.backgroundColor = bgColor
    this.elt.style.transitionDuration = "1s"

    this.elt.style.position = 'absolute'
    this.y = y
    this.x = x

    document.getElementsByTagName("body")[0].appendChild(this.elt)

    this.beAlive()
  }

  beAlive() {
    const interval = setInterval(() => {
      const random = Math.random()
      if(random < 0.25 && random > 0.00) this.up()
      if(random < 0.50 && random > 0.25) this.down()
      if(random < 0.75 && random > 0.50) this.left()
      if(random < 1.00 && random > 0.75) this.right()
    }, 5 * 1000)
  }

  set x(newX) {
    this._x = newX
    this.elt.style.left = newX + 'px'
  }

  set y(newY) {
    this._y = newY
    this.elt.style.top = newY + 'px'
  }

  up() {
    this.y = this._y - 50
  }

  down() {
    this.y = this._y + 50
  }

  left() {
    this.x = this._x - 50
  }

  right() {
    this.x = this._x + 50
  }
}

var blocky = new Companion()