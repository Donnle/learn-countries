const Router = require('express')
const {check} = require('express-validator')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/User')

const router = Router()

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) return res.status(400).json({message: 'User is not defined'})
    const comparedPassword = bcrypt.compareSync(password, user.password)
    if (!comparedPassword) return res.status(400).json({message: 'Password Error'})
    return res.status(200).json({message: 'Success login', userId: user._id})
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Error, try later'})
  }
})
router.post('/registration', [
  check('username', "Username cannot be empty").notEmpty(),
  check('password', 'Min password length - 8 symbols').isLength({min: 8})
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({message: errors.errors[0].msg})
    const {username, password} = req.body
    const isUserUniq = await User.findOne({username})
    if (isUserUniq) return res.status(400).json({message: 'A user with the same login is registered'})
    const hashedPassword = bcrypt.hashSync(password, 7)
    const user = new User({username, password: hashedPassword})
    user.save()
    return res.status(200).json({message: 'Success registered'})
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Error, try later'})
  }
})
router.put('/addLearnedCountry', async (req, res) => {
  try {
    const {userId, countryId} = req.body
    const {matchedCount} = await User.updateOne({$and: [{_id: userId}, {learnedCountries: {$ne: countryId}}]}, {$push: {learnedCountries: countryId}})
    if (!matchedCount) return res.status(400).json({message: 'Relogin and try again or country already learned'})
    return res.status(200).json({message: 'Success added'})
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Error, try later'})
  }
})
router.put('/removeLearnedCountry', async (req, res) => {
  try {
    const {userId, countryId} = req.body
    const user = await User.findById(userId)
    if (!user) return res.status(400).json({message: 'Relogin and try again'})
    const {modifiedCount} = await User.updateOne({_id: userId}, {$pull: {learnedCountries: countryId}})
    if (!modifiedCount) return res.status(400).json({message: 'Relogin and try again or country id is not defined'})
    return res.status(200).json({message: 'Success removed'})
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Error, try later'})
  }
})
router.get('/userInfo/:userId', async (req, res) => {
  const {userId} = req.params
  const user = await User.findById(userId)
  if (!user) return res.status(400).json({message: 'User is not defined'})
  return res.status(200).json({message: 'Success', user})
})

module.exports = router
