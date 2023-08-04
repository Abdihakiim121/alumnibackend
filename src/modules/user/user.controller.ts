import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./Dto/createUser.dto";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }
    @Get('/')
    getAllUsers(){
        return this.userService.getAllUser();
    }
    @Post("/")
    createUser(@Body() userDto:CreateUserDto){
        return {data:userDto};
    }
}
