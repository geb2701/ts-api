import { IsInt, IsPositive } from 'class-validator';

export class FinalizarPorCanchaDto {
  @IsInt() @IsPositive() sucursalId!: number;
  @IsInt() @IsPositive() canchaNumero!: number;
}
