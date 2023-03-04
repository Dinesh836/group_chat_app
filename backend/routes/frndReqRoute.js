const express = require("express")
const router = express.Router()
const frndReqController = require('../controller/frndReq')

router.post("/sendFrndReq/:id" , frndReqController.sendFrndReq)


module.exports = router