import {render} from "../utils/render.js";
import {createProductItemTemplate} from "../view/product-item-view.js";
import {ProductModalView} from "../view/product-modal-view.js";
import {renderPosition} from "../utils/render.js";
import {preload} from "../utils/image.js";
import {LocalstorageWrapper} from "../utils/localstorage-wrapper.js";
import {CategoryType} from "../const.js";
import {createFilterCar} from "../view/filter-car-view.js";
import {createFilterCamera} from "../view/filter-camera-view.js";
import {createFilterEstate} from "../view/filter-estate-view.js";
import {createFilterLaptop} from "../view/filter-laptop-view.js";
import {FilterRangeView} from "../view/filter-all-view.js";
import {filterType} from "../utils/filterFunction.js";

const resultsList = document.querySelector(`.results__list`);
const mainContainer = document.querySelector(`main`);
const localStorage = new LocalstorageWrapper('product');
const btnSortingFavourites = document.querySelector('.sorting__favourites');
const resultsInfoFavourites = document.querySelector('.results__info.favourites');
const sortingTabList = document.querySelector('.sorting__order-list');
const categoriesList = document.querySelector('#categories');
const btnShowFilterResults = document.querySelector('.filter__button');
const resultsInfoEmptyBlock = document.querySelector('.results__info--empty-block');


export class ProductListPresenter {
    constructor(productModel) {
        this.currentCategory = CategoryType.ALL;
        this.productModel = productModel;
        this.products = productModel.products;
        this.filterRangeView = new FilterRangeView(this.getRangePrice());
        btnShowFilterResults.addEventListener('click', this.formFilterHandler.bind(this));
        btnSortingFavourites.addEventListener('click', this.sortingFavourites.bind(this));
        sortingTabList.addEventListener('click', this.sortingTabListHandler.bind(this));
        categoriesList.addEventListener('change', this.filterCategoryHandler.bind(this));
    }

    sortingTabListHandler(evt) {
        evt.preventDefault();
        const valueTab = evt.target.getAttribute('for');
        console.log(this.products);
        let dataSort = [...this.products];
        if (valueTab == 'sort-cheap') {
            dataSort = dataSort.sort(byField('price')).reverse();
        }
        if (valueTab == 'sort-new') {
            dataSort = dataSort.sort(byField('publish-date'));
        }

        this.clearElements();
        this.renderProducts(dataSort);
        this.productClickHandler();
        this.previewPhotoMouseOverHandler();
    }

    formFilterHandler(evt) {
        evt.preventDefault();
        const filterForm = document.filterForm;
        const formData = new FormData(filterForm);
        console.log(Array.from(formData.entries()));
        console.log(Array.from(formData.keys()));

        let data = [...this.products];
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
        console.log(minMax);

        data = data.filter((product) => {
            if (product.price >= minMax[0] && product.price <= minMax[1]) {
                return true;
            } else {
                return false;
            }
        });

        if (data.length == 0) {
            resultsInfoEmptyBlock.classList.remove('hidden');
            this.clearElements();
        } else {
            resultsInfoEmptyBlock.classList.add('hidden');
            this.clearElements();
            this.renderProducts(data);
            this.productClickHandler();
            this.previewPhotoMouseOverHandler();
        }
    }

    renderProducts(products = this.products) {
        for (let i = 0; i < products.length; i++) {
            let currentTemplate = createProductItemTemplate(products[i]);
            render(currentTemplate, resultsList, renderPosition.AFTERBEGIN);
        }
    }

    previewPhotoMouseOverHandler() {
        let resultsItem = document.querySelectorAll(`.results__item`);

        resultsItem.forEach(element => {
            element.addEventListener('mouseover', (evt => {

                if(evt.target.classList == 'product__navigation-column') {
                    const id = element.id;
                    const photoIndex = Number(evt.target.dataset.photoIndex);

                    let photo;

                    for (let product of this.products) {
                        if (product.id == id) {
                            photo = product.photos[photoIndex];
                        }
                    }

                    if(!photo) {
                        return;
                    }

                    const mainImage = element.querySelector(`.product__image img`);
                    preload(photo, () => {
                        mainImage.setAttribute(`src`, photo);
                        mainImage.setAttribute(`srcset`, photo);
                    });
                }
            }));
        });
    }

    productClickHandler() {
        let resultsItem = document.querySelectorAll(`.results__item`);

        resultsItem.forEach(element => {
           element.addEventListener('click', (evt => {
               if (evt.target.classList == 'product__name' || evt.target.classList == 'product__navigation-column') {
                   const id = element.id;
                   let productModalView;

                   for (let product of this.products) {
                       if (product.id == id) {
                           productModalView = new ProductModalView(product);
                       }
                   }
                   const modalTemplate = productModalView.getTemplate();
                   this.renderModalView(modalTemplate);
                   this.popupHandler();
                   ymaps.ready(productModalView.renderMap());
               }

               if (evt.target.id == 'product__favourite--svg' || evt.target.id == 'product__favourite--path') {
                   console.log('click to heart');
                   this.favouriteHandler(element);
               }
           }));
        });
    }

