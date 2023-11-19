import { FC, ReactElement } from 'react';
import { Theme } from '../theme/theme';

export function withTheme<T extends JSX.IntrinsicAttributes>(
	WrappedComponent: FC<T>
): FC<T> {
	return function (props: T): ReactElement {
		return (
			<Theme>
				<WrappedComponent {...props} />
			</Theme>
		);
	};
}
