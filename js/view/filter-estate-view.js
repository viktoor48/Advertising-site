export const createFilterEstate = (filters) => `<div class="filter__estate">
                  <fieldset class="filter__type filter__type--estate">
                    <legend>Тип недвижимости</legend>
                    <ul class="filter__checkboxes-list filter__checkboxes-list--estate">
                      ${filters.estate.type.slice().map(object => `<li class="filter__checkboxes-item">
                        <input class="visually-hidden" type="checkbox" name="type" value="${object.value}" id="${object.id}">
                        <label for="${object.id}">${object.name}</label>
                      </li>`).join('')}
                    </ul>
                  </fieldset>
                  <div class="filter__min-square">
                    <label for="square">Минимальная площать, м<sup>2</sup></label>
                    <input type="number" id="square" name="area" min="1" value="0" placeholder="0">
                  </div>
                  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
                    <legend>Количество комнат</legend>
                    <ul class="filter__ram-list">
                      ${filters.estate.roomsCount.slice().map(object => `<li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="${object.value}" ${object.checked ? 'checked' : ''} id="${object.id}">
                        <label for="${object.id}">${object.name}</label>
                      </li>`).join('')}
                    </ul>
                  </fieldset>
                </div>`;