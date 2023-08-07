import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {isEmail, IsNotEmpty} from "class-validator";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column()
    fullname: string;
    @Column()
    @Unique(['email'])
    email: string;
    @Column()
    @Unique(['username'])
    username: string;
    @Column()
    @Unique(['mobile'])
    mobile: number;
    @Column()
    password: string;
    @Column()
    isActive: boolean;

}