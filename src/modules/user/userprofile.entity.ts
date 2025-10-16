import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { FacultyEntity } from '../faculty/faculty.entity';
import { DepartmentEntity } from '../department/department.entity';
import { BatchEntity } from '../batch/batch.entity';

@Entity('userprofiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  profileId: number;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  middleName: string;

  @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: true })
  gender: 'Male' | 'Female';

  @Column({ type: 'year', nullable: true })
  graduationYear: number;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.profiles, {
    nullable: true,
  })
  @JoinColumn({ name: 'facultyId' })
  faculty: FacultyEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.profiles, {
    nullable: true,
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @ManyToOne(() => BatchEntity, (batch) => batch.profiles, { nullable: true })
  @JoinColumn({ name: 'batchId' })
  batch: BatchEntity;

  @Column({ type: 'varchar', length: 150, nullable: true })
  profession: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Other columns and methods can be added here
}
