import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumniController } from './alumni.controller';
import { AlumniService } from './alumni.service';
import { UserEntity } from '../user/user.entity';
import { UserProfile } from '../user/userprofile.entity';
import { FacultyEntity } from './entities/faculty.entity';
import { DepartmentEntity } from './entities/department.entity';
import { BatchEntity } from './entities/batch.entity';
import { DepartmentBatchEntity } from './entities/department-batch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserProfile,
      FacultyEntity,
      DepartmentEntity,
      BatchEntity,
      DepartmentBatchEntity,
    ]),
  ],
  controllers: [AlumniController],
  providers: [AlumniService],
  exports: [AlumniService],
})
export class AlumniModule {}
