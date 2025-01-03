
import { registerRoute, typeRef } from 'axiosflow-api';
import csrf from 'csurf';
import { UserController } from '../controllers/userController';
import { RequestHandler } from 'express';

//  CSRF middleware

const csrfProtection: RequestHandler = (req, res, next) => {
  csrf({ cookie: true });
  next();
};

// logger middleware
const logger: RequestHandler = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};


// Interfaces for type safety
class UserRequest {
  name: string | undefined;
}

class User {
  id: number | undefined;
  name: string | undefined;
}

// Create an instance of the controller
const userController = new UserController();

// Define routes and register them dynamically
export function registerUserRoutes() {
  registerRoute(userController, 'GET', '/users', null, typeRef<User>('User', { id: 'number', name: 'string' }), [csrfProtection,logger], 'getUsers');
  registerRoute(userController, 'GET', '/users/:id', null, typeRef<User>('User', { id: 'number', name: 'string' }), [csrfProtection,logger], 'getUserById');
  registerRoute(userController, 'POST', '/users', typeRef<UserRequest>('UserRequest', { name: 'string' }), typeRef<User>('User', { id: 'number', name: 'string' }), [], 'createUser');
registerRoute(userController, 'GET', '/users', null, typeRef<User>('User', { id: 'number', name: 'string' }), [csrfProtection,logger], 'getUsers');
  registerRoute(userController, 'GET', '/users/:id', null, typeRef<User>('User', { id: 'number', name: 'string' }), [csrfProtection,logger], 'getUserById');
  registerRoute(userController, 'POST', '/users', typeRef<UserRequest>('UserRequest', { name: 'string' }), typeRef<User>('User', { id: 'number', name: 'string' }), [], 'createUser');

}

// Export the controller instance for use in the router
export const controllerInstances = {
  UserController: userController,
}; 
