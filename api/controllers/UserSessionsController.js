/**
 * UserSessionsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require("passport");

module.exports = {
  new: function(req,res) {
    res.view("users/sessions/new");
  },

  create: function(req,res) {
    passport.authenticate('local', function(ignore, user, err){
      if ((err) || (!user)) {
        req.session.flash = {
          err: err
        }
        res.redirect('/users/sessions/new');
        return;
      }

      req.logIn(user, function(err){
        if (err) {
          req.session.flash = {
            err: err
          }
          res.redirect('/users/sessions/new');
        } else {
          req.session.flash = {};
          return res.redirect('/users/profile');
        }
      });
    })(req, res);
  },

  destroy: function (req,res) {
    req.logout();
    res.send('logout successful');
  },

  _config: {}
};
