export const getEventTargetElement = (event: MouseEvent): HTMLButtonElement => {
	return event.target as HTMLButtonElement;
};

export const getDataSetAttribute =
	(attribute: string) => (element: HTMLButtonElement) =>
		element.dataset[attribute];
