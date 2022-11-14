export const popupCloseHandler = () => {
    document.addEventListener('click', (evt) => {
        if (evt.target.id == `popup__close` || evt.target.classList == `popup__close` || (evt.target.tagName == `path` && evt.target.id == 'popup__close--path' )) {
            const popup = document.querySelector('.popup');
            document.body.removeChild(popup);
        }
    });
}