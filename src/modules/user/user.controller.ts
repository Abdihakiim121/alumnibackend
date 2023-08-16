import {Body, Controller, Get, Patch, Post, UseGuards, Request} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./Dto/user.dto";
import {Batch} from "typeorm";
import {UserEntity} from "./user.entity";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('/')
    getAllUsers() {
        return this.userService.getAllUser();
    }
    @Post("/")
    createUser(@Body() userDto:UserDto){
        return this.userService.create(userDto);
    }

    @Patch("/")
    async updateUser(@Body() userDto:UserDto):Promise<UserEntity>{
        const user = await this.userService.update(userDto);
        console.log(user);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/loggedInUser')
    getUser(@Request() req){
        console.log("we reached here "+req.user)
        return "user "+JSON.stringify(req.user);
    }
}
