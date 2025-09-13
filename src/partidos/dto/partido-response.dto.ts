import { ApiProperty } from '@nestjs/swagger';

export class PartidoResponseDto {
  @ApiProperty({ example: 10 })
  id!: number;

  @ApiProperty({ example: 1 })
  sucursalId!: number;

  @ApiProperty({ example: 2 })
  canchaNumero!: number;

  @ApiProperty({ example: 'Los Tigres' })
  equipo1Nombre!: string;

  @ApiProperty({ example: 'Los Leones' })
  equipo2Nombre!: string;

  @ApiProperty({ example: 5 })
  puntosEq1!: number;

  @ApiProperty({ example: 3 })
  puntosEq2!: number;

  @ApiProperty({ example: 'ACTIVO', enum: ['ACTIVO', 'FINALIZADO'] })
  estado!: string;

  @ApiProperty({ example: '2025-09-06T15:25:00Z' })
  startedAt!: Date;

  @ApiProperty({ example: null })
  endedAt!: Date | null;
}