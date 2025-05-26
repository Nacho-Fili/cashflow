import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return {
          type: dbConfig.type,
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          entities: dbConfig.entities,
          synchronize: dbConfig.synchronize,
          logging: dbConfig.logging,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
