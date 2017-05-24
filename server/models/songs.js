var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:  {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// create a schema
var songSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    singer: {
        type: String,
        required: true,
        unique: true
    },
    music: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    },
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Songs = mongoose.model('Song', songSchema);

// make this available to our Node applications
module.exports = Songs;