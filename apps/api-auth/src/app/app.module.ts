import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EnvConfigProvider, EnvConfigService } from './config.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: join(__dirname, '../../', '.env'),
		}),
	],
	controllers: [AppController],
	providers: [EnvConfigService, EnvConfigProvider],
	exports: [EnvConfigProvider],
})
export class AppModule {}
