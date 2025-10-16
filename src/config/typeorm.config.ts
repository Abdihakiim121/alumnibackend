import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Isma@1234',
  database: 'sms',
  //entities: [],
  //entities: ['dist/src/**/*.entity{.ts,.js}'],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};
