import {filterType, sorting} from "../utils/index.js";
import {CategoryType} from "../const.js";

const categoriesList = document.querySelector('#categories');//
const btnShowFilterResults = document.querySelector('.filter__button');//
const resultsInfoEmptyBlock = document.querySelector('.results__info--empty-block');

export class FilterPresenter {
    constructor(productListPresenter) {
        this.productListPresenter = productListPresenter;
        btnShowFilterResults.addEventListener('click', this.formFilterHandler.bind(this));
        categoriesList.addEventListener('change', this.filterCategoryHandler.bind(this));
    }

    formFilterHandler(evt) {
        evt.preventDefault();
        const filterForm = document.filterForm;
        const formData = new FormData(filterForm);

        let data = [...this.productListPresenter.products];
        let keys = Array.from(formData.keys());
        let filterListType = {};
        for (const key of keys) {
            const typeList = formData.getAll(key);
            filterListType[key] = typeList;
        }

        data = data.filter((product) => {
            for (const key in filterListType) {
                let result = filterType(product, filterListType, key);
                if (result == false) {
                    return false;
                }
            }

            return true;
        });

        const labels = document.querySelectorAll('.rs-tooltip .rs-tooltip__value');
        const minMax = [Number(labels[0].textContent), Number(labels[1].textContent)];

        data = data.filter((product) => {
            if (product.price >= minMax[0] && product.price <= minMax[1]) {
                return true;
            } else {
                return false;
            }
        });

        data = sorting(this.productListPresenter.currentFilter, data);
        this.productListPresenter.outputListProducts = data;

        if (data.length == 0) {
            resultsInfoEmptyBlock.classList.remove('hidden');
            this.productListPresenter.clearElements();
        } else {
            resultsInfoEmptyBlock.classList.add('hidden');
            this.productListPresenter.clearElements();
            this.productListPresenter.renderProducts(data);
            this.productListPresenter.productClickHandler();
            this.productListPresenter.previewPhotoMouseOverHandler();
        }
    }

    filterCategoryHandler(evt) {
        this.productListPresenter.currentCategory = evt.target.value;
        let productsData = [];

        if (this.productListPresenter.currentCategory === CategoryType.ALL) {
            productsData = [...this.productListPresenter.products];
        } else {
            for (const product of this.productListPresenter.products) {
                if (product.category === this.productListPresenter.currentCategory) {
                    productsData.push(product);
                }
            }
        }

        productsData = sorting(this.productListPresenter.currentFilter, productsData);

        this.productListPresenter.outputListProducts = [...productsData];
        const priceMinMax = this.productListPresenter.getRangePrice(this.productListPresenter.outputListProducts);
        this.productListPresenter.filterRangeView.setPriceRange(priceMinMax);

        resultsInfoEmptyBlock.classList.add('hidden');
        this.productListPresenter.clearElements();
        this.productListPresenter.renderProducts(this.productListPresenter.outputListProducts);
        this.productListPresenter.productClickHandler();
        this.productListPresenter.previewPhotoMouseOverHandler();
        this.productListPresenter.renderFilterCategory();
    }
}