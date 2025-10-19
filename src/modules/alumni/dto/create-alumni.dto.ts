import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateAlumniDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isAlumni?: boolean;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ValidateIf((o) => o.isAlumni === true)
  @IsNumber()
  facultyId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsNumber()
  departmentId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsNumber()
  batchId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsString()
  @IsNotEmpty()
  profession?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
