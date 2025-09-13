# 🚀 API Padel – NestJS + Prisma + PostgreSQL + Scalar

Este proyecto es una **API REST** construida con [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) y [PostgreSQL](https://www.postgresql.org/).  
La documentación de endpoints se genera automáticamente con **OpenAPI** y se expone mediante [Scalar](https://scalar.com/).

---

## 📦 Requisitos previos
- Node.js >= 18
- pnpm (`npm install -g pnpm`)
- Docker Desktop (con WSL2 en Windows)
- PostgreSQL (via Docker o instalado localmente)

---

## ⚙️ Instalación inicial

### 1. Crear proyecto Nest
```bash
pnpm dlx @nestjs/cli new proyecto-padel-api
cd proyecto-padel-api
```

### 2. Instalar dependencias
```bash
pnpm add @prisma/client
pnpm add -D prisma @nestjs/cli
pnpm add @nestjs/config
pnpm add @nestjs/swagger swagger-ui-express
pnpm add @scalar/nestjs-api-reference
pnpm add class-validator class-transformer
```

---

## 🐘 Base de datos con Docker

Levantar PostgreSQL con Docker:
```bash
docker run --name pg-nest -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=app -p 5432:5432 -d postgres:16
```

Config `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app?schema=public"
PORT=5000
```

---

## 🛠️ Prisma

Inicializar:
```bash
pnpm prisma init
```

Editar `prisma/schema.prisma` con los modelos:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Migrar y generar cliente:
```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
```

Opcional: abrir Prisma Studio
```bash
pnpm prisma studio
```

---

## 🧩 Prisma Module en Nest

`src/prisma/prisma.service.ts`:
```ts
import { Injectable, INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => { await app.close(); });
  }
}
```

`src/prisma/prisma.module.ts`:
```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## 📂 Generar recursos (CRUD)

### Users
```bash
pnpm nest g resource users
```

### Posts
```bash
pnpm nest g resource posts
```

---

## ⚙️ Configuración de variables de entorno

`app.module.ts`:
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // otros módulos...
  ],
})
export class AppModule {}
```

`main.ts`:
```ts
const configService = app.get(ConfigService);
const port = configService.get<number>('PORT') || 3000;
await app.listen(port);
```

---

## 📘 Documentación con Scalar

`main.ts`:
```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

const config = new DocumentBuilder()
  .setTitle('API Padel')
  .setDescription('NestJS + Prisma con Scalar UI')
  .setVersion('1.0.0')
  .build();

const document = SwaggerModule.createDocument(app, config);

// Exponer JSON en /openapi.json
const adapter = app.getHttpAdapter();
adapter.get('/openapi.json', (req, res) => res.json(document));

// UI con Scalar
app.use('/docs', apiReference({ content: document, theme: 'purple' }));
```

Accedé a la documentación en:  
👉 [http://localhost:5000/docs](http://localhost:5000/docs)

---

## 🧾 Decoradores en DTOs

Ejemplo `CreateUserDto`:
```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ana@mail.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'Ana' })
  @IsOptional()
  @IsString()
  name?: string;
}
```

Ejemplo respuesta `UserResponse`:
```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 1 }) id!: number;
  @ApiProperty({ example: 'ana@mail.com' }) email!: string;
  @ApiPropertyOptional({ example: 'Ana' }) name?: string;
  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' }) createdAt!: string;
  @ApiProperty({ example: '2025-09-06T12:34:56.000Z' }) updatedAt!: string;
}
```

En los controladores:
```ts
@ApiCreatedResponse({ description: 'Usuario creado', type: UserResponse })
@ApiOkResponse({ description: 'Lista de usuarios', type: UserResponse, isArray: true })
```

---

## 🚀 Correr la app
```bash
pnpm start:dev
```

La API estará disponible en:  
👉 `http://localhost:5000/api` (según tu prefijo)  
👉 `http://localhost:5000/docs` (UI de Scalar)  
👉 `http://localhost:5000/openapi.json` (spec en JSON)


Sistema: PostgreSQL
Servidor: db
Usuario: app
Contraseña: app
Base de datos: appdb