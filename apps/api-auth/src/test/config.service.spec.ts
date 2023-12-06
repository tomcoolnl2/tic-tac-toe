import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService, EnvConfigProvider } from '../app/config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvConfigService', () => {
	let envConfigService: EnvConfigService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EnvConfigService,
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		envConfigService = module.get<EnvConfigService>(EnvConfigService);
		configService = module.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(envConfigService).toBeDefined();
	});

	it('should call ConfigService with the provided key', () => {
		const key = 'SOME_KEY';
		const value = 'some_value';
		jest.spyOn(configService, 'get').mockReturnValue(value);

		const result = envConfigService.get(key);
		expect(result).toEqual(value);
		expect(configService.get).toHaveBeenCalledWith(key);
	});
});

describe('EnvConfigProvider', () => {
	let envConfigProvider: EnvConfigProvider;
	let envConfigService: EnvConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				EnvConfigService,
				EnvConfigProvider,
				{
					provide: EnvConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		envConfigProvider = module.get<EnvConfigProvider>(EnvConfigProvider);
		envConfigService = module.get<EnvConfigService>(EnvConfigService);
	});

	it('should be defined', () => {
		expect(envConfigProvider).toBeDefined();
	});

	it('should provide EnvConfigService', () => {
		const providedService = envConfigProvider.provideConfig();
		expect(providedService).toBe(envConfigService);
	});
});
