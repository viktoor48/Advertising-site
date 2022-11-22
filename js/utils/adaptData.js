import {convertStringTimestampToDate, getPublishDateDifference, getPublishDateString} from "./date.js";
import {adaptCategory, formatPrice} from "./product-adapters.js";

export function adaptToClient(products = this.products, localStorage) {
    return products.map((product, index) => {
        const date = convertStringTimestampToDate(product[`publish-date`]);

        return {
            ...product,
            'id': index + 1,
            'category': adaptCategory(product.category),
            'formatted-price': formatPrice(product.price),
            'dateString': getPublishDateString(date),
            'dateDifference': getPublishDateDifference(date),
            'isFavorite': localStorage.getJSON(String(index + 1)) ? true : false,
            date,
        }
    });
}