/**
 * UsersController
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

__PANEL = {
  login: false, 
  usertype: null,
  username: null,
  useremail: null,
};

module.exports = {

  /**
   * Action blueprints:
   *    `/users/create`
   */
   create: function (req, res) {
   
    // Send a JSON response

    Users.create({
      login: req.body.username,
      pass: req.body.password,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      display_name: req.body.first_name + " " + req.body.last_name,
      status: "publish",
      type: req.body.type
    }).done(function (err, user){
      if(err){
        console.log(err);
        res.json({
          message: "Error al crear usurio!",
          type: "error",
          error: true
        });
      }
      else{
        console.log("User Created! " + user);
        res.json({
          message: "Usuario creado con éxito!",
          type: "sucessful",
          error: false
        });
      }
    });
    
  },


  /**
   * Action blueprints:
   *    `/users/get`
   */
   get: function (req, res) {
    
    // Send a JSON response
    return res.view('admin/users/index', __PANEL);
  },


  /**
   * Action blueprints:
   *    `/users/get`
   */
   getOne: function (req, res) {
    
    // Send a JSON response
    return res.view('admin/users/update', __PANEL);
  },




  /**
   * Action blueprints:
   *    `/users/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    // Building
  },


  /**
   * Action blueprints:
   *    `/users/delete`
   */
   delete: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/users/activate`
   */
   activate: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/users/desactivate`
   */
   desactivate: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  login: function (req, res) {

    var bcrypt = require('bcrypt');

    Users.findOneByLogin( req.body.login ).done(function (err, user) {
      if (err) res.json({type: 'ERROR', message: 'Database Error'}, 500);

      if(user){
        bcrypt.compare(req.body.pass, user.pass, function (err, match){
          if(err) res.json({type: 'ERROR', message: 'Server Error'}, 500);
          if(match){
            req.session.user = user.id;
            res.json({type: 'SESSION', message: 'Session Successfully'});
          }
          else{
            if(req.session.user) req.session.user = null;
            res.json({type: 'ERROR', message: 'Invalid Password'}, 400);
          }
        });
      }
      else{
        req.json({err: 'UserNotFound'}, 404);
      }
    });

  },

  logout: function (req, res){
    res.session.user = null;
    res.send('Successfully logged out');
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  _config: {}

  
};
