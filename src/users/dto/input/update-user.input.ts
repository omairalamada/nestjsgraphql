import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    userId: string;
    
    @Field()
    @IsString()
    firstName: string
    
    @Field()
    @IsString()
    lastName: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsOptional()
    @IsNotEmpty()
    contactNo?: number;
}