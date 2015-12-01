'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');
  var profile = require('../controllers/profile.server.controller');
  var browse = require('../controllers/browse.server.controller');
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  // app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);


  // Define application route
  app.route('/api/core/editProfile').post(profile.editProfile);
  app.route('/api/core/editBanner').post(profile.editBanner);
  app.route('/api/core/browseStartup').get(browse.browseStartup);
  app.route('/api/core/browse_Startup/:id').get(browse.browse_Startup);
  app.route('/api/core/follow/:name/:id').get(browse.follow);
  app.route('/api/core/browseInvestor').get(browse.browseInvestor);
  app.route('/api/core/browseLocation/:name').get(browse.browseLocation);
  app.route('/api/core/browseIndustry/:name').get(browse.browseIndustry);
  app.route('/api/core/uploadVideo').post(profile.uploadVideo);


  app.route('/*').get(core.renderIndex);


};
