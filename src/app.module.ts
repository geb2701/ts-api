import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { PartidosModule } from './partidos/partidos.module';
import { SucursalModule } from './sucursal/sucursal.module';

@Module({
  imports: [PrismaModule, UsersModule, PostsModule, ConfigModule.forRoot({ isGlobal: true }), PartidosModule, SucursalModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
