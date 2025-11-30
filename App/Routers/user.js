var Router = require('express').Router();
var UserController = require('../Controllers/user');
var UserAuth = require('../Controllers/firebaseAuth');

Router.get('/', UserController.list);
Router.post('/', UserController.create);
Router.param('id', UserController.SetUserByID);

Router.get('/:id',
    UserAuth.requireSignin,  
    UserController.hasAuthorization,
    UserController.read);
Router.put('/:id', 
    UserAuth.requireSignin,
    UserController.hasAuthorization, 
    UserController.update);
Router.delete('/:id', 
    UserAuth.requireSignin,
    UserController.hasAuthorization, 
    UserController.delete);
Router.put('/setadmin/:userID',  
    UserController.setAdmin,
    UserAuth.requireSignin,
    UserController.setAdmin);

module.exports = Router;