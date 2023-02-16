const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()

const user_routes = require('./routes/userRoute')
const group_routes = require('./routes/groupRoute')
const sms_routes = require('./routes/msgRoute')
const frndReq_routes = require('./routes/frndReqRoute')
const notification_route = require("./routes/notification")
const authMiddeleware = require('./middelware/auth')

const app = express();



// Define a simple route

//middleware 
app.use(express.json())


app.use(cors())

//routes
app.use('/user' ,user_routes)
app.use('/group' , group_routes)
app.use('/sms' , sms_routes)
app.use('/frndReq' , frndReq_routes)
app.use("/notification" , notification_route)

mongoose.connect( process.env.BD_URI, {useNewUrlParser: true, useUnifiedTopology: false})
.then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}.`)
    });
}).catch(err => console.log(err))

