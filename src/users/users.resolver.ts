import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { UsersService } from './users.service';
import { User } from './models/user';
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUsersArgs } from './dto/args/get-users.args';

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userUservice: UsersService
    ) {}
    
    @Query(() => User, { name: 'user', nullable: true })
    getUser(@Args() getUserArgs: GetUserArgs): User {
        return this.userUservice.getUser(getUserArgs);
    }

    @Query(() => [User], { name: 'users', nullable: 'items' })
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.userUservice.getUsers(getUsersArgs);
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInput): User {    
        return this.userUservice.createUser(createUserData);
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserDate') updateUserData: UpdateUserInput): User {
        return this.userUservice.updateUser(updateUserData);
    }

    // @Mutation(() => User)
    // deleteUser(@Args('deleteUserDate') deleteUserData: DeleteUserInput): User {
    //     return this.userUservice.deleteUser(deleteUserData);
    // }
}