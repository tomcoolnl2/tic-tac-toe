import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppController } from '../app/app.controller';
import { PlayerSymbol } from '@tic-tac-toe/model';

describe('AppController', () => {
	let appController: AppController;
	let configService: ConfigService;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		appController = app.get<AppController>(AppController);
		configService = app.get<ConfigService>(ConfigService);
	});

	it('should be defined', () => {
		expect(appController).toBeDefined();
	});

	describe('getUserName', () => {
		it('should return a partial User with username', () => {
			const username = 'testuser';
			jest.spyOn(configService, 'get').mockReturnValue(username);
			const result = appController.getUserName();
			expect(result).toEqual({ name: username });
		});
	});

	describe('login', () => {
		it('should return a user object if the password matches', () => {
			const username = 'testuser';
			const password = 'testpassword';
			jest.spyOn(configService, 'get').mockImplementation((key: string) => {
				if (key === 'VITE_USERPWD') return password;
				if (key === 'VITE_USERNAME') return username;
				return undefined;
			});
			const result = appController.login(password);
			expect(result).toEqual({
				name: username,
				avatar: PlayerSymbol.X,
				loggedIn: true,
			});
		});

		it('should throw Forbidden exception if password is incorrect', () => {
			jest.spyOn(configService, 'get').mockReturnValue('correctpassword');
			expect(() => appController.login('incorrectpassword')).toThrowError(HttpException);
			try {
				appController.login('incorrectpassword');
			} catch (error) {
				expect(error.getStatus()).toBe(HttpStatus.FORBIDDEN);
				expect(error.message).toBe('Validation failed: wrong password!');
			}
		});
	});
});
