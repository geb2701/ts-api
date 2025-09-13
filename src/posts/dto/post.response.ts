import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponse } from '../../users/dto/user.response';

export class PostResponse {
  @ApiProperty({ example: 10 }) id!: number;
  @ApiProperty({ example: 'Título' }) title!: string;
  @ApiPropertyOptional({ example: 'Contenido...' }) content?: string;
  @ApiProperty({ example: false }) published!: boolean;
  @ApiProperty({ example: 1 }) authorId!: number;
  @ApiProperty({ type: () => UserResponse, required: false }) author?: UserResponse;
  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' }) createdAt!: string;
  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' }) updatedAt!: string;
}