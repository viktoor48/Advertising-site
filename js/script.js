import {popupCloseHandler, load} from "./utils/index.js";
import {ProductModel} from "./model/product-model.js";
import {ProductListPresenter} from "./presenter/product-list-presenter.js";
import {SortingPresenter} from "./presenter/sorting-presenter.js";
import {FilterPresenter} from "./presenter/filter-presenter.js";

popupCloseHandler();

let productModel = new ProductModel(await load());

//загрузка продуктов
let productListPresenter = new ProductListPresenter(productModel);
let sortingPresenter = new SortingPresenter(productListPresenter);
let filterPresenter = new FilterPresenter(productListPresenter);
productListPresenter.init();


