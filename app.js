const express = require('express')
require('dotenv/config')
const  bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Product = require('./models/product')
const api = process.env.API_URL

const app = express()

//import routers
const productsRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const orderRouter = require('./routers/orderRouter')
const categoryRouter = require('./routers/categoryRouter')

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

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