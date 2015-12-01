'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password'),
  owasp = require('owasp-password-strength-test');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};
/**
 * Blog Schema
*/
var BlogSchema = new Schema({
  authorName: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
  },
  blogImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },

  blog_head: {
    type : String,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please give the Post a heading']
  },
  blog_content: {
    type : String,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please add content']
  },
  comments: [{
    person: {
      type: String
    },
    comment: {
      type: String
    }

  }],
  likes: {
    type: Number
  }



});

mongoose.model('Blog', BlogSchema);
