import {Injectable, NotAcceptableException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto} from "./Dto/user.dto";
import crypto from "crypto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository:Repository<UserEntity>) {
    }
    private readonly users: any[] = [];
    getByUsername(username: string): Promise<UserEntity> {
        return this.userRepository.findOne({where:{username}});
    }
    getAllUser (){
        return this.userRepository.find();
    }
    async create(payload: UserDto) {
        const username = await this.getByUsername(payload.username);
        console.log(username);
        if (username) {
            throw new NotAcceptableException(
                'The account with the provided username currently exists. Please choose another one.',
            );
        }
        let user = new UserEntity();
        user.mobile = payload.mobile;
        user.isActive = payload.isActive;
        user.password = payload.password;
        user.username = payload.username;
        user.email = payload.email;
        user.fullname = payload.fullName;
        const createdUser =this.userRepository.create(user);
        return this.userRepository.save(createdUser);
    }
    async update(payload:UserDto){
        const foundUser = await this.userRepository.findOneBy({userId:payload.userId});

        if(!foundUser){
            return "not found";
        }


    }
}