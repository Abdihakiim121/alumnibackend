import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { UserProfile } from '../user/userprofile.entity';

@Entity('faculties')
export class FacultyEntity {
    @PrimaryGeneratedColumn()
    facultyId: number;

    @Column({ type: 'varchar', length: 150 })
    facultyName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => DepartmentEntity, (dept) => dept.faculty)
    departments: DepartmentEntity[];

    @OneToMany(() => UserProfile, (profile) => profile.faculty)
    profiles: UserProfile[];
}


