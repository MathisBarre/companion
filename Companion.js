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
    this.elt.addEventListener("mousedown", this.grab)
    this.lifeAuthorized = true
    this.isAlive = 0
    setTimeout(()=> this.beAlive(), 1000)
  }

  async beAlive() {
    this.isAlive = this.isAlive + 1
    await sleep(random(1000, 10000)) // Pause time
    if(this.isAlive >= 1 ) { this.isAlive -= 1; return }
    if(!this.lifeAuthorized) return

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
    this.elt.style.backgroundImage = `url(${this.bgMove})`
    this.x = this._x + randomX
    this.y = this._y + randomY
    await sleep(this.moveSec * 1000) // Move time
    this.elt.style.backgroundImage = `url(${this.bgPause})`

    // Repeat
    this.isAlive = false;
    if (this.lifeAuthorized && !this.isAlive ) this.beAlive();

  }

  grab = (e) => {
    this.lifeAuthorized = false
    this.elt.style.backgroundImage = `url(${this.bgPause})`
    this.x = e.pageX - ( this.width / 2 )
    this.y = e.pageY - ( this.height / 2 )
  }

  land = () => {
    if (!this.isAlive) this.lifeAuthorized = true
    this.beAlive()
  }
}