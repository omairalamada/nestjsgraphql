import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateUserInput {
    @Field()
    @IsString()
    firstName: string
    
    @Field()
    @IsString()
    lastName: string

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    contactNo?: number;
}