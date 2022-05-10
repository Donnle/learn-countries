const Router = require('express')
const Country = require('../models/Country')

const router = Router()

router.get('/getAllCountries', async (req, res) => {
  try {
    const allCountries = await Country.find()
    res.status(200).json(allCountries)
  } catch (e) {
    console.log(e)
    res.status(400).json({message: 'Error, try later'})
  }
})

module.exports = router
