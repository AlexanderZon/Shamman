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
    if(__PANEL.username != null){
      return res.redirect('/');
    }
    else{
      return res.view('auth/login', {login:true});
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
      if(user){
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
          console.log(req.session);
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
          return res.json({
            message: 'Contraseña Inválida: ',
            type: 'invalidPassword',
            error: false
          });
        }
      }
      else{
        return res.json({
          message: 'Usuario desconocido',
          type: 'unknownUser',
          error: true
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
