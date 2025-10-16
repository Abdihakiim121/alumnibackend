import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || 'alumnidb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.DATABASE_SQL_LOGGING === 'true',
});

export default AppDataSource;
