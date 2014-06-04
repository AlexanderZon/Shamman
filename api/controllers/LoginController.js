/**
 * AuditoryController
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
    
  
  /**
   * Action blueprints:
   *    `/auditory/get`
   */
   get: function (req, res) {
    
    // Send a JSON response
    return res.view('auth/login', {login:true});

  },
  /**
   * Action blueprints:
   *    `/auditory/session`
   */
   session: function (req, res) {
    
    /* Verify the username and password and construct the req.session.DATA */

  },

  /**
   * Action blueprints:
   *    `/auditory/create`
   */
   create: function (req, res) {
    
    // Send a JSON response
    /* Verify and Insert User data */

  },

  /**
   * Action blueprints:
   *    `/auditory/signup`
   */
   signup: function (req, res) {
    
    // Send a JSON response
    return res.view('auth/signup', {login:true});

  },


  /**
   * Action blueprints:
   *    `/auditory/logout`
   */
   logout: function (req, res) {
    
    // Send a JSON response
    
    return res.view('auth/logout', {login:true});

  },


  /**
   * Action blueprints:
   *    `/auditory/signout`
   */
   signout: function (req, res) {
    
    // Send a JSON response
    /* Destroy the req.session.DATA  */

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuditoryController)
   */
  _config: {}

  
};
