const express = require("express")
const router = express.Router()
const smsController = require('../controller/sms')

router.post("/sendSMS/:id" , smsController.sendSMS)
router.post("/fetchSMS/:id" , smsController.fetchSMS)
router.post("/deleteMsg/:id" , smsController.deleteMsg)

module.exports = router