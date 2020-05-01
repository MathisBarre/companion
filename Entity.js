class Entity {
  constructor(x, y, height, width, bgColor, borderRadius, bgPause, bgMove, bgEat) {
    // VARIABLES
    this.height = height || random(10, 100)
    this.width = width || this.height || random(10, 100)
    this.bgColor = bgColor || getRandomColor()
    this.borderRadius = borderRadius || 0
    this.wrapper = window

    // VARIABLE -- Frames / Background Images
    this.bgPause = bgPause || "https://cdn.discordapp.com/attachments/702966328079810602/703607590269091901/image0.png"
    this.bgMove = bgMove || this.bgPause 
    this.bgEat = bgEat || this.bgPause

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
    this.elt.style.backgroundImage = `url(${this.bgPause})`
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

    // Start companion
    document.getElementsByTagName("body")[0].appendChild(this.elt)

    // Attach event
    this.elt.addEventListener("mousedown", this.grabe)
    this.elt.addEventListener("mouseup", this.land)
  }

  grabe = () => {
    this.mouseMoveEvent = window.addEventListener("mousemove", this.forceMove)
    this.elt.style.transform = 'scale(1.1)'
    this.elt.style.transitionDuration = `0s`
    this.lifeAuthorized = false
    this.elt.style.zIndex = parseInt(this.elt.style.zIndex) + 1
    this.elt.style.boxShadow = this.shadowWhenDrag
  }

  land = () => {
    window.removeEventListener("mousemove", this.forceMove)
    this.elt.style.transform = 'scale(1)'
    this.elt.style.transitionDuration = this.timeToTransition
    this.elt.style.zIndex = "9999999"
    this.elt.style.boxShadow = this.shadow
  }

  forceMove = (e) => {
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