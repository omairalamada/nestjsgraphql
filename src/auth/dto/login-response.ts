import { UserModel } from './../../users/models/user.model';
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

    @Field(() => UserModel)
    user: UserModel
}