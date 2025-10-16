import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {UserProfile} from "./userprofile.entity";
import {Loginhistories} from "./loginhistories.entity";
import { RoleEntity } from "../role/role.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true, nullable: true })
    username: string;
    @Column({ name: 'passwordHash' })
    passwordHash: string;
    @Column({ type: 'varchar', length: 20, nullable: true })
    phone: string;
    @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
    @JoinColumn({ name: 'roleId' })
    role: RoleEntity;
    @Column({ default: true })
    isActive: boolean;
    @Column({ default: false })
    isVerified: boolean;
    @Column({ type: 'varchar', length: 10, nullable: true })
    otpCode: string;
    @Column({ default: false })
    isOtpVerified: boolean;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
    @OneToOne(() => UserProfile, profile => profile.user)
    profile: UserProfile;
    @OneToMany(() => Loginhistories, loginHistory => loginHistory.user)
    loginHistory:Loginhistories[];

}
