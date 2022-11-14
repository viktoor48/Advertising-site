import {popupCloseHandler} from "./utils/popupCloseHandler.js";

popupCloseHandler();

import {ProductModel} from "./model/product-model.js";
import {load} from "./utils/get-data.js";
import {ProductListPresenter} from "./presenter/product-list-presenter.js";

let productModel = new ProductModel();
productModel.setProducts(await load());

productModel.setProducts(productModel.adaptToClient(productModel.getProducts()));


//загрузка продуктов

let productListPresenter = new ProductListPresenter(productModel);

productListPresenter.init();


