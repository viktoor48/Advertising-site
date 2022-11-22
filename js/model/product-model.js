import {LocalstorageWrapper, adaptToClient} from "../utils/index.js";

export class ProductModel{
     constructor(data) {
         this.products = [];
         this.localStorage = new LocalstorageWrapper('product');
         this.setProducts(data);
         this.setProducts(adaptToClient(this.getProducts(), this.localStorage));
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
}

