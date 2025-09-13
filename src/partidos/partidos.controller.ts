import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { FinalizarPorCanchaDto } from './dto/finalizar-por-cancha.dto';
import { SumarPuntoDto } from './dto/sumar-punto.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PartidoResponseDto } from './dto/partido-response.dto';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly service: PartidosService) {}

  // --- CRUD base ---
  @Post()
  @ApiCreatedResponse({ type: PartidoResponseDto })
  create(@Body() dto: CreatePartidoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: PartidoResponseDto, isArray: true })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PartidoResponseDto})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePartidoDto) {
    return this.service.update(id, dto);
  }

  // --- Endpoints de negocio ---
  @Post('finalizar')
  finalizar(@Body() dto: FinalizarPorCanchaDto) {
    return this.service.finalizarPorCancha(dto);
  }

  @Post('punto')
  sumarPunto(@Body() dto: SumarPuntoDto) {
    return this.service.sumarPunto(dto);
  }

  @Get('punto/derecha')
  async sumarPuntoDerecha() {
    const data = { sucursalId: 1, canchaNumero: 1, equipo: 1 } as SumarPuntoDto;
    const response = await this.service.sumarPunto(data);
    console.log("nueva peticion");
    console.log(response);
    return response;
  }

  @Get('punto/izquierda')
  async sumarPuntoIzquierda() {
    const data = { sucursalId: 1, canchaNumero: 1, equipo: 2 } as SumarPuntoDto;
    const response = await this.service.sumarPunto(data);
    console.log("nueva peticion");
    console.log(response);
    return response;
  }

  @Get('activos/list')
  activos(@Query('sucursalId') sucursalId?: string) {
    return this.service.activos(sucursalId ? Number(sucursalId) : undefined);
  }
}
