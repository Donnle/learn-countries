const express = require('express')
const mongoose = require('mongoose')
const countryRouter = require('./router/countryRouter')
const userRouter = require('./router/userRouter')
require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/countries', countryRouter)
app.use('/user', userRouter)

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@learncounties.erkcl.mongodb.net/learnCountries?retryWrites=true&w=majority`)
    app.listen(PORT, () => {
      console.log(`Success started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
