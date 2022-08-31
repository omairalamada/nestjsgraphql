import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('user')
export class UserModel {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Field()
    @Column({ nullable: true, name: 'first_name'})
    firstName?: string

    @Field()
    @Column({ nullable: true, name: 'last_name'})
    lastName?: string

    @Field()
    @Column({ nullable: true })
    email?: string;

    @Field()
    @Column({ nullable: true})
    username: string;

    @Field()
    @Column({ nullable: true })
    password?: string;

    @Field(() => Int)
    @Column({ nullable: true })
    contactNo?: number;
}