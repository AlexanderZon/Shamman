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
      var properties = req.body.properties;
      Diseases.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user,
      	}).done(function (err, disease){
	        if(err){
	          console.log("AdminDiseasesController:create ERROR " + err);
	          return res.json({
	            message: "Error al crear Enfermedad!",
	            type: "error",
	            error: true
	          });
	        }
          if(!disease){
            console.log("AdminDiseasesController:create NOTDISEASE ");
          }
	        else{
            for(var i = 0; i < properties.length; i++){
              PropertyDisease.create({
                disease_id: disease.id,
                property_id: properties[i],
                user_id: req.session.user
              }).done(function (err, propertyDisease){
                if(err){
                  console.log("PropertyDisease ERROR");
                }
                if(!propertyDisease){
                  console.log("PropertyDisease NOT");
                }
                else{
                  console.log("PropertyDisease CREATED");
                }
              });
            }
	          console.log("Disease Created! " + disease);
	          return res.redirect('/admin/diseases');
	        }
	    });
	}
    catch(e){
      console.log('AdminDiseasesController ERROR!');
    }

  },

  getPropertiesNames: function (req, res){

    try{
      if(req.session.usertype == 'administrator'){
        Properties.findOne({id: req.params.id}).done(function (err, property){
          if(err){
            console.log("AdminDiseasesController:getPropertiesNames ERROR");
          }
          if(!property){
            console.log("AdminDiseasesController:getPropertiesNames NOTPROPERTIES");
          }
          else{
            Symptoms.findOne({id: property.symptom_id}).done(function (err, symptom){
              if(err){
                return res.json({
                  error: true
                });
                console.log("AdminDiseasesController:getPropertiesNames ERRORSYMPTOM");
              }
              if(!symptom){
                return res.json({
                  error: true
                })
                console.log("AdminDiseasesController:getPropertiesNames NOTSYMPTOM");
              }
              else{
                console.log("AdminDiseasesController:getPropertiesNames GETPROPERTIES");
                return res.json({
                  error: false,
                  content: {
                    property: property.title,
                    symptom: symptom.title
                  }
                });
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
    }catch(e){

    }

  },

  getOneProperties: function (req, res) {
    try{
      if(req.session.usertype == 'administrator'){
        var properties;
        PropertyDisease.find({disease_id: req.params.id}).done(function (err, __properties){
          if(err){
            console.log('AdminDiseasesController:getOneProperties ERROR');
            return res.json(err);
          }
          if(!__properties){
            console.log('AdminDiseasesController:getOneProperties NOTPROPERTIES');
            __properties = {};
          }
          else{
            Diseases.findOne({id: req.params.id}).done(function (err, disease){
              if(err){
                console.log("AdminDiseasesController: ERRORDISEASE");
              }
              if(!disease){
                console.log("AdminDiseasesController: NOTDISEASE");
              }
              else{
                console.log('AdminDiseasesController:getOneProperties GETPROPERTIES');
                properties = __properties;
                __data = req.session;
                __data.disease = disease;
                __data.dataProperties = properties;
                return res.view('admin/diseases/properties', __data);
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
      console.log('CATCH ' + e );
      res.redirect('/login');
    }
  },

  getProperties: function (req, res){

    console.log("AdminSymptomsController:getProperties");
    PropertyDisease.find({disease_id: req.params.id}).done(function (err, properties){
        console.log(properties.length);
      if(err){
        return res.json({
          error: true
        });
      }
      if(!properties){
        return res.json({
          error: false,
          content: "0"
        });
      }
      else{
        return res.json({
          error: false,
          content: properties.length
        });
      }
    });

  },

   get: function (req, res) {
    
    try{
      if(req.session.usertype == 'administrator'){
        req.session.login = false;
        Diseases.find().done(function (err, diseases){
          if(err){
            console.log('AdminDiseasesController:get ERROR');
          }
          if(!diseases){
            console.log('AdminDiseasesController:get NOTDISEASE');
          }
          else{
            console.log('AdminDiseasesController:get GETALL');
            __data = req.session;
            __data.dataDiseases = diseases;
            return res.view('admin/diseases/index', __data);
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
      Properties.find().done(function (err, properties){
        if(err){
          console.log("AdminDiseasesController: getCreate ERROR");
        }
        if(!properties){
          console.log("AdminDiseasesController: getCreate NOT PROPERTIES");
        }
        else{
          __data = req.session;
          __data.properties = properties;
          res.view('admin/diseases/create', __data);
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
