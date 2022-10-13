
export const renderPosition = {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`,
    AFTEREND: `afterend`,
}

export const render = (template, container, place = renderPosition.BEFOREEND) => {
    switch (place) {
        case renderPosition.AFTERBEGIN:
            container.insertAdjacentHTML(renderPosition.AFTERBEGIN, template);
            break;
        case renderPosition.BEFOREEND:
            container.insertAdjacentHTML(renderPosition.BEFOREEND, template);
            break;
        case renderPosition.AFTEREND:
            container.insertAdjacentHTML(renderPosition.AFTEREND, template);
            break;
    }
};