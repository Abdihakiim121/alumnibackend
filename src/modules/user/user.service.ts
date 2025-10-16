import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './Dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { UserProfile } from './userprofile.entity';
import { CurrentUser } from 'src/common/dto/currentuser.dto';
import { Loginhistories } from './loginhistories.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
    @InjectRepository(Loginhistories)
    private loginRepository: Repository<Loginhistories>,
  ) {}

  private readonly users: any[] = [];

  getByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { username },
      select: [
        'userId',
        'email',
        'username',
        'passwordHash',
        'isActive',
        'isVerified',
        'role',
      ],
    });
  }

  getById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { userId: id } });
  }

  getAllUser(currentUser: CurrentUser) {
    return this.userRepository.find();
  }

  // removed mobile lookup; not in new schema

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async fetchSpecificUserData(userId: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.faculty', 'faculty')
      .leftJoinAndSelect('profile.department', 'department')
      .leftJoinAndSelect('profile.batch', 'batch')
      .where('user.userId = :userId', { userId })
      .select([
        'user.userId',
        'user.email',
        'user.username',
        'user.isActive',
        'role.roleId',
        'role.roleName',
        'profile.profileId',
        'profile.firstName',
        'profile.middleName',
        'profile.lastName',
        'profile.gender',
        'profile.graduationYear',
        'faculty.facultyId',
        'faculty.facultyName',
        'department.departmentId',
        'department.departmentName',
        'batch.batchId',
        'batch.batchYear',
      ])
      .getOne();
  }

  async create(payload: UserDto) {
    const username = payload.username
      ? await this.getByUsername(payload.username)
      : null;
    if (username) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }
    const existingUserWithEmail = await this.getByEmail(payload.email);
    if (existingUserWithEmail) {
      throw new ConflictException(
        'The provided Email  is already associated with an account.',
      );
    }

    const user = new UserEntity();
    user.isActive = payload.isActive ?? true;
    user.passwordHash = await bcrypt.hash(payload.password, 10);
    user.username = payload.username;
    user.email = payload.email;
    user.phone = payload.phone;
    // role assignment handled if roleId provided (optional)

    try {
      const savedUser = await this.userRepository.save(user); // Step 1: Save UserEntity

      const userProfile = new UserProfile();
      userProfile.firstName = payload.firstName;
      userProfile.lastName = payload.lastName;
      userProfile.middleName = payload.middleName;
      userProfile.user = savedUser; // Step 2: Associate UserProfile with UserEntity

      await this.userProfileRepository.save(userProfile);

      return savedUser;
    } catch (error) {
      if (error) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }

  async update(payload: UserDto): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({
      userId: payload.userId,
    });

    if (!foundUser) {
      throw new NotFoundException('User Not found');
    }
    const userId = payload.userId;
    foundUser.email = payload.email;
    if (payload.password) {
      foundUser.passwordHash = await bcrypt.hash(payload.password, 10);
    }
    foundUser.username = payload.username;
    if (payload.isActive !== undefined) {
      foundUser.isActive = payload.isActive;
    }

    const existingUserProfile = await this.userProfileRepository.findOneBy({
      user: { userId: foundUser.userId },
    });
    existingUserProfile.firstName = payload.firstName;
    existingUserProfile.middleName = payload.middleName;
    existingUserProfile.lastName = payload.lastName;

    const updatedUser = await this.userRepository.update({ userId }, foundUser);
    const updateUserProfile = await this.userProfileRepository.update(
      { user: { userId: foundUser.userId } },
      existingUserProfile,
    );
    return updatedUser;
  }

  // replaced by bcrypt validation in AuthService

  async addLoginHisotry(payload, user) {
    const loginHistory = new Loginhistories();
    const currentDate = new Date();
    loginHistory.ip = payload.ip;
    loginHistory.browser = payload.browser.toString();
    loginHistory.user = user;
    loginHistory.loginDate = currentDate;
    loginHistory.logoutDate = null;

    try {
      const savedLoginHistory = await this.loginRepository.save(loginHistory); // Step 1: Save UserEntity

      return savedLoginHistory;
    } catch (error) {
      if (error) {
        throw new ConflictException(error.message);
      }
      throw new InternalServerErrorException(
        'An error occurred while creating the user.',
      );
    }
  }
}
