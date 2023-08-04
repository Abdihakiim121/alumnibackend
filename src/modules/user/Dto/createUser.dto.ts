import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateUserDto{
    fullName : string;
    @IsEmail()
    email: string;
    @IsNotEmpty({message:'Username should no be empty'})
    username : string;
    @IsNotEmpty({message:'Password should no be empty'})
    password : string;
    isActive: string;
}