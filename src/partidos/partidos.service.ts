import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { FinalizarPorCanchaDto } from './dto/finalizar-por-cancha.dto';
import { SumarPuntoDto } from './dto/sumar-punto.dto';

@Injectable()
export class PartidosService {
  constructor(private readonly prisma: PrismaService) {}

  // --- CRUD generado ---
  create(dto: CreatePartidoDto) {
    return this.crearPartido(dto);
  }

  findAll() {
    return this.prisma.partido.findMany({
      orderBy: [{ sucursalId: 'asc' }, { canchaNumero: 'asc' }, { id: 'asc' }],
    });
  }

  async findOne(id: number) {
    const row = await this.prisma.partido.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Partido no encontrado');
    return row;
  }

  async update(id: number, dto: UpdatePartidoDto) {
    // si intentan cambiar a una cancha con otro ACTIVO, validalo:
    if (dto.sucursalId && dto.canchaNumero) {
      const existente = await this.prisma.partido.findFirst({
        where: {
          id: { not: id },
          sucursalId: dto.sucursalId,
          canchaNumero: dto.canchaNumero,
          estado: 'ACTIVO',
        },
        select: { id: true },
      });
      if (existente) throw new BadRequestException('Ya hay un partido ACTIVO en esa cancha');
    }
    await this.findOne(id);
    return this.prisma.partido.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.partido.delete({ where: { id } });
  }

  // --- Reglas de negocio ---
  async crearPartido(dto: CreatePartidoDto) {
    // validar sucursal
    const suc = await this.prisma.sucursal.findUnique({ where: { id: dto.sucursalId } });
    if (!suc) throw new BadRequestException('Sucursal inexistente');

    // 1 activo por (sucursal, cancha)
    const activo = await this.prisma.partido.findFirst({
      where: { sucursalId: dto.sucursalId, canchaNumero: dto.canchaNumero, estado: 'ACTIVO' },
      select: { id: true },
    });
    if (activo) throw new BadRequestException('Ya hay un partido ACTIVO en esa cancha');

    return this.prisma.partido.create({
      data: {
        sucursalId: dto.sucursalId,
        canchaNumero: dto.canchaNumero,
        equipo1Nombre: dto.equipo1Nombre,
        equipo2Nombre: dto.equipo2Nombre,
      },
    });
  }

  async finalizarPorCancha(dto: FinalizarPorCanchaDto) {
    const partido = await this.prisma.partido.findFirst({
      where: { sucursalId: dto.sucursalId, canchaNumero: dto.canchaNumero, estado: 'ACTIVO' },
    });
    if (!partido) throw new NotFoundException('No hay partido ACTIVO en esa cancha');

    return this.prisma.partido.update({
      where: { id: partido.id },
      data: { estado: 'FINALIZADO', endedAt: new Date() },
    });
  }

  async sumarPunto(dto: SumarPuntoDto) {
    const puntos = dto.puntos ?? 1;
    const partido = await this.prisma.partido.findFirst({
      where: { sucursalId: dto.sucursalId, canchaNumero: dto.canchaNumero, estado: 'ACTIVO' },
    });
    if (!partido) throw new NotFoundException('No hay partido ACTIVO en esa cancha');

    return this.prisma.partido.update({
      where: { id: partido.id },
      data:
        dto.equipo === 1
          ? { puntosEq1: { increment: puntos } }
          : { puntosEq2: { increment: puntos } },
    });
  }

  activos(sucursalId?: number) {
    return this.prisma.partido.findMany({
      where: { estado: 'ACTIVO', ...(sucursalId ? { sucursalId } : {}) },
      orderBy: [{ sucursalId: 'asc' }, { canchaNumero: 'asc' }],
    });
  }
}
