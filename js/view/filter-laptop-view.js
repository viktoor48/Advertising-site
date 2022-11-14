export const createFilterLaptop = (filters) => `<div class="filter__laptop">
                  <fieldset class="filter__type filter__type--laptop">
                    <legend>Тип ноутбука</legend>
                    <ul class="filter__checkboxes-list filter__checkboxes-list--laptop-ram">
                      ${filters.laptop.type.slice().map(object => `<li class="filter__checkboxes-item">
                        <input class="visually-hidden" type="checkbox" name="type" value="${object.value}" id="${object.id}">
                        <label for="${object.id}">${object.name}</label>
                      </li>`).join('')}
                    </ul>
                  </fieldset>
                  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
                    <legend>Минимальный объем оперативной памяти</legend>
                      <ul class="filter__radiobuttons-list">
                        ${filters.laptop.ram.slice().map(object => `<li class="filter__radiobuttons-item">
                          <input class="visually-hidden" type="radio" name="ram-value" value="${object.value}" id="${object.id}" ${object.checked ? 'checked' : ''}>
                          <label for="${object.id}">${object.name}</label>
                        </li>`).join('')}
                      </ul>
                    </fieldset>
                    <fieldset class="filter__radiobuttons filter__radiobuttons--diagonal">
                      <legend>Минимальная диагональ экрана</legend>
                      <ul class="filter__radiobuttons-list">
                        ${filters.laptop.screenSize.slice().map(object => `<li class="filter__radiobuttons-item">
                          <input class="visually-hidden" type="radio" name="screen-size" value="${object.value}" id="${object.id}" ${object.checked ? 'checked' : ''}>
                          <label for="${object.id}">${object.name}<sup>″</sup></label>
                        </li>`).join('')}
                      </ul>
                    </fieldset>
                    <fieldset class="filter__type filter__type--laptop-processor">
                      <legend>Тип процессора</legend>
                      <ul class="filter__checkboxes-list filter__checkboxes-list--laptop-processor">
                        ${filters.laptop.cpu.slice().map(object => `<li class="filter__checkboxes-item">
                          <input class="visually-hidden" type="checkbox" name="cpu-type" value="${object.value}" id="${object.id}">
                          <label for="${object.id}">${object.name}</label>
                        </li>`).join('')}
                      </ul>
                    </fieldset>
                  </div>`;