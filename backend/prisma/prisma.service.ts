/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Load the Postgres adapter and instantiate it with DATABASE_URL
    let AdapterClass: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('@prisma/adapter-pg');
      AdapterClass =
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        mod.PrismaPg ?? mod?.default?.PrismaPg ?? mod?.default ?? mod;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new Error(
        'Prisma adapter for PostgreSQL not found. Install it with: pnpm add @prisma/adapter-pg',
      );
    }

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }

    // eslint-disable-next-line , @typescript-eslint/no-unsafe-call
    const adapterInstance = new AdapterClass({ connectionString });
    // eslint-disable-next-line  @typescript-eslint/no-unnecessary-type-assertion
    super({ adapter: adapterInstance as any });
  }

  // Se conecta cuando el módulo inicia
  async onModuleInit() {
    await this.$connect();
  }

  // Se desconecta cuando el módulo se destruye
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
