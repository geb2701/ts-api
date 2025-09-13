// src/users/dto/create-user.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'ana@mail.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: 'Ana',
    description: 'Nombre completo del usuario',
  })
  @IsOptional()
  @IsString()
  name?: string;
}