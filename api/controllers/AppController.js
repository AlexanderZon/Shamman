/**
 * AppController
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
  	try{
      if(req.session.usertype == 'administrator' || req.session.usertype == 'user'){
        req.session.login = true;
        var __data = req.session;
        Datasheet.findOne({
        	user_id: __data.user,
        	status: 'draft'
        }).done(function (err, datasheet){
        	if(err){
        		console.log('AppController:get ERROR1');
        		return res.redirect('404');
        	}
        	if(!datasheet){
		        Datasheet.create({
		        	status: 'draft',
		        	user_id: __data.user
		        }).done(function (err, datasheet){
		        	if(err){
		        		console.log('AppController:get ERROR2');
		        		return res.redirect('404');
		        	}
		        	if(!datasheet){
		        		console.log('AppController:get NOT DATASHEET');
		        		return res.redirect('404');
		        	}
		        	else{
		        		var firstQuestion = {
		        			title: 'Muy ' + sails.controllers.time.getGoodDay() + '. ¿Como se siente?',
		        			options: {
		        				option: {
		        					title: 'Muy bien',
		        					value: 'very_good'
		        				},
		        				option: {
		        					title: 'Más o menos',
		        					value: 'so_so'
		        				},
		        				option: {
		        					title: 'Me siento mal',
		        					value: 'im_bad'
		        				},
		        				option: {
		        					title: 'Siento dolor',
		        					value: 'feel_pain'
		        				}
		        			},
		        			name: 'how_feel'
		        		};
		        		__data.datasheet = datasheet;
		        		__data.question = firstQuestion;
		        		__data.error = null;
				        return res.view('app/run/index', __data);	
		        	}
        		});
        	}
        	else{
        		//sails.controllers.app.getAnother(req, res);
        	}
        });
      }
      else{
        res.redirect('/login');
      }
    }
    catch(e){
      res.redirect('/login');
    }
  },

  //getAnother


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AppController)
   */
  _config: {}

  
};
