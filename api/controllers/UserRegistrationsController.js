/**
 * UserRegistrationsController
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

module.exports = {

  new: function(req,res) {
    res.view("users/registrations/new");
  },

  create: function(req,res) {
    console.log("user controller created");
    console.log(req.params.all());

    User.create( req.params.all(), function userCreated(err, user) {
      console.log("user created");
      console.log(err);
      console.log(user);
      if (err) {
        req.session.flash = {
          err: err
        }
        res.view("users/registrations/new");
        return;
      } else {
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
      }
    })
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserRegistrationsController)
   */
  _config: {}


};
