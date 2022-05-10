const {Schema, model} = require('mongoose')

const Country = new Schema({
  _id: Schema.ObjectId,
  name: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  }
})

module.exports = model('Countries', Country)
