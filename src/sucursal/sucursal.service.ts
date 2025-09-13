import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSucursalDto) {
    return this.prisma.sucursal.create({ data: dto });
  }

  findAll() {
    return this.prisma.sucursal.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const row = await this.prisma.sucursal.findUnique({ where: { id } });
    if (!row) throw new NotFoundException('Sucursal no encontrada');
    return row;
  }

  async update(id: number, dto: UpdateSucursalDto) {
    await this.findOne(id);
    return this.prisma.sucursal.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.sucursal.delete({ where: { id } });
  }
}
