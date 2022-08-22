import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    userId: string;

    @Field()
    @IsOptional()
    @IsNotEmpty()
    aga?: number;

    @Field({ nullable: true })
    @IsOptional()
    isSubscribed?: boolean
}