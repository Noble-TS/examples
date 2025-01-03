import { Request, Response } from 'express';

// Interfaces for type safety
class UserRequest {
  name: string | undefined;
}

class User {
  id: number | undefined;
  name: string | undefined;
}

export class UserController {
  private users: User[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  getUsers(req: Request, res: Response): Response {
    console.log('Getting all users');
    return res.status(200).json({
      status: 'success',
      data: this.users,
    });
  }

  getUserById(req: Request, res: Response): Response {
    const userId = parseInt(req.params.id);
    const user = this.users.find((u) => u.id === userId);
    console.log(`Getting user with id ${userId}`);
    
    if (!user) {
      console.log('User  not found');
      return res.status(404).json({
        status: 'error',
        message: 'User  not found',
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: user,
    });
  }

  createUser (req: Request, res: Response): Response {
    const { name } = req.body as UserRequest;
    
    if (!name) {
      console.log('Name is required');
      return res.status(400).json({
        status: 'error',
        message: 'Name is required',
      });
    }
    
    const newUser   = { 
      id: this.users.length + 1, 
      name 
    };
    
    this.users.push(newUser );
    return res.status(201).json({
      status: 'success',
      data: newUser ,
    });
  }
  
}
