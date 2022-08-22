import { DeleteUserInput } from './dto/input/delete-user.input';
import { GetUsersArgs } from './dto/args/get-users.args';
import { GetUserArgs } from './dto/args/get-user.args';
import { UpdateUserInput } from './dto/input/update-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
    private users: User[] = []

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserData
        }

        this.users.push(user);

        return user;
    }

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(input => input.userId === updateUserData.userId);
        Object.assign(user, updateUserData);

        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.userId === getUserArgs.userId)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getUser({ userId }));
    }

    // public deleteUser(deleteUserData: DeleteUserInput): User {
    //     // const userIndex = this.users.find(user => user.userId === deleteUserData.userId)
    //     // const userInput = this.users[userIndex];
    //     // this.users.slice(userIndex);

    //     // return userInput;
    // }
}