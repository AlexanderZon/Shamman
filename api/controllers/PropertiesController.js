/**
 * AdminPropertiesController
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

  /**
   * Action blueprints:
   *    `/users/create`
   */
   create: function (req, res) {

    try{

      Properties.create({
        symptom_id: req.body.symptom_id,
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user,
      }).done(function (err, property){
        if(err){
          console.log(err);
          res.json({
            message: "Error al crear la propiedad!",
            type: "error",
            error: true
          });
        }
        else{
          console.log("Property Created! " + property);
          res.json({
            message: "Propiedad creada con éxito!",
            type: "sucessful",
            error: false
          });
        }
      });

    }
    catch(e){
          res.json({
            message: "AdminPropertiesController ERROR.",
            type: "error",
            error: true
          });
      console.log('AdminPropertiesController ERROR.');
    }

    
  },
  
   get: function (req, res) {
    console.log('DEBUGGING');
    try{
      if(req.session.usertype == 'administrator'){
        var properties;
        Properties.find().done(function (err, __properties){
          if(err){
            console.log('AdminPropertiesController:get ERROR');
            return res.json(err);
          }
          if(!properties){
            console.log('AdminPropertiesController:get NOTPROPERTIES');
          }
          else{
            console.log('AdminPropertiesController:get GETPROPERTIES');
            properties = __properties;
          }
        });
        for(var i = 0 ; i < properties.length ; i++){
          Symptoms.findOne({id: properties[i].symptom_id}).done(function (err, __symptom){
            properties[i].symptom = __symptom;
          });
        }
        __data = req.session;
        __data.dataProperties = properties;
        req.session.login = false;
        return res.view('admin/properties/index', __data);
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
      var __data = req.session;
      __data.symptoms = null;
      Symptoms.find().done(function (err, symptoms){
        if(err){
          console.log("AdminPropertiesController:getCreate ERROR");
        }
        if(!symptoms){
          console.log("AdminPropertiesController:getCreate NOTSYMPTOMS");
        }
        else{
          __data.symptoms = symptoms;
        }
      });
      res.view('admin/symptoms/create', __data);
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
    
    try{
      if(req.session.usertype == 'administrator'){
        var id = req.param('id');
        console.log(id);
        Properties.findOne(id).done(function (err, property){
          if(err){
            console.log("AdminPropertiesController:getOne ERROR");
          }
          if(!property){
            console.log("AdminPropertiesController:getOne NOTPROPERTY");
            res.redirect('/404');
          }
          else{
            Symptoms.findOne({id: property.id}).done(function (err, symptom){
              property.symptom
            });
            req.session.login = false;
            __data = req.session;
            __data.dataProperty = property;
            return res.view('admin/properties/update', __data);
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
        Properties.findOne({id: req.body.id}).done(function (err, property){
          if(err){
            console.log("AdminPropertiesController:update " + err );
          }
          if(!property){
            console.log("AdminPropertiesController:update NOTSYMPTOM findOne");
          }
          else{
            var updateProperty = {
              title: req.body.title,
              description: req.body.description
            };
            if(property.symptom_id != req.body.symptom_id)
              updateProperty.symptom_id = req.body.symptom_id;
            Properties.update(property, updateProperty, function (err, property){
              if(err){
                console.log("AdminPropertiesController:update " + err );
              }
              if(!property){
                console.log("AdminPropertiesController:update NOTSYMPTOM update");
              }
              else{
                res.redirect('/admin/users');
              }
            });
          }
        });
      }
      else if(req.session.usertype != null){
        console.log('AdminPropertiesController:update NOTLOGGEDUSER');
      }
      else{
        console.log('AdminPropertiesController:update NOTUSERPERMISSION ' + req.session.id);
      }
    }
    catch(e){
      console.log('AdminPropertiesController:update ' + e);
    }

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
