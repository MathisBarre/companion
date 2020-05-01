class Food extends Entity {
  constructor(bgImage) {
    super(
      null, null, // x, y
      100, 100,   // height, width
      "white",    // bgColor
      100,        // borderRadius
      bgImage || "https://www.lesfruitsetlegumesfrais.com/_upload/cache/ressources/produits/carotte/carotte_346_346_filled.jpg" // bgPause
    )
  }
}