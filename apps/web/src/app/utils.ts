export const getEventTargetElement = (event: MouseEvent): HTMLButtonElement => {
    return event.target as HTMLButtonElement;
}

export const getDataSetAttribute =
    (attribute: string) => (element: HTMLButtonElement) =>
        element.dataset[attribute];


export const delay = (ms = 500): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}