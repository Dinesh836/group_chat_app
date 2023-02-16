const express = require("express")
const router = express.Router()
const frndReqController = require('../controller/frndReq')

router.post("/sendFrndReq/:id" , frndReqController.sendFrndReq)
router.post("/fetchFrndsforUser/:id" , frndReqController.fetchFrndsforUser)
router.post('/fetchAllUser/:id' , frndReqController.fetchAllUser)



module.exports = router