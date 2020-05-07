/* Companion object */
class Companion extends Entity {
  /**
   * Initialize companion
   * @param {number} x x initial
   * @param {number} y y initial
   * @param {number} height Height of the companion
   * @param {number} width Width of the companion
   * @param {hexadecimal} bgColor Background color of the companion
   * @param {number} borderRadius Percentage of border-radius
   * @param {string} bgPause Bg when not moving
   * @param {string} bgMove Bg when moving
   * @param {string} bgEat Bg when eat
   */
  constructor (x, y, height, width, bgColor, borderRadius, bgPause, bgMove, bgEat) {
    super(x, y, height, width, bgColor, borderRadius, bgPause, bgMove, bgEat)

    this.elt.addEventListener("mouseup", this.land)
    this.lifeAuthorized = true
    setTimeout(()=> this.beAlive(), 1000)
  }

  async beAlive() {
    let randomX = random(-100,100)
    let randomY = random(-100,100)
    let newX = this._x + randomX
    let newY = this._y + randomY

    // To not get out the window
    if (!(newX + this.width < this.wrapper.innerWidth && newX > 0)) {
      randomX = randomX * -1
    }
    if (!(newY + this.height < this.wrapper.innerHeight && newY > 0)) {
      randomY = randomY * -1
    }

    // Rotate
    ////const degree = getDegree(randomY, randomX)
    ////this.elt.style.transform = `rotate(${degree}deg)`
    ////await sleep(this.rotateSec * 1000)

    // Move
    this.x = this._x + randomX
    this.y = this._y + randomY
    this.elt.style.backgroundImage = `url(${this.bgMove})`
    await sleep(this.moveSec * 1000) // Move time
    this.elt.style.backgroundImage = `url(${this.bgPause})`
    await sleep(random(1000, 10000)) // Pause time

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