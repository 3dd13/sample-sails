var passport    = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt        = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    process.nextTick(function () {
      User.findOne({email: email}).done(function(err, user) {
        if (err) {
          return done(null, false, err);
        }
        if (!user || user.length < 1) {
          return done(null, false, { message: 'Incorrect User'});
        }
        bcrypt.compare(password, user.encrypted_password, function(err, res) {
          if (!res) {
            return done(null, false, { message: 'Invalid Password'});
          }
          return done(null, user, null);
        });
      });
    });
  })
);

module.exports = {
 express: {
    customMiddleware: function(app){
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
