import {adaptFilterName, adaptFilterValue} from "../utils/product-adapters.js";
import {preload} from "../utils/image.js";

const GOOD_RATING = 4.8;
const BAD_RATING = 4;

const getSellerClassname = (rating) => {
    if (rating >= GOOD_RATING) {
        return `seller--good`;
    }
    if (rating < BAD_RATING) {
        return `seller--bad`;
    }

    return ``;
};

const filterUndefinedProductFilters = (filters) => Object.keys(filters).filter((key) => filters[key] !== `-`);

const createProductModalTemplate = (product) => `<section class="popup" id="${product.id}">
        <div class="popup__inner">
          <button class="popup__close" type="button" aria-label="Закрыть">
            <svg id="popup__close" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path id="popup__close--path" fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
            </svg>
          </button>
          <div class="popup__date" title="${product.dateString}">${product.dateDifference}</div>
          <h3 class="popup__title">${product.name}</h3>
          <div class="popup__price">${product.price} ₽</div>
          <div class="popup__columns">
            <div class="popup__left">
              <div class="popup__gallery gallery">
                <button class="gallery__favourite fav-add ${product.isFavorite && `fav-add--checked`}">
                  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="gallery__main-pic">
                  <img src="${product.photos[0]}" srcset="${product.photos[0]}" width="520" height="340" alt="${product.name} - основное фото">
                </div>
                <ul class="gallery__list">
                    ${product.photos.map((photo, index) => `<li class="gallery__item">
                    <img src="${photo}" srcset="${photo}" alt="${index}" width="124" height="80" data-photo-index="${index}"/>
                  </li>`).join(``)}                                
                </ul>
              </div>
              <ul class="popup__chars chars">
                ${filterUndefinedProductFilters(product.filters).map((key) => `<li class="chars__item">
                  <div class="chars__name">${adaptFilterName(product.category, key)}</div>
                  <div class="chars__value">${adaptFilterValue(product.category, product.filters[key])}</div>
                </li>`).join(``)}           
              </ul>
              <div class="popup__seller seller ${getSellerClassname(product.seller.rating)}">
                <h3>Продавец</h3>
                <div class="seller__inner">
                  <a class="seller__name" href="#">${product.seller.fullname}</a>
                  <div class="seller__rating"><span>${product.seller.rating}</span></div>
                </div>
              </div>
              <div class="popup__description">
                <h3>Описание товара</h3>
                <p>${product.description}</p>
              </div>
            </div>
            <div class="popup__right">
              <div class="popup__map" id="map" style="width: 268px; height: 200px"></div>
              <div class="popup__address">${product.address.city}, ${product.address.street}, ${product.address.building}</div>
            </div>
          </div>
        </div>
      </section>`;

export class ProductModalView {
    constructor(product) {
        this.product = product;

        this.currentActivePreview = null;
        this.map = null;

        // this.renderMap = this.renderMap.bind(this);
    }

    getTemplate() {
        return createProductModalTemplate(this.product);
    }

    renderMap() {
        const element = document.querySelector(`#map`);
        const {coordinates} = this.product;
        console.log(coordinates);

        let myMap = new ymaps.Map("map", {
            center: [...coordinates],
            controls: ['zoomControl'],
            zoom: 12,
        });

        myMap.geoObjects
            .add(new ymaps.Placemark([...coordinates], {
                balloonContent: `${this.product.address.city}`
            }, {
                preset: 'islands#icon',
                iconColor: '#0095b6'
            }));
    }



    closeModal() {
        this.map.remove();

    }

    mainPhotoClickHandler(evt) {
        if (this.currentActivePreview) {
            this.currentActivePreview.classList.remove(`gallery__item--active`);
        }

        evt.target.parentNode.classList.add(`gallery__item--active`);
        this.currentActivePreview = evt.target.parentNode;

        const {photoIndex} = evt.target.dataset;
        const photo = this.product.photos[photoIndex];

        if (!photo) {
            return;
        }

        const mainImage = document.querySelector(`.gallery__main-pic img`);
        preload(photo, () => {
           mainImage.setAttribute(`src`, photo);
           mainImage.setAttribute(`srcset`, photo);
        });
    }
}