import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';

@Module({
  controllers: [PartidosController],
  providers: [PartidosService],
})
export class PartidosModule {}
