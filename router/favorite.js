const express = require("express")
const favoriteController = require("../controller/favorite")
const jwtMiddleware = require("../middleware/jwt")

const router = express.Router()

router.post("/createFavorite", jwtMiddleware.verifyJWT, favoriteController.createFavorite)
router.post("/search", jwtMiddleware.verifyJWT, favoriteController.getPublicGits)
router.get("/listFavorites",jwtMiddleware.verifyJWT, favoriteController.listFavorites)

module.exports = router
