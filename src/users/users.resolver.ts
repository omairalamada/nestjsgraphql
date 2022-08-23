import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { UsersService } from './users.service';
import { UserModel } from './models/user.model';
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";

@Resolver(() => UserModel)
export class UserResolver {
    constructor(
        private readonly userUservice: UsersService
    ) {}
    
    @Query(() => UserModel, { name: 'user', nullable: true })
    getUser(@Args() getUserArgs: GetUserArgs): Promise <UserModel> {
        return this.userUservice.getUser(getUserArgs);
    }

    @Mutation(()  => UserModel)
    async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<UserModel> {    
        return this.userUservice.createUser(createUserData);
    }

    @Mutation(() => UserModel)
    updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<UserModel> {
        return this.userUservice.updateUser(updateUserData);
    }

    @Mutation(() => UserModel)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): Promise<UserModel> {
        return this.userUservice.deleteUser(deleteUserData);
    }
}