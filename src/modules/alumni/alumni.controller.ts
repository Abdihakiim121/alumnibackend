import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { FilterAlumniDto } from './dto/filter-alumni.dto';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post('create')
  create(@Body() dto: CreateAlumniDto) {
    return this.alumniService.createAlumni(dto);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAlumniDto) {
    return this.alumniService.updateAlumni(id, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alumniService.findById(id);
  }

  @Get()
  findAll(@Query() filter: FilterAlumniDto) {
    return this.alumniService.findAll(filter);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alumniService.remove(id);
  }
}
