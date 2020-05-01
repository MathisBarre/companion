class Companion extends Entity {
  /**
   * 
   * @param {number} x x initial
   * @param {number} y y initial
   * @param {number} height Height of the companion
   * @param {number} width Width of the companion
   * @param {hexadecimal} bgColor Background color of the companion
   * @param {number} borderRadius Pourcentage de border-radius
   */
  constructor (x, y, height, width, bgColor, borderRadius, bgPause, bgMove, bgEat) {
    super(x, y, height, width, bgColor, borderRadius, bgPause, bgMove, bgEat)

    this.elt.addEventListener("mouseup", this.land)
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

  land = () => {
    this.lifeAuthorized = true
    this.beAlive()
  }
}