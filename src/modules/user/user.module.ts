import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './userprofile.entity';
import { Loginhistories } from './loginhistories.entity';
import { RoleEntity } from '../role/role.entity';
import { FacultyEntity } from '../alumni/entities/faculty.entity';
import { DepartmentEntity } from '../alumni/entities/department.entity';
import { BatchEntity } from '../alumni/entities/batch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserProfile,
      Loginhistories,
      RoleEntity,
      FacultyEntity,
      DepartmentEntity,
      BatchEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserEntity],
  exports: [UserService],
})
export class UserModule {}
