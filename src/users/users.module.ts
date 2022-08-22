import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { Module } from "@nestjs/common";

@Module({
    providers: [UserResolver, UsersService],
})
export class UsersModule {

}