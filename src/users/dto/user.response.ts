import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'ana@mail.com' })
  email!: string;

  @ApiPropertyOptional({ example: 'Ana' })
  name?: string;

  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' })
  createdAt!: string;

  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' })
  updatedAt!: string;
}
