const express = require("express")
const router = express.Router()
const groupController = require('../controller/group')

router.post("/createGroup" , groupController.createGroup)
router.post("/deleteGroup/:id" , groupController.deleteGroup)
router.post("/editGroup/:id" , groupController.editGroup)
router.post("/fetchGroupsforUser/:id" , groupController.fetchGroupsforUser)


module.exports = router