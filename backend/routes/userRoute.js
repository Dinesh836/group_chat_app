const express = require("express")
const router = express.Router()
const userController = require('../controller/user')

router.post("/signup" , userController.signup)
router.post("/login" , userController.login)
router.get("/fetchAllUser" , userController.fetchAllUser)
router.post("/fetchFrndsforUser/:id" , userController.fetchFrndsforUser)
router.post("/unFrnd/:id" , userController.unFrnd)

module.exports = router