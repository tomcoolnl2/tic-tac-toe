import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app/app.module';
import { AppController } from '../app/app.controller';
import { EnvConfigService } from '../app/config.service';

describe('AppModule', () => {
	let appModule: TestingModule;

	beforeEach(async () => {
		appModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
	});

	it('should be defined', () => {
		expect(appModule).toBeDefined();
	});

	it('should provide EnvConfigService', () => {
		const envConfigService = appModule.get<EnvConfigService>(EnvConfigService);
		expect(envConfigService).toBeDefined();
	});

	it('should provide ConfigService', () => {
		const configService = appModule.get<ConfigService>(ConfigService);
		expect(configService).toBeDefined();
	});

	it('should have AppController registered', () => {
		const appController = appModule.get<AppController>(AppController);
		expect(appController).toBeDefined();
	});
});
