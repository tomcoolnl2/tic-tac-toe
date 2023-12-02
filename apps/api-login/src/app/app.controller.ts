import {
	Controller,
	Body,
	Get,
	Post,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, PlayerSymbol } from '@tic-tac-toe/model';

@Controller()
export class AppController {
	constructor(private readonly configService: ConfigService) {}

	@Get('username')
	getUserName(): Partial<User> {
		return { name: this.configService.get('VITE_USERNAME') };
	}

	@Post('login')
	login(@Body('pwd') pwd: string): User {
		const validPwd = this.configService.get('VITE_USERPWD');
		if (pwd === validPwd) {
			return {
				name: this.configService.get('VITE_USERNAME'),
				avatar: PlayerSymbol.X,
				loggedIn: true,
			};
		} else {
			throw new HttpException(
				`Validation failed: wrong password!`,
				HttpStatus.FORBIDDEN
			);
		}
	}
}
