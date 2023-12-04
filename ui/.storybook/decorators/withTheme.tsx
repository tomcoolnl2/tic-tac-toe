import { FC, ReactElement } from 'react';
import { Theme, Themes } from '../../src/lib/theme/theme';

export function withTheme<T extends JSX.IntrinsicAttributes>(
	WrappedComponent: FC<T>,
	theme: Themes | string
): FC<T> {
	return function (props: T): ReactElement {
		switch (theme) {
			case 'side-by-side': {
				return (
					<div className={theme}>
						<Theme theme={Themes.WEB}>
							<WrappedComponent {...props} />
						</Theme>
						<Theme theme={Themes.DESKTOP}>
							<WrappedComponent {...props} />
						</Theme>
					</div>
				);
			}
			default: {
				return (
					<Theme theme={theme as Themes}>
						<WrappedComponent {...props} />
					</Theme>
				);
			}
		}
	};
}
