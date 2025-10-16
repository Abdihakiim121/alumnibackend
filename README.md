# Alumni Backend API

A comprehensive NestJS-based backend API for managing alumni data and relationships for Mogadishu University.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user registration, profile management, and login history
- **University Structure**: Faculty, Department, and Batch management
- **Alumni Profiles**: Detailed alumni profiles with academic and professional information
- **Database Seeding**: Pre-populated with university structure and sample data

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Password Hashing**: bcryptjs
- **API Documentation**: Swagger/OpenAPI

## Database Schema

The system includes the following main entities:

- **Roles**: Admin, Member
- **Users**: Authentication and basic user information
- **UserProfiles**: Detailed alumni profiles
- **Faculties**: University faculties (12 faculties)
- **Departments**: Academic departments (45+ departments)
- **Batches**: Graduation years (2018-2022)
- **DepartmentBatches**: Junction table linking departments to batches

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd alumnibackend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory:

```env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=alumnidb
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@alumni.local
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ChangeMe123!
```

4. Run database migrations:

```bash
npm run migration:run
```

5. Seed the database:

```bash
npm run seed
```

6. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /auth/login` - User login

### Users (Protected)

- `GET /user` - Get all users (Admin only)
- `POST /user` - Create new user
- `PATCH /user` - Update user
- `GET /user/loggedInUser` - Get current user profile

## Default Users

After seeding, you can login with:

**Admin User:**

- Email: `admin@alumni.local`
- Username: `admin`
- Password: `ChangeMe123!`

**Member User:**

- Email: `member1@alumni.local`
- Username: `member1`
- Password: `Member123!`

## Database Seeding

The seed script populates the database with:

- Default roles (Admin, Member)
- All Mogadishu University faculties and departments
- Sample batches (2018-2022)
- Department-batch relationships
- Admin and sample member users with profiles

## Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start:prod` - Start production server
- `npm run migration:generate` - Generate new migration
- `npm run migration:run` - Run pending migrations
- `npm run seed` - Seed the database
- `npm run test` - Run tests

## Project Structure

```
src/
├── modules/
│   ├── auth/           # Authentication module
│   ├── user/           # User management
│   ├── role/           # Role management
│   ├── faculty/        # Faculty management
│   ├── department/     # Department management
│   ├── batch/          # Batch management
│   └── department-batch/ # Department-batch relationships
├── config/             # Configuration files
├── common/             # Shared utilities and DTOs
└── seeds/              # Database seeding scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the UNLICENSED License.
