const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
});

module.exports = mongoose.model('Person', PersonSchema);
