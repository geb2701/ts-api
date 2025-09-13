import { ApiProperty } from '@nestjs/swagger';

export class SucursalResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Sucursal Centro' })
  nombre!: string;

  @ApiProperty({ example: '2025-09-06T15:20:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2025-09-06T15:20:00Z' })
  updatedAt!: Date;
}
