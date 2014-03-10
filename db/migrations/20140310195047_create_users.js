/*
* Sails migration
* Created at 2014-03-10T19:50:47+08:00
* */

exports.up = function(adapter, done) {
  console.log("up");
  var definition = {
    id: {
        type: 'INTEGER',
        autoIncrement: true,
        defaultsTo: 'AUTO_INCREMENT',
        primaryKey: true
    },
    name: {
      type: 'STRING'
    },
    email: {
      type: 'STRING'
    },
    encrypted_password: {
      type: 'STRING'
    },
    mobile_phone_number: {
      type: 'STRING'
    }
  }
  adapter.define('users', definition, done);
};

exports.down = function(adapter, done) {
  adapter.drop('users', done);
};
