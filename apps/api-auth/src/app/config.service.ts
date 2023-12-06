// config.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
	constructor(private readonly configService: ConfigService) {}

	get(key: string): string | undefined {
		return this.configService.get<string>(key);
	}
}

@Injectable()
export class EnvConfigProvider {
	constructor(private readonly envConfigService: EnvConfigService) {}

	provideConfig(): EnvConfigService {
		return this.envConfigService;
	}
}
