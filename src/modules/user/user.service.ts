import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotAcceptableException,
    NotFoundException
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {UserDto} from "./Dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {
    }

    private readonly users: any[] = [];

    getByUsername(username: string): Promise<UserEntity> {
        return this.userRepository.findOne({where: {username}});
    }

    getById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({where: {userId: id}})
    }

    getAllUser() {
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

      //  const hashPassword = await bcrypt.hash(payload.password, 10);

        let user = new UserEntity();
        user.mobile = payload.mobile;
        user.isActive = payload.isActive != null ? payload.isActive : true;
        user.password = payload.password;
        user.username = payload.username;
        user.email = payload.email;
        user.fullname = payload.fullName;
        //const createdUser =this.userRepository.create(user);
        //return this.userRepository.save(createdUser);
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error) {
                throw new ConflictException('The provided mobile number is already associated with an account.' + error.messages);
            }
            throw new InternalServerErrorException('An error occurred while creating the user.');
        }
    }

    async update(payload: UserDto) {
        const foundUser = await this.userRepository.findOneBy({userId: payload.userId});

        if (!foundUser) {
            throw new NotFoundException("User Not found");
        }
        const userId = payload.userId;
        //const hashPassword = await bcrypt.hash(payload.password, 10);
        foundUser.email = payload.email;
        foundUser.password = payload.password;
        foundUser.username = payload.username;
        foundUser.mobile = payload.mobile;
        foundUser.fullname = payload.fullName;
        foundUser.isActive = payload.isActive;

        return this.userRepository.update({userId}, foundUser);

    }

    async getByUsernameAndPass(username: string, password: string): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(password, 10);

        return this.userRepository.findOne({
            where: {
                username,
                password: password
            }
        });
    }

}
