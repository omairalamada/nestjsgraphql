import { DeleteUserInput } from './dto/input/delete-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { UpdateUserInput } from './dto/input/update-user.input';
import { CreateUserInput } from './dto/input/create-user.input';
import { UserModel } from './models/user.model';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
@Injectable()
export class UsersService {
   // private users: UserModel[] = []
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository:  Repository<UserModel>
    ) {}

    findOne(
        findOneOptions: FindOneOptions<UserModel>,
    ): Promise<UserModel> {
        return this.userRepository.findOne(findOneOptions)
    }

    find(
        findManyOptions?: FindManyOptions<UserModel>,
    ): Promise<UserModel[]> {
        return this.userRepository.find(findManyOptions)
    }

    createUser(createUserData: CreateUserInput): Promise<UserModel> {
        return this.userRepository.save({ ...createUserData})
    }

    async updateUser(updateUserData: UpdateUserInput): Promise <UserModel> {
         const user = await this.findOne({ where: { userId: updateUserData.userId } })

         if (!user) {
            throw new NotFoundException('userId not found.')
         }

         const newUser = new UserModel();
         newUser.userId = user.userId 
         newUser.firstName = updateUserData.firstName
         newUser.lastName = updateUserData.lastName
         newUser.email = updateUserData.email
         newUser.contactNo = updateUserData.contactNo

        return this.userRepository.save(newUser)
    }

    async getUser(getUserArgs: GetUserArgs): Promise <UserModel> {
        const user: UserModel =
            (await this.findOne({ where: { userId: getUserArgs.userId } })) || null

        return user
    }

    async getAllUsers(): Promise<UserModel[]> {
        const users: UserModel[] = (await this.userRepository.find()) || null

        return users;
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<UserModel> {
        const user = await this.userRepository.findOne({
            where: { userId: deleteUserData.userId },
        })

        if (!user)
            throw new BadRequestException('userId not found! ')

        return this.userRepository.remove(user)
    }

}