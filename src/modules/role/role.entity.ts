import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    roleName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];
}


