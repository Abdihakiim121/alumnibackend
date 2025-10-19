import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { FacultyEntity } from './faculty.entity';
import { DepartmentBatchEntity } from './department-batch.entity';
import { UserProfile } from '../../user/userprofile.entity';

@Entity('departments')
export class DepartmentEntity {
  @PrimaryGeneratedColumn()
  departmentId: number;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.departments, {
    nullable: false,
  })
  @JoinColumn({ name: 'facultyId' })
  faculty: FacultyEntity;

  @Column({ type: 'varchar', length: 150 })
  departmentName: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => DepartmentBatchEntity, (db) => db.department)
  departmentBatches: DepartmentBatchEntity[];

  @OneToMany(() => UserProfile, (profile) => profile.department)
  profiles: UserProfile[];
}
