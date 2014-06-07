/**
 * AdminSymptomsController
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
   *    `/users/create`
   */
   create: function (req, res) {

   	try{

	    Symptoms.create({
	      content: req.body.content,
	      description: req.body.description,
	      user_id: req.session.user,
	    }).done(function (err, user){
	      if(err){
	        console.log(err);
	        res.json({
	          message: "Error al crear sintoma!",
	          type: "error",
	          error: true
	        });
	      }
	      else{
	        console.log("User Created! " + user);
	        res.json({
	          message: "Síntoma creado con éxito!",
	          type: "sucessful",
	          error: false
	        });
	      }
	    });

   	}
   	catch(e){
	        res.json({
	          message: "AdminSymptomsController ERROR.",
	          type: "error",
	          error: true
	        });
   		console.log('AdminSymptomsController ERROR.');
   	}

    
  },


  /**
   * Action blueprints:
   *    `/users/get`
   */
   get: function (req, res) {
    try{
      if(req.session.usertype == 'administrator'){
        req.session.login = false;
        return res.view('admin/symptoms/index', req.session);
      }
      else if(req.session.usertype == 'user'){
        req.session.login = false;
        res.redirect('/');
      }
      else{
        res.redirect('/login');
      }
    }
    catch(e){
      res.redirect('/login');
    }
  },

   getCreate: function (req, res) {
    
    // Send a JSON response
    try{
      if(req.session.usertype == 'administrator'){
	    req.session.login = false;
	    res.view('admin/symptoms/create', req.session);
      }
      else if(req.session.usertype == 'user'){
        req.session.login = false;
        res.redirect('/');
      }
      else{
        res.redirect('/login');
      }
    }
    catch(e){
      res.redirect('/login');
    }
  },

   getDelete: function (req, res) {
    
    // Send a JSON response
    try{
      if(req.session.usertype == 'administrator'){
	    req.session.login = false;
	    res.view('admin/symptoms/delete', req.session);
      }
      else if(req.session.usertype == 'user'){
        req.session.login = false;
        res.redirect('/');
      }
      else{
        res.redirect('/login');
      }
    }
    catch(e){
      res.redirect('/login');
    }
  },


  /**
   * Action blueprints:
   *    `/users/get`
   */
   getOne: function (req, res) {
    
    // Send a JSON response
    try{
      if(req.session.usertype == 'administrator'){
        req.session.login = false;
        return res.view('admin/symptoms/update', req.session);
      }
      else if(req.session.usertype == 'user'){
        req.session.login = false;
        res.redirect('/');
      }
      else{
        res.redirect('/login');
      }
    }
    catch(e){
      res.redirect('/login');
    }
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

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  _config: {}

  
};
