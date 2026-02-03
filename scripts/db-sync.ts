import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize-typescript';
import { AppModule } from '../src/app.module';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const sequelize = app.get(Sequelize);

  // alter: true tries to evolve the schema to match models without dropping tables.
  // Depending on the change, the DB may still require manual migrations (especially around constraints/indexes/renames).

  await sequelize.sync({ alter: true });

  await app.close();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
