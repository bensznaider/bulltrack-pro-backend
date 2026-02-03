import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../src/app.module';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const sequelize = app.get(Sequelize);

  // force: true drops and recreates all tables.
  // This will DELETE ALL DATA. Useful for fresh dev environments and reseeding.

  await sequelize.sync({ force: true });

  await app.close();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
