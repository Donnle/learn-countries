const {Schema, model} = require('mongoose')

const User = new Schema({
  _id: {
    type: Schema.ObjectId,
    default: null
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  learnedCountries: {
    type: [String],
  }
})

module.exports = model('User', User)
