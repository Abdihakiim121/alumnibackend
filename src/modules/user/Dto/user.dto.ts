import {IsEmail, IsNotEmpty} from "class-validator";

export class UserDto {
    userId:number;
    fullName : string;
    @IsEmail()
    email: string;
    @IsNotEmpty({message:'Username should no be empty'})
    username : string;
    @IsNotEmpty({message:'Password should no be empty'})
    password : string;
    isActive: boolean;
    @IsNotEmpty()
    mobile : number;
}