import { IsIn, IsInt, IsOptional, IsPositive } from 'class-validator';

export class SumarPuntoDto {
  @IsInt() @IsPositive() sucursalId!: number;
  @IsInt() @IsPositive() canchaNumero!: number;

  @IsIn([1, 2]) equipo!: 1 | 2;

  @IsOptional()
  @IsInt() @IsPositive()
  puntos?: number; // default 1
}
