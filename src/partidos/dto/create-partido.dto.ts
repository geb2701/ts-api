import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreatePartidoDto {
  @IsInt() @IsPositive() sucursalId!: number;
  @IsInt() @IsPositive() canchaNumero!: number;

  @IsString() @IsNotEmpty() equipo1Nombre!: string;
  @IsString() @IsNotEmpty() equipo2Nombre!: string;
}
