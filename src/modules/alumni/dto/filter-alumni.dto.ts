import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterAlumniDto {
  @IsOptional()
  @IsBoolean()
  isAlumni?: boolean;

  @IsOptional()
  @IsNumber()
  facultyId?: number;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  batchId?: number;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
