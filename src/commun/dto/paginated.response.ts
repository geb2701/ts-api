import { ApiProperty } from '@nestjs/swagger';

export class PaginatedMeta {
  @ApiProperty({ example: 1 }) page!: number;
  @ApiProperty({ example: 10 }) pageSize!: number;
  @ApiProperty({ example: 42 }) totalItems!: number;
  @ApiProperty({ example: 5 }) totalPages!: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({ type: () => PaginatedMeta }) meta!: PaginatedMeta;
  // items se tipa dinámicamente en el controller con getSchemaPath
  items!: T[];
}