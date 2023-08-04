const express = require('express')
const app = express()
require('dotenv/config')
const cors = require('cors')
const  bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Product = require('./models/product')
const api = process.env.API_URL
const verifyToken = require('./middlewares/auth')

//load cross origin resource sharing
app.use(cors()) 
app.options('*', cors()) //use cors on all http options i.e: GET, PUT, etc.

//import routers
const productsRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const orderRouter = require('./routers/orderRouter')
const categoryRouter = require('./routers/categoryRouter')

//load middlewares
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(verifyToken())

//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, userRouter)
app.use(`${api}/orders`, orderRouter)
app.use(`${api}/category`, categoryRouter)

//database setup
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('connected to database...');
})
.catch((err) => {
  console.log('Error connecting to db', err);
})





app.listen(3000, () => {
  console.log('server started on port 3000');
}) 