import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    username?: string
    
    @Field()
    password?: string
    
    @Field()
    firstName?: string
    
    @Field()
    lastName?: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    contactNo?: number;
}