import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { BatchEntity } from '../batch/batch.entity';

@Entity('departmentbatches')
@Unique('unique_department_batch', ['department', 'batch'])
export class DepartmentBatchEntity {
  @PrimaryGeneratedColumn()
  departmentBatchId: number;

  @ManyToOne(() => DepartmentEntity, (dept) => dept.departmentBatches, {
    nullable: false,
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @ManyToOne(() => BatchEntity, (batch) => batch.departmentBatches, {
    nullable: false,
  })
  @JoinColumn({ name: 'batchId' })
  batch: BatchEntity;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
