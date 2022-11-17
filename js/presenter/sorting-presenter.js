import {sorting} from "../utils/index.js";

const sortingTabList = document.querySelector('.sorting__order-list');

export class SortingPresenter {
    constructor(productListPresenter) {
        this.productListPresenter = productListPresenter;
        sortingTabList.addEventListener('click', this.sortingTabListHandler.bind(this));
    }

    sortingTabListHandler(evt) {
        evt.preventDefault();
        const valueTab = evt.target.getAttribute('for');
        this.productListPresenter.currentFilter = valueTab;
        const dataSort = sorting(this.productListPresenter.currentFilter, this.productListPresenter.outputListProducts);

        this.productListPresenter.clearElements();
        this.productListPresenter.renderProducts(dataSort);
        this.productListPresenter.productClickHandler();
        this.productListPresenter.previewPhotoMouseOverHandler();
    }
}