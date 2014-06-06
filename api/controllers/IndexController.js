/**
 * IndexController
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
   * Overrides for the settings in `config/controllers.js`
   * (specific to IndexController)
   */
   get: function(req, res){
	    if(req.session.authenticated){
	      console.log("NOT")
	    }
	    else if(req.session.authenticated == null){
	      console.log("NULL");
	      req.session.user = null;
	      req.session.usertype = null;
	      req.session.username = null;
	      req.session.useremail = null;
	      req.session.authenticated = null;
	      req.session.display_name = null;
	      req.session.login = false;
	      return res.view('home/index', req.session);
	    }
	    else{
	      console.log("AUTH");
	      return res.view('home/index', req.session);
	    }
	    return res.view('home/index', req.session);
	},
  _config: {}

  
};
