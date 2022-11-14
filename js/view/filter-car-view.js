export const createFilterCar = (filters) => `<div class="filter__car">
                    <div class="filter__select-wrapper">
                      <label for="resolution-video">Минимальный год выпуска</label>
                      <select id="car_year" name="production-year">
                        ${filters.car.productionYear.slice().map(object => `<option value="${object.value}" ${object.selected ? 'selected' : ''}>${object.name}</option>`).join('')}
                      </select>
                      <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" />
                      </svg>
                    </div>
                    <fieldset class="filter__radiobuttons filter__radiobuttons--transmission">
                      <legend>Коробка передач</legend>
                      <ul class="filter__radiobuttons-list">
                        ${filters.car.transmission.slice().map(object => `<li class="filter__radiobuttons-item">
                          <input class="visually-hidden" type="radio" name="transmission" value="${object.value}" id="${object.id}" ${object.checked ? 'checked' : ''}>
                          <label for="${object.id}">${object.name}</label>
                        </li>`).join('')}
                      </ul>
                    </fieldset>
                    <fieldset class="filter__type filter__type--car-body">
                      <legend>Тип кузова</legend>
                      <ul class="filter__checkboxes-list filter__checkboxes-list--car-body">
                        ${filters.car.bodyType.slice().map(object => `<li class="filter__checkboxes-item">
                          <input class="visually-hidden" type="checkbox" name="body-type" value="${object.value}" id="${object.id}">
                          <label for="${object.id}">${object.name}</label>
                        </li>`).join('')}
                      </ul>
                    </fieldset>
                  </div>`;