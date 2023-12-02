import * as Rx from 'rxjs';

export function isDevEnvironment() {
	return import.meta.env.DEV;
}

export function isProdEnvironment() {
	return !isDevEnvironment();
}

export enum RxLoggingLevel {
	TRACE,
	DEBUG,
	INFO,
	ERROR,
}

let logginglevel = RxLoggingLevel.INFO;

export const setRxLoggingLevel = (level: RxLoggingLevel) => {
	logginglevel = level;
};

export const debug =
	(logLevel: RxLoggingLevel, message: string) =>
	(source$: Rx.Observable<unknown>) => {
		source$.pipe(
			Rx.tap((value) => {
				if (isProdEnvironment() && logLevel >= RxLoggingLevel.INFO) {
					console.log(message + ' : ', value);
				} else if (logLevel >= logginglevel) {
					console.log(message + ' : ', value);
				}
			})
		);
	};
