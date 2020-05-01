class Food extends Entity {
  constructor(bgImage) {
    super(
      null, null, // x, y
      100, 100,   // height, width
      "white",    // bgColor
      100,        // borderRadius
      bgImage || "https://www.lesfruitsetlegumesfrais.com/_upload/cache/ressources/produits/carotte/carotte_346_346_filled.jpg" // bgPause
    )

    this.elt.addEventListener("mousedown", this.stopCompanionsLife)
    this.elt.addEventListener("mouseup", this.verifyIfOnCompanion)
  }

  stopCompanionsLife = () => {
    companionList.forEach((companion) => {
      companion.lifeAuthorized = false
    })
  }

  verifyIfOnCompanion = () => {
    companionList.forEach((companion) => {
      const centerXofFood = this._x + ( this.width / 2 )
      const centerYofFood = this._y + ( this.height / 2 )
      const companionCoordRightBorder = ( companion._x + companion.width )
      const companionCoordBottomBorder = ( companion._y + companion.height )

      if( 
           centerXofFood > companion._x
        && centerXofFood < companionCoordRightBorder
        && centerYofFood > companion._y
        && centerYofFood < companionCoordBottomBorder 
      ) {
        this.feed(companion)
        return
      } else {
        console.log("Personne n'a été nourrit")
      }
    })
  }

  feed = (companion) => {
    console.log(`La nourriture nourrit ${companion}`)

    this.elt.style.display = "none"
  }
}