/**
 * AdminUsersController
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
    }
    catch(e){
      console.log('AdminUsersController ERROR!');
    }
    
  },
  
   get: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        Users.find().done(function (err, users){
          if(err){
            console.log('AdminUsersController:get ERROR');
            return res.json(err);
          }
          else{
            __data = req.session;
            __data.dataUsers = users;
            req.session.login = false;
            return res.view('admin/users/index', __data);
          }
        });
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
	    res.view('admin/users/create', req.session);
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
	    res.view('admin/users/delete', req.session);
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
        var id = req.param('id');
        console.log(id);
        Users.findOne(id).done(function (err, user){
          if(err){
            console.log("AdminUsersController:getOne ERROR");
          }
          if(!user){
            console.log("AdminUsersController:getOne NOTUSER");
            res.redirect('/404');
          }
          else{
            req.session.login = false;
            __data = req.session;
            __data.dataUser = user;
            return res.view('admin/users/update', __data);
          }
        });
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

   activate: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        var id = req.param('id');
        console.log(id);
        Users.findOne(id).done(function (err, user){
          if(err){
            console.log("AdminUsersController:activate ERROR");
          }
          if(!user){
            console.log("AdminUsersController:activate NOTUSER");
            res.redirect('/404');
          }
          else{
            var activateUser = {status: 'publish'};
            Users.update(user, activateUser, function (err, user){
              if(err){
                console.log("AdminUsersController:activate " + err );
              }
              if(!user){
                console.log("AdminUsersController:activate NOTUSER activate");
              }
              else{
                res.redirect('/admin/users');
              }
            });
          }
        });
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

   desactivate: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        var id = req.param('id');
        console.log(id);
        Users.findOne(id).done(function (err, user){
          if(err){
            console.log("AdminUsersController:desactivate ERROR");
          }
          if(!user){
            console.log("AdminUsersController:desactivate NOTUSER");
            res.redirect('/404');
          }
          else{
            var desactivateUser = {status: 'trash'};
            Users.update(user, desactivateUser, function (err, user){
              if(err){
                console.log("AdminUsersController:desactivate " + err );
              }
              if(!user){
                console.log("AdminUsersController:desactivate NOTUSER activate");
              }
              else{
                res.redirect('/admin/users');
              }
            });
          }
        });
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
    
    try{
      console.log(req.session.usertype);
      if(req.session.usertype == 'administrator'){
        console.log(req.body);
        Users.findOne({id: req.body.id, login: req.body.login}).done(function (err, user){
          if(err){
            console.log("AdminUsersController:update " + err );
          }
          if(!user){
            console.log("AdminUsersController:update NOTUSER findOne");
          }
          else{
            var updateUser = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              display_name: req.body.first_name + " " + req.body.last_name,
              email: req.body.email
            };
            if(req.body.password != '') updateUser.password = req.body.password;
            Users.update(user, updateUser, function (err, user){
              if(err){
                console.log("AdminUsersController:update " + err );
              }
              if(!user){
                console.log("AdminUsersController:update NOTUSER update");
              }
              else{
                res.redirect('/admin/users');
              }
            });
          }
        });
      }
      else if(req.session.usertype != null){
        console.log('AdminUsersController:update NOTLOGGEDUSER');
      }
      else{
        console.log('AdminUsersController:update NOTUSERPERMISSION ' + req.session.id);
      }
    }
    catch(e){
      console.log('AdminUsersController:update ' + e);
    }

  },


  
   delete: function (req, res) {
    
    console.log("AdminUsersController:delete NOT IMPLEMENTED");
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UsersController)
   */
  _config: {}

  
};
