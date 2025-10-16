import {IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean, IsNumber} from "class-validator";

export class UserDto {
    @IsOptional()
    userId: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    phone?: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsOptional()
    middleName?: string;

    @IsOptional()
    @IsNumber()
    roleId?: number;
}