import { UserModel } from './models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserResolver } from './users.resolver';
import { Module } from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserModel
        ])
    ],
    providers: [UserResolver, UsersService],
})
export class UsersModule {}