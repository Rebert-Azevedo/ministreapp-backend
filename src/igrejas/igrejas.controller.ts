import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { IgrejasService } from './igrejas.service';
import { CreateIgrejaDto } from './dto/create-igreja.dto';
import { UpdateIgrejaDto } from './dto/update-igreja.dto';

@Controller('igrejas')
export class IgrejasController {
  constructor(private readonly igrejasService: IgrejasService) {}

  @Post()
  create(@Body() createIgrejaDto: CreateIgrejaDto) {
    return this.igrejasService.create(createIgrejaDto);
  }

  @Get()
  findAll() {
    return this.igrejasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.igrejasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIgrejaDto: UpdateIgrejaDto,
  ) {
    return this.igrejasService.update(id, updateIgrejaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.igrejasService.remove(id);
  }
}