-- CreateEnum
CREATE TYPE "public"."Estado" AS ENUM ('ACTIVO', 'FINALIZADO');

-- CreateTable
CREATE TABLE "public"."Sucursal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Partido" (
    "id" SERIAL NOT NULL,
    "sucursalId" INTEGER NOT NULL,
    "canchaNumero" INTEGER NOT NULL,
    "equipo1Nombre" TEXT NOT NULL,
    "equipo2Nombre" TEXT NOT NULL,
    "puntosEq1" INTEGER NOT NULL DEFAULT 0,
    "puntosEq2" INTEGER NOT NULL DEFAULT 0,
    "estado" "public"."Estado" NOT NULL DEFAULT 'ACTIVO',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Partido_sucursalId_canchaNumero_estado_idx" ON "public"."Partido"("sucursalId", "canchaNumero", "estado");

-- AddForeignKey
ALTER TABLE "public"."Partido" ADD CONSTRAINT "Partido_sucursalId_fkey" FOREIGN KEY ("sucursalId") REFERENCES "public"."Sucursal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
