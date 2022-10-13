import {popupCloseHandler} from "./src/utils/popupCloseHandler.js";

// var mySlider = new rSlider({
//     target: '#range',
//     values: [10000, 1000000],
//     step: 10000,
//     range: true,
//     tooltip: true,
//     scale: false,
//     labels: false,
//     disabled: '',
// });

popupCloseHandler();

import {ProductModel} from "./src/model/product-model.js";
import {load} from "./src/model/get-data-model.js";
import {ProductListPresenter} from "./src/presenter/product-list-presenter.js";

let productModel = new ProductModel();
productModel.setProducts(await load());

productModel.setProducts(productModel.adaptToClient(productModel.getProducts()));


//загрузка продуктов

let productListPresenter = new ProductListPresenter(productModel);

productListPresenter.init();


