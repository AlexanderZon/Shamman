/**
 * TimeController
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
    
  get: function (req, res){
    var time = new Date();
    var json = {};
    json.clock = {
      Year: time.getFullYear(),
      Month: time.getMonth(),
      Day: time.getDay(),
      Hour: time.getHours(),
      Minutes: time.getMinutes(),
      Seconds: time.getSeconds()
    };
    json.before = sails.controllers.prototype.beforeSendTime(req, res);
    json.same = sails.controllers.time.getSameFunction();
    return res.json(json);
},

getGoodDay: function(){
	var time = new Date();
	var json = {};
	if(time.getHours() < 12){
		json = {
			camel: 'Buenos Días',
			upper: 'BUENOS DIAS',
			lower: 'buenos días'
		}
	}
	else if(time.getHours() < 19){
		json = {
			camel: 'Buenas Tardes',
			upper: 'BUENAS TARDES',
			lower: 'buenas tardes'
		}
	}
	else{
		json = {
			camel: 'Buenas Noches',
			upper: 'BUENAS NOCHES',
			lower: 'buenas noches'
		}
	}
	return json;
},

getSameFunction: function(){
	var json = {
		hola: "Mundo"
	}
	return json;
},




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TimeController)
   */
  _config: {}

  
};
