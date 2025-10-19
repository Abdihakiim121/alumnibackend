import 'reflect-metadata';
import AppDataSource from '../config/data-source';
import { RoleEntity } from '../modules/role/role.entity';
import { UserEntity } from '../modules/user/user.entity';
import { FacultyEntity } from '../modules/alumni/entities/faculty.entity';
import { DepartmentEntity } from '../modules/alumni/entities/department.entity';
import { BatchEntity } from '../modules/alumni/entities/batch.entity';
import { DepartmentBatchEntity } from '../modules/alumni/entities/department-batch.entity';
import { UserProfile } from '../modules/user/userprofile.entity';
import * as bcrypt from 'bcryptjs';

async function runSeed() {
  await AppDataSource.initialize();
  const roleRepo = AppDataSource.getRepository(RoleEntity);
  const userRepo = AppDataSource.getRepository(UserEntity);
  const facultyRepo = AppDataSource.getRepository(FacultyEntity);
  const departmentRepo = AppDataSource.getRepository(DepartmentEntity);
  const batchRepo = AppDataSource.getRepository(BatchEntity);
  const departmentBatchRepo = AppDataSource.getRepository(
    DepartmentBatchEntity,
  );
  const userProfileRepo = AppDataSource.getRepository(UserProfile);

  const roles = [
    { roleName: 'Admin', description: 'System administrator' },
    { roleName: 'Member', description: 'Alumni member' },
  ];
  for (const r of roles) {
    const exists = await roleRepo.findOne({ where: { roleName: r.roleName } });
    if (!exists) {
      await roleRepo.save(roleRepo.create(r));
      console.log(`Seeded role: ${r.roleName}`);
    }
  }

  // Faculties - Mogadishu University
  const faculties = [
    {
      facultyName: 'Faculty of Sharia & Law',
      description: 'Sharia and Law studies',
    },
    {
      facultyName: 'Faculty of Education & Humanities',
      description: 'Education and Humanities',
    },
    {
      facultyName: 'Faculty of Computer Sciences & Information Technology',
      description: 'Computer Sciences and IT',
    },
    {
      facultyName: 'Faculty of Economics & Management Sciences',
      description: 'Economics and Management',
    },
    {
      facultyName: 'Faculty of Engineering',
      description: 'Engineering disciplines',
    },
    { facultyName: 'Faculty of Medicine', description: 'Medical studies' },
    {
      facultyName: 'Faculty of Health Sciences',
      description: 'Health and medical sciences',
    },
    {
      facultyName: 'Faculty of Political Science & Public Administration',
      description: 'Political science and public administration',
    },
    {
      facultyName: 'Faculty of Agriculture & Environmental Science',
      description: 'Agriculture and environmental studies',
    },
    {
      facultyName: 'Faculty of Veterinary Science',
      description: 'Veterinary medicine',
    },
    { facultyName: 'Faculty of Dentistry', description: 'Dental studies' },
    {
      facultyName: 'Faculty of Civil Aviation',
      description: 'Civil aviation management',
    },
  ];
  for (const f of faculties) {
    const exists = await facultyRepo.findOne({
      where: { facultyName: f.facultyName },
    });
    if (!exists) {
      await facultyRepo.save(facultyRepo.create(f));
      console.log(`Seeded faculty: ${f.facultyName}`);
    }
  }

  // Departments (attach to faculties)
  const facultyMap = new Map();
  for (const faculty of faculties) {
    const savedFaculty = await facultyRepo.findOne({
      where: { facultyName: faculty.facultyName },
    });
    if (savedFaculty) {
      facultyMap.set(faculty.facultyName, savedFaculty);
    }
  }

  const departments = [
    // Faculty of Sharia & Law
    {
      departmentName: 'Sharia & Law',
      faculty: facultyMap.get('Faculty of Sharia & Law'),
    },
    {
      departmentName: 'Sharia',
      faculty: facultyMap.get('Faculty of Sharia & Law'),
    },
    {
      departmentName: 'Law',
      faculty: facultyMap.get('Faculty of Sharia & Law'),
    },

    // Faculty of Education & Humanities
    {
      departmentName: 'History & Geography',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'English & History',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'English & Geography',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'Social Work',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'Math & Physics',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'Biology & Chemistry',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },
    {
      departmentName: 'Arabic Language & Islamic Studies',
      faculty: facultyMap.get('Faculty of Education & Humanities'),
    },

    // Faculty of Computer Sciences & Information Technology
    {
      departmentName: 'Computer Science',
      faculty: facultyMap.get(
        'Faculty of Computer Sciences & Information Technology',
      ),
    },
    {
      departmentName: 'Information Technology',
      faculty: facultyMap.get(
        'Faculty of Computer Sciences & Information Technology',
      ),
    },
    {
      departmentName: 'Enterprise Networking',
      faculty: facultyMap.get(
        'Faculty of Computer Sciences & Information Technology',
      ),
    },

    // Faculty of Economics & Management Sciences
    {
      departmentName: 'Business Administration',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'International Trade and Business',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Management Information Systems',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Procurement & Logistics Management',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Finance & Banking',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Project Management',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Statistics & Planning',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Marketing',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Accounting',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },
    {
      departmentName: 'Economics',
      faculty: facultyMap.get('Faculty of Economics & Management Sciences'),
    },

    // Faculty of Engineering
    {
      departmentName: 'Architecture',
      faculty: facultyMap.get('Faculty of Engineering'),
    },
    {
      departmentName: 'Civil Engineering',
      faculty: facultyMap.get('Faculty of Engineering'),
    },
    {
      departmentName: 'Electric & Electronic Engineering',
      faculty: facultyMap.get('Faculty of Engineering'),
    },
    {
      departmentName: 'Interior Design',
      faculty: facultyMap.get('Faculty of Engineering'),
    },

    // Faculty of Medicine
    {
      departmentName: 'Medicine & Surgery',
      faculty: facultyMap.get('Faculty of Medicine'),
    },

    // Faculty of Health Sciences
    {
      departmentName: 'Clinical Officer',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'Public Health',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'Micro-biology',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'Midwifery',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'General Nursing',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'Nutrition and Dietetics',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },
    {
      departmentName: 'Medical Laboratory Sciences',
      faculty: facultyMap.get('Faculty of Health Sciences'),
    },

    // Faculty of Political Science & Public Administration
    {
      departmentName: 'Political Science',
      faculty: facultyMap.get(
        'Faculty of Political Science & Public Administration',
      ),
    },
    {
      departmentName: 'Public Administration',
      faculty: facultyMap.get(
        'Faculty of Political Science & Public Administration',
      ),
    },
    {
      departmentName: 'International Relations',
      faculty: facultyMap.get(
        'Faculty of Political Science & Public Administration',
      ),
    },
    {
      departmentName: 'Journalism & Communication',
      faculty: facultyMap.get(
        'Faculty of Political Science & Public Administration',
      ),
    },

    // Faculty of Agriculture & Environmental Science
    {
      departmentName: 'Agriculture',
      faculty: facultyMap.get('Faculty of Agriculture & Environmental Science'),
    },
    {
      departmentName: 'Environmental Science',
      faculty: facultyMap.get('Faculty of Agriculture & Environmental Science'),
    },

    // Faculty of Veterinary Science
    {
      departmentName: 'Health & Veterinary Care',
      faculty: facultyMap.get('Faculty of Veterinary Science'),
    },

    // Faculty of Dentistry
    {
      departmentName: 'Dentistry',
      faculty: facultyMap.get('Faculty of Dentistry'),
    },
    {
      departmentName: 'Dental Assistant',
      faculty: facultyMap.get('Faculty of Dentistry'),
    },

    // Faculty of Civil Aviation
    {
      departmentName: 'Civil Aviation Management',
      faculty: facultyMap.get('Faculty of Civil Aviation'),
    },
  ];

  for (const d of departments) {
    if (d.faculty) {
      const exists = await departmentRepo.findOne({
        where: { departmentName: d.departmentName },
      });
      if (!exists) {
        await departmentRepo.save(departmentRepo.create(d));
        console.log(`Seeded department: ${d.departmentName}`);
      }
    }
  }

  // Batches
  const batchYears = [2018, 2019, 2020, 2021, 2022];
  for (const by of batchYears) {
    const exists = await batchRepo.findOne({ where: { batchYear: by as any } });
    if (!exists) {
      await batchRepo.save(
        batchRepo.create({ batchYear: by as any, description: `${by} intake` }),
      );
      console.log(`Seeded batch: ${by}`);
    }
  }

  // Department-Batches (map each department to first two batches)
  const savedDepartments = await departmentRepo.find();
  const savedBatches = await batchRepo.find({ order: { batchId: 'ASC' } });
  for (const d of savedDepartments) {
    for (const b of savedBatches.slice(0, 2)) {
      const exists = await departmentBatchRepo.findOne({
        where: {
          department: { departmentId: d.departmentId },
          batch: { batchId: b.batchId },
        },
      });
      if (!exists) {
        await departmentBatchRepo.save(
          departmentBatchRepo.create({ department: d, batch: b }),
        );
        console.log(`Linked ${d.departmentName} to batch ${b.batchYear}`);
      }
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@alumni.local';
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  let admin = await userRepo.findOne({
    where: [{ email: adminEmail }, { username: adminUsername }],
  });
  if (!admin) {
    const adminRole = await roleRepo.findOne({ where: { roleName: 'Admin' } });
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    admin = userRepo.create({
      email: adminEmail,
      username: adminUsername,
      passwordHash,
      isActive: true,
      isVerified: true,
      role: adminRole!,
    });
    await userRepo.save(admin);
    // create minimal admin profile
    const adminProfile = userProfileRepo.create({
      user: admin,
      firstName: 'System',
      middleName: null,
      lastName: 'Admin',
    });
    await userProfileRepo.save(adminProfile);
    console.log('Seeded admin user');
  }

  // Sample member user with profile
  const memberEmail = 'member1@alumni.local';
  let member = await userRepo.findOne({ where: { email: memberEmail } });
  if (!member) {
    const memberRole = await roleRepo.findOne({
      where: { roleName: 'Member' },
    });
    const passwordHash = await bcrypt.hash('Member123!', 10);
    member = userRepo.create({
      email: memberEmail,
      username: 'member1',
      passwordHash,
      isActive: true,
      isVerified: true,
      role: memberRole!,
      isAlumni: true,
    });
    member = await userRepo.save(member);

    const anyDept =
      savedDepartments[0] || (await departmentRepo.findOne({ where: {} }))!;
    const anyBatch =
      savedBatches[0] || (await batchRepo.findOne({ where: {} }))!;

    // Get any faculty as fallback
    const anyFaculty = await facultyRepo.findOne({ where: {} });
    const facultyForDept = anyDept.faculty
      ? await facultyRepo
          .findOne({ where: { facultyId: (anyDept.faculty as any).facultyId } })
          .catch(() => anyFaculty)
      : anyFaculty;

    const profile = userProfileRepo.create({
      user: member,
      firstName: 'Member',
      lastName: 'User',
      middleName: null,
      gender: null,
      graduationYear: anyBatch?.batchYear as any,
      faculty: facultyForDept || anyFaculty!,
      department: anyDept,
      batch: anyBatch,
      profession: 'Software Engineer',
      company: 'Alumni Co',
      country: 'Ethiopia',
      city: 'Addis Ababa',
      bio: 'Proud alumni member.',
    });
    await userProfileRepo.save(profile);
    console.log('Seeded member user with profile');
  }

  await AppDataSource.destroy();
}

runSeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
