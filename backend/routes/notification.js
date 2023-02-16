const express = require("express")
const router = express.Router()
const notificationController = require('../controller/notification')

router.post("/fetchNotification/:id" , notificationController.fetchNotification)
router.post("/replyToFrndReqNotification/:id" , notificationController.replyToFrndReqNotification)


module.exports = router