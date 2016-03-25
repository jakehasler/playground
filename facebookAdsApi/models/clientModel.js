// grab the things we need
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var clientSchema = new Schema({
  name: String,
  website: String,
  analytics: Number,
  facebook: Number,
  twitter: Number,
  emailPlatform: String,
  unbounce: Boolean,
  unbounceID: Number,
  faviconURL: String
});

// the schema is useless so far
// we need to create a model using it
var clientModel = mongoose.model('clientModel', clientSchema, 'clients');

// make this available to our users in our Node applications
module.exports = clientModel;