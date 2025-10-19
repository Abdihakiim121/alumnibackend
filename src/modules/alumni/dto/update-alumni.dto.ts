import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumniDto } from './create-alumni.dto';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateAlumniDto extends PartialType(CreateAlumniDto) {
  @IsOptional()
  @IsBoolean()
  isAlumni?: boolean;

  @ValidateIf((o) => o.isAlumni === true)
  @IsOptional()
  @IsNumber()
  facultyId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsOptional()
  @IsNumber()
  batchId?: number;

  @ValidateIf((o) => o.isAlumni === true)
  @IsOptional()
  @IsString()
  profession?: string;
}
