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
    if(req.session.username != null){
      return res.redirect('/');
    }
    else{
      req.session.user = null;
      req.session.usertype = null;
      req.session.username = null;
      req.session.useremail = null;
      req.session.authenticated = null;
      req.session.display_name = null;
      req.session.login = false;
      return res.view('auth/login', {login:true, error: false});
    }

  },
  /**
   * Action blueprints:
   *    `/auditory/session`
   */
   session: function (req, res) {
    
    /* Verify the username and password and construct the req.session.DATA */
    Users.findByLogin(req.body.username).done(function(err, user){
      if(err){
        return res.json({
          message: 'Error al hacer la petición al servidor',
          type: 'serverError',
          error: true
        });
      }
      if(user[0]){
        /*
        bcrypt.compare(req.body.password, user.password, function (err, match) {
          if (err) res.json({ error: 'Server error' }, 500);

          if (match) {
            // password match
            req.session.user = user.id;
            res.json(user);
          } else {
            // invalid password
            if (req.session.user) req.session.user = null;
            res.json({ error: 'Invalid password' }, 400);
          }
        });
        */
        if(user[0].pass == req.body.password){
          //Password match
          //console.log(req.session);
          req.session.user = user[0].id;
          req.session.usertype = user[0].type;
          req.session.username = user[0].login;
          req.session.useremail = user[0].email;
          req.session.authenticated = true;
          req.session.display_name = user[0].display_name;
          return res.redirect('/admin');
        }
        else{
          // invalid password
          return res.view('auth/login', {
            message: 'Contraseña Inválida',
            type: 'invalidPassword',
            error: true,
            login: true
          });
        }
      }
      else{
        return res.view('auth/login',{
          message: 'Usuario desconocido',
          type: 'unknownUser',
          error: true,
          login: true
        });
      }
    });    

  },

  /**
   * Action blueprints:
   *    `/auditory/create`
   */
   create: function (req, res) {
    
    // Send a JSON response
    /* Verify and Insert User data */
    try{
      Users.create({
        login: req.body.username,
        pass: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        display_name: req.body.first_name + " " + req.body.last_name,
        status: 'publish',
        type: 'user'
      }).done(function (err, user){
        if(err){
          console.log(err);
          res.view('auth/signup', {
            message: "Error al crear usurio!",
            type: "error",
            error: true
          });
        }
        else{
          console.log("User Created! " + user);
          res.view('auth/login', {
            message: "Excelente eres un usuario, ahora inicia sesión!",
            type: "sucessful",
            error: true
          });
        }
      }).error(function (err){
          console.log("Error al crear el usuario! " + err);
          res.view('auth/signup', {
            message: "Error al crear el usuario!",
            type: "error",
            error: true
          });
      });
    }
    catch(e){
      console.log(e);
      res.json(e);
    }

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

    try{
      if(req.session.user == null){
        return res.redirect('/login');
      }
      else{
        return res.view('auth/logout', {login:true});
      }
    }
    catch(e){
      __error = {
        message: "LoginController:logout",
        err: e,
      };
      req.session.user != null ? __user_id = null: __user_id = req.session.user;
      Auditory.create({
        user_id: __user_id,
        action: __error,
        status: "notviewed",
        type: "system"
      });
      console.log(__error);
    }
    

  },


  /**
   * Action blueprints:
   *    `/auditory/signout`
   */
   signout: function (req, res) {
    
    // Send a JSON response
    /* Destroy the req.session.DATA  */
    req.session.user = null;
    req.session.usertype = null;
    req.session.username = null;
    req.session.useremail = null;
    req.session.authenticated = null;
    req.session.display_name = null;

    res.redirect('/admin');

  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuditoryController)
   */
  _config: {}

  
};
