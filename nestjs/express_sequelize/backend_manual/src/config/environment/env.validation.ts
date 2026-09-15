import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { DatabaseDialect } from './env.interface.js';

class EnvironmentVariables {
  @IsEnum(DatabaseDialect)
  DB_DIALECT: DatabaseDialect;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsNumber()
  APP_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  return validated;
}
