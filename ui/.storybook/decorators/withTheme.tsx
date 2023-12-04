import { FC, ReactElement } from 'react';
import { Theme, Themes } from '../../src/lib/theme/theme';

export function withTheme<T extends JSX.IntrinsicAttributes>(
	WrappedComponent: FC<T>,
	theme: Themes
): FC<T> {
	return function (props: T): ReactElement {
		return (
			<Theme theme={theme}>
				<WrappedComponent {...props} />
			</Theme>
		);
	};
}