    rangeContainerInit() {
        const filtersBlock = document.querySelector('.filter__category-filters');
        const template = this.filterRangeView.getTemplate();
        render(template, filtersBlock);
        this.filterRangeView.renderSlider();
    }

    getRangePrice() {
        const minMax = [this.products[0].price, this.products[0].price];

        for (const product of this.products) {
            if (minMax[0] > product.price) {
                minMax[0] = product.price;
            }
            if (minMax[1] < product.price) {
                minMax[1] = product.price;
            }
        }

        return minMax;
    }

    favouriteHandler(product) {
        const dataProduct = findProduct(this.products, product.id);
        if (localStorage.getJSON(product.id)) {
            localStorage.delete(product.id);
            this.productModel.changeProduct(product.id, 'isFavorite', false);
            this.products = this.productModel.products;
        } else {
            dataProduct.isFavorite = true;
            console.log(dataProduct);
            localStorage.setJSON(product.id, dataProduct);
            this.productModel.changeProduct(product.id, 'isFavorite', true);
            this.products = this.productModel.products;
        }
    }

    clearElements(container = resultsList) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    sortingFavourites(evt) {
        evt.preventDefault();

        if (evt.currentTarget.classList.contains('active')) {
            resultsInfoFavourites.classList.add('hidden');
            this.clearElements();
            this.renderProducts();
            this.productClickHandler();
            this.previewPhotoMouseOverHandler();
        } else {
            const localStorageSize = localStorage.getSize();

            this.clearElements();

            let productsData = [];

            for (let i = 0; i < localStorageSize; i++) {
                if (window.localStorage.key(i).includes('product')) {
                    productsData.push(localStorage.getJSON(window.localStorage.key(i)));
                }
            }

            if (productsData.length == 0) {
                resultsInfoFavourites.classList.remove('hidden');
            } else {
                this.renderProducts(productsData);
                this.productClickHandler();
                this.previewPhotoMouseOverHandler();
            }
        }
        evt.currentTarget.classList.toggle('active');
    }

    popupHandler() {
        const popup = document.querySelector(`.popup`);
        const galleryList = popup.querySelector(`.gallery__list`);
        const mainPicImg = popup.querySelector(`.gallery__main-pic`).firstElementChild;

        galleryList.addEventListener('click', (evt) => {
            if (evt.target.tagName == `IMG`) {
                const currentUrl = evt.target.src;

                for (let item of galleryList.children) {
                    item.classList.remove('gallery__item--active');
                }

                evt.target.parentNode.classList.add('gallery__item--active');

                preload(currentUrl, () => {
                    mainPicImg.setAttribute(`src`, currentUrl);
                    mainPicImg.setAttribute(`srcset`, currentUrl);
                });
            }
        });

        const btnProductFavorite = popup.querySelector('.gallery__favourite');

        btnProductFavorite.addEventListener('click', (evt) => {
            console.log(evt.currentTarget);
            this.favouriteHandler(popup);
            console.log(popup);
        });
    }

    filterCategoryHandler(evt) {
        this.currentCategory = evt.target.value;
        let productsData = [];

        if (this.currentCategory === CategoryType.ALL) {
            productsData = [...this.products];
        } else {
            for (const product of this.products) {
                if (product.category === this.currentCategory) {
                    productsData.push(product);
                }
            }
        }

        resultsInfoEmptyBlock.classList.add('hidden');
        this.clearElements();
        this.renderProducts(productsData);
        this.productClickHandler();
        this.previewPhotoMouseOverHandler();
        this.renderFilterCategory();
    }

    renderFilterCategory() {
        const filtersBlock = document.querySelector('.filter__category-filters');
        const filterTemplate = this.getCategoryFiltersView();

        this.clearElements(filtersBlock);
        this.filterRangeView.removeElement();

        if (this.currentCategory === CategoryType.ALL) {
            render(filterTemplate, filtersBlock);
            this.filterRangeView.renderSlider();
            return;
        }

        render(this.filterRangeView.getTemplate(), filtersBlock);
        this.filterRangeView.renderSlider();
        render(filterTemplate, filtersBlock);
    }

    getCategoryFiltersView() {
        switch (this.currentCategory) {
            case CategoryType.ALL:
                return this.filterRangeView.getTemplate();
            case CategoryType.ESTATE:
                return createFilterEstate();
            case CategoryType.LAPTOPS:
                return createFilterLaptop();
            case CategoryType.CAMERA:
                return createFilterCamera();
            case CategoryType.CARS:
                return createFilterCar();
            default:
                return this.filterRangeView.getTemplate();
        }
    }

    renderModalView(template) {
        render(template, mainContainer, renderPosition.AFTEREND);
    }

    init() {
        this.renderProducts();
        this.previewPhotoMouseOverHandler();
        this.productClickHandler();
        this.rangeContainerInit();
    }
}

function findProduct(productArray, id) {
    for (let product of productArray) {
        if (product.id == id) {
            return product;
        }
    }
}

function byField(field) {
    return (a,b) => a[field] > b[field] ? 1 : -1;
}