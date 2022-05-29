import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './configs/config.service';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UsersModule } from './users/users.module';
import fs = require('fs');
fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.prod'],
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    LoginModule,
    RegisterModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
