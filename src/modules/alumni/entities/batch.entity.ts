import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DepartmentBatchEntity } from './department-batch.entity';
import { UserProfile } from '../../user/userprofile.entity';

@Entity('batches')
export class BatchEntity {
  @PrimaryGeneratedColumn()
  batchId: number;

  @Column({ type: 'year' })
  batchYear: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => DepartmentBatchEntity, (db) => db.batch)
  departmentBatches: DepartmentBatchEntity[];

  @OneToMany(() => UserProfile, (profile) => profile.batch)
  profiles: UserProfile[];
}
