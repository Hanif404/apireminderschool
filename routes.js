'use strict';

module.exports = function(app) {
    var controller = require('./controller');

    app.route('/').get(controller.index);
    app.route('/users').get(controller.getUsers);
    app.route('/saveusers').post(controller.saveUsers);
};
