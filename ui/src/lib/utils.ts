/**
 * Retrieves the HTMLButtonElement from a MouseEvent's target.
 * @param {MouseEvent} event - The mouse event.
 * @returns {HTMLButtonElement} The HTMLButtonElement extracted from the event target.
 */
export const getEventTargetElement = (event: MouseEvent): HTMLButtonElement => {
	return event.target as HTMLButtonElement;
};

/**
 * Returns the value of a specified data attribute from an HTMLButtonElement.
 * @param {string} attribute - The data attribute to retrieve.
 * @returns {(element: HTMLButtonElement) => string | undefined} A function that accepts an HTMLButtonElement and returns the specified data attribute value.
 */
export const getDataSetAttribute =
	(attribute: string) => (element: HTMLButtonElement) =>
		element.dataset[attribute];
