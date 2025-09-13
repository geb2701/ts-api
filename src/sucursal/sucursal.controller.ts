import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { SucursalResponseDto } from './dto/sucursal-response.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';


@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  @ApiCreatedResponse({ type: SucursalResponseDto })
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(createSucursalDto);
  }

  @Get()
  @ApiOkResponse({ type: SucursalResponseDto, isArray: true })
  findAll() {
    return this.sucursalService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: SucursalResponseDto })
  findOne(@Param('id') id: string) {
    return this.sucursalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSucursalDto: UpdateSucursalDto) {
    return this.sucursalService.update(+id, updateSucursalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalService.remove(+id);
  }
}