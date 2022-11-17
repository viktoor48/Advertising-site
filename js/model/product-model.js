import {convertStringTimestampToDate, getPublishDateString, getPublishDateDifference, formatPrice, adaptCategory, LocalstorageWrapper} from "../utils/index.js";

export class ProductModel{
     constructor() {
         this.products = [];
         this.localStorage = new LocalstorageWrapper('product');
     }

     setProducts(products) {
         this.products = products.products ? products.products : products;
     }

     getProducts() {
         return this.products;
     }

     changeProduct(id, property, value) {
         this.products.forEach((product) => {
            if (product.id == id) {
                product[property] = value;
            }
         });

         console.log(this.products);
     }

     adaptToClient(products = this.products) {
         return products.map((product, index) => {
            const date = convertStringTimestampToDate(product[`publish-date`]);

            return {
                ...product,
                'id': index + 1,
                'category': adaptCategory(product.category),
                'formatted-price': formatPrice(product.price),
                'dateString': getPublishDateString(date),
                'dateDifference': getPublishDateDifference(date),
                'isFavorite': this.localStorage.getJSON(String(index + 1)) ? true : false,
                date,
            }
         });
     }
}

