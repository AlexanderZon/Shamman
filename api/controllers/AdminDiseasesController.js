/**
 * AdminDiseasesController
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

   create: function (req, res) {

    try{
      Diseases.create({
        content: req.body.content,
        description: req.body.description,
        user_id: req.session.user,
      	}).done(function (err, disease){
	        if(err){
	          console.log(err);
	          res.json({
	            message: "Error al crear Enfermedad!",
	            type: "error",
	            error: true
	          });
	        }
	        else{
	          console.log("Disease Created! " + disease);
	          res.json({
	            message: "Usuario creado con éxito!",
	            type: "sucessful",
	            error: false
	          });
	        }
	    });
	}
    catch(e){
      console.log('AdminDiseasesController ERROR!');
    }
    
  },

   get: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        req.session.login = false;
        return res.view('admin/diseases/index', req.session);
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
    
    try{
      if(req.session.usertype == 'administrator'){
	    req.session.login = false;
	    res.view('admin/diseases/create', req.session);
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
    
    try{
      if(req.session.usertype == 'administrator'){
	    req.session.login = false;
	    res.view('admin/diseases/delete', req.session);
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

   getOne: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        req.session.login = false;
        return res.view('admin/diseases/update', req.session);
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

   update: function (req, res) {
    
    // Send a JSON response
    // Building
  },

   delete: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/diseases/activate`
   */
   activate: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/diseases/desactivate`
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
