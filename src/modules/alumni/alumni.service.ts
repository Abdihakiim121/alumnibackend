import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserProfile } from '../user/userprofile.entity';
import { FacultyEntity } from './entities/faculty.entity';
import { DepartmentEntity } from './entities/department.entity';
import { BatchEntity } from './entities/batch.entity';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { FilterAlumniDto } from './dto/filter-alumni.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserProfile)
    private readonly profileRepo: Repository<UserProfile>,
    @InjectRepository(FacultyEntity)
    private readonly facultyRepo: Repository<FacultyEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepo: Repository<DepartmentEntity>,
    @InjectRepository(BatchEntity)
    private readonly batchRepo: Repository<BatchEntity>,
  ) {}

  private async resolveRelations(dto: {
    facultyId?: number;
    departmentId?: number;
    batchId?: number;
  }) {
    const faculty = dto.facultyId
      ? await this.facultyRepo.findOne({ where: { facultyId: dto.facultyId } })
      : null;
    const department = dto.departmentId
      ? await this.departmentRepo.findOne({
          where: { departmentId: dto.departmentId },
        })
      : null;
    const batch = dto.batchId
      ? await this.batchRepo.findOne({ where: { batchId: dto.batchId } })
      : null;
    return { faculty, department, batch };
  }

  async createAlumni(dto: CreateAlumniDto) {
    if (dto.isAlumni) {
      if (
        !dto.facultyId ||
        !dto.departmentId ||
        !dto.batchId ||
        !dto.profession
      ) {
        throw new BadRequestException(
          'facultyId, departmentId, batchId, profession are required for alumni',
        );
      }
    }

    const existingEmail = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existingEmail) throw new BadRequestException('Email already in use');

    const user = this.userRepo.create({
      email: dto.email,
      username: dto.username,
      passwordHash: await bcrypt.hash(dto.password, 10),
      phone: dto.phone,
      isActive: dto.isActive ?? true,
      isAlumni: !!dto.isAlumni,
    });
    const savedUser = await this.userRepo.save(user);

    const { faculty, department, batch } = await this.resolveRelations(dto);

    const profile = this.profileRepo.create({
      user: savedUser,
      firstName: dto.firstName,
      middleName: dto.middleName ?? null,
      lastName: dto.lastName,
      faculty: dto.isAlumni ? faculty : null,
      department: dto.isAlumni ? department : null,
      batch: dto.isAlumni ? batch : null,
      profession: dto.isAlumni ? dto.profession ?? null : null,
      company: dto.company ?? null,
      country: dto.country ?? null,
      city: dto.city ?? null,
      bio: dto.bio ?? null,
    });
    await this.profileRepo.save(profile);

    return { ...savedUser, profile };
  }

  async updateAlumni(id: number, dto: UpdateAlumniDto) {
    const user = await this.userRepo.findOne({
      where: { userId: id },
      relations: ['profile'],
    });
    if (!user) throw new NotFoundException('User not found');

    if (dto.email) user.email = dto.email;
    if (dto.username !== undefined) user.username = dto.username;
    if (dto.password) user.passwordHash = await bcrypt.hash(dto.password, 10);
    if (dto.phone !== undefined) user.phone = dto.phone;
    if (dto.isActive !== undefined) user.isActive = dto.isActive;
    if (dto.isAlumni !== undefined) user.isAlumni = dto.isAlumni;

    await this.userRepo.save(user);

    const { faculty, department, batch } = await this.resolveRelations(dto);
    const profile = await this.profileRepo.findOne({
      where: { user: { userId: user.userId } },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('User profile not found');

    profile.firstName = dto.firstName ?? profile.firstName;
    profile.middleName = dto.middleName ?? profile.middleName;
    profile.lastName = dto.lastName ?? profile.lastName;

    if (user.isAlumni) {
      if (dto.facultyId !== undefined) profile.faculty = faculty ?? null;
      if (dto.departmentId !== undefined)
        profile.department = department ?? null;
      if (dto.batchId !== undefined) profile.batch = batch ?? null;
      if (dto.profession !== undefined)
        profile.profession = dto.profession ?? null;
    } else {
      profile.faculty = null;
      profile.department = null;
      profile.batch = null;
      if (dto.profession !== undefined) profile.profession = null;
    }

    if (dto.company !== undefined) profile.company = dto.company;
    if (dto.country !== undefined) profile.country = dto.country;
    if (dto.city !== undefined) profile.city = dto.city;
    if (dto.bio !== undefined) profile.bio = dto.bio;

    await this.profileRepo.save(profile);
    return { ...user, profile };
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({
      where: { userId: id },
      relations: [
        'profile',
        'profile.faculty',
        'profile.department',
        'profile.batch',
      ],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(filter: FilterAlumniDto) {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('profile.faculty', 'faculty')
      .leftJoinAndSelect('profile.department', 'department')
      .leftJoinAndSelect('profile.batch', 'batch');

    if (filter.isAlumni !== undefined)
      qb.andWhere('user.isAlumni = :isAlumni', { isAlumni: filter.isAlumni });
    if (filter.facultyId)
      qb.andWhere('faculty.facultyId = :facultyId', {
        facultyId: filter.facultyId,
      });
    if (filter.departmentId)
      qb.andWhere('department.departmentId = :departmentId', {
        departmentId: filter.departmentId,
      });
    if (filter.batchId)
      qb.andWhere('batch.batchId = :batchId', { batchId: filter.batchId });
    if (filter.profession)
      qb.andWhere('profile.profession LIKE :profession', {
        profession: `%${filter.profession}%`,
      });
    if (filter.name) {
      qb.andWhere(
        '(profile.firstName LIKE :name OR profile.lastName LIKE :name OR profile.middleName LIKE :name)',
        {
          name: `%${filter.name}%`,
        },
      );
    }

    return qb.getMany();
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { userId: id } });
    if (!user) throw new NotFoundException('User not found');
    user.isActive = false;
    await this.userRepo.save(user);
    return { success: true };
  }
}
