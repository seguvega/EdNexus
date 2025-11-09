var Router = require('express').Router();
var UserController = require('../Controllers/user');

Router.get('/', UserController.list);
Router.post('/', UserController.create);
Router.param('id', UserController.userByID);
Router.get('/:id',  
    UserController.hasAuthorization);
Router.put('/:id', 
    UserController.hasAuthorization, 
    UserController.update);
Router.delete('/:id', UserController.hasAuthorization, UserController.delete);
Router.put('/setadmin/:userID',  
    UserController.setAdmin);

module.exports = Router;