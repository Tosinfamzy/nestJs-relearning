import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import Joi from '@hapi/joi';
// import appConfig from './config/app.config';

@Module({
  imports: [
    // ConfigModule.forRoot({ load:[appConfig]})
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PG_PASSWORD: Joi.string().required(),
      }),
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PG_PASSWORD,
      database: 'postgres',
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
