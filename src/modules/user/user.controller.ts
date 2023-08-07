import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./Dto/user.dto";

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {
    }
    @Get('/')
    getAllUsers(){
        return this.userService.getAllUser();
    }
    @Post("/")
    createUser(@Body() userDto:UserDto){
        return this.userService.create(userDto);
    }
}
