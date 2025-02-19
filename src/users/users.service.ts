import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = []; 

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: number, updatedUser: User): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;
    this.users[userIndex] = updatedUser;
    return this.users[userIndex];
  }

  delete(id: number): boolean { 
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }
}
