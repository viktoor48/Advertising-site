import {NAVIGATION_PHOTOS_COUNT} from "../const.js";


export const createProductItemTemplate = (product) => `<li class="results__item product" id="${product.id}">
                    <button class="product__favourite fav-add ${product.isFavorite && `fav-add--checked`}" type="button" aria-label="Добавить в избранное" id="add-to-favorite">
                      <svg class="product__favourite--svg" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="product__favourite--path" fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                      </svg>
                    </button>
                    <div class="product__image">
                      <div class="product__image-navigation">
                            ${product.photos.slice(0, NAVIGATION_PHOTOS_COUNT).map((photo, index) => `<div class="product__navigation-column" data-photo-index="${index}">
                                <span></span>
                              </div>`).join(``)}
                      </div>
                      <div class="product__image-more-photo hidden"></div>
                      <img src="${product.photos[0]}" srcset="${product.photos[0]} 2x" width="318" height="220" alt="${product.name}">
                    </div>
                    <div class="product__content">
                      <h3 class="product__title">
                        <a href="#" class="product__name">${product.name}</a>
                      </h3>
                      <div class="product__price">${product['formatted-price']} ₽</div>
                      <div class="product__address">${product.address.city}, ${product.address.street}</div>
                      <div class="product__date" title="${product.dateString}">${product.dateDifference}</div>
                    </div>
                  </li>`;





