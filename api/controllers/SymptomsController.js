/**
 * AdminSymptomsController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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
      Symptoms.create({
        content: req.body.content,
        description: req.body.description,
        user_id: req.session.user
      }).done(function (err, symptom){
        if(err){
          console.log(err);
          res.json({
            message: "Error al crear síntoma!",
            type: "error",
            error: true
          });
        }
        else{
          console.log("Symptom Created! " + symptom);
          res.json({
            message: "Síntoma creado con éxito!",
            type: "sucessful",
            error: false
          });
        }
      });
    }
    catch(e){
      console.log('AdminSymptomsController ERROR!');
    }
    
  },
  
   get: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        Symptoms.find().done(function (err, symptoms){
          if(err){
            console.log('AdminSymptomsController:get ERROR');
            return res.json(err);
          }
          else{
            __data = req.session;
            __data.dataSymptoms = symptoms;
            req.session.login = false;
            return res.view('admin/symptoms/index', __data);
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

   getOne: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        var id = req.param('id');
        console.log(id);
        Symptoms.findOne(id).done(function (err, symptom){
          if(err){
            console.log("AdminSymptomsController:getOne ERROR");
          }
          if(!symptom){
            console.log("AdminSymptomsController:getOne NOTUSER");
            res.redirect('/404');
          }
          else{
            req.session.login = false;
            __data = req.session;
            __data.dataSymptom = symptom;
            return res.view('admin/symptoms/update', __data);
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
        Symptoms.findOne(id).done(function (err, symptom){
          if(err){
            console.log("AdminSymptomsController:activate ERROR");
          }
          if(!symptom){
            console.log("AdminSymptomsController:activate NOTUSER");
            res.redirect('/404');
          }
          else{
            var activateUser = {status: 'publish'};
            Symptoms.update(symptom, activateUser, function (err, symptom){
              if(err){
                console.log("AdminSymptomsController:activate " + err );
              }
              if(!symptom){
                console.log("AdminSymptomsController:activate NOTUSER activate");
              }
              else{
                res.redirect('/admin/symptoms');
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
        Symptoms.findOne(id).done(function (err, symptom){
          if(err){
            console.log("AdminSymptomsController:desactivate ERROR");
          }
          if(!symptom){
            console.log("AdminSymptomsController:desactivate NOTUSER");
            res.redirect('/404');
          }
          else{
            var desactivateUser = {status: 'trash'};
            Symptoms.update(symptom, desactivateUser, function (err, symptom){
              if(err){
                console.log("AdminSymptomsController:desactivate " + err );
              }
              if(!symptom){
                console.log("AdminSymptomsController:desactivate NOTUSER activate");
              }
              else{
                res.redirect('/admin/symptoms');
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
      if(req.session.type == 'administrator'){
        console.log(req.body);
        Symptoms.findOne({id: req.body.id}).done(function (err, symptom){
          if(err){
            console.log("AdminSymptomsController:update " + err );
          }
          if(!symptom){
            console.log("AdminSymptomsController:update NOTUSER findOne");
          }
          else{
            var updateSymptom = {
              content: req.body.content,
              description: req.body.description
            };
            Symptoms.update(symptom, updateSymptom, function (err, symptom){
              if(err){
                console.log("AdminSymptomsController:update " + err );
              }
              if(!symptom){
                console.log("AdminSymptomsController:update NOTUSER update");
              }
              else{
                res.redirect('/admin/users');
              }
            });
          }
        });
      }
      else if(req.session.type != null){
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
