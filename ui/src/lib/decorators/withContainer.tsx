import React from 'react';

export type ContainerProps = {
	containerWidth?: number;
};

export function withContainer<P extends object>(
	WrappedComponent: React.ComponentType<P & ContainerProps>,
	defaultWidth = 200
) {
	const EnhancedComponent: React.FC<P & ContainerProps> = (props) => {
		const { containerWidth = defaultWidth, ...restProps } = props;
		return (
			<div style={{ width: `${containerWidth}px` }}>
				<WrappedComponent {...(restProps as P)} />
			</div>
		);
	};

	const displayName =
		WrappedComponent.displayName || WrappedComponent.name || 'Component';
	EnhancedComponent.displayName = `withContainer(${displayName})`;

	return EnhancedComponent;
}
