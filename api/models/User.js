/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt')

module.exports = {
  tableName: 'users',
  migrate: 'safe',

  beforeCreate: function(user, cb) {
    console.log("before create");
    console.log(user.password);

    if (!user.password) {
      return next({err: ["Password cannot be blank"]})
    }

    console.log("before create 22");
    console.log(user.password);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        console.log("after hash");
        console.log(err);
        console.log(hash);
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.encrypted_password = hash;
          cb(null, user);
        }
      });
    });
  },

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    encrypted_password: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    mobile_phone_number: {
      type: 'string'
    },
  },

  toJSON: function() {
    var obj = this.toObject();
    delete obj.encrypted_password;
    return obj;
  }
};
