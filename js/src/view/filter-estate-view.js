export const createFilterEstate = () => `<div class="filter__estate">
                  <fieldset class="filter__type filter__type--estate">
                    <legend>Тип недвижимости</legend>
                    <ul class="filter__checkboxes-list filter__checkboxes-list--estate">
                      <li class="filter__checkboxes-item">
                        <input class="visually-hidden" type="checkbox" name="type" value="house" id="house">
                        <label for="house">Дом</label>
                      </li>
                      <li class="filter__checkboxes-item">
                        <input class="visually-hidden" type="checkbox" name="type" value="flat" id="flat">
                        <label for="flat">Квартира</label>
                      </li>
                      <li class="filter__checkboxes-item">
                        <input class="visually-hidden" type="checkbox" name="type" value="apartment" id="apartments">
                        <label for="apartments">Апартаменты</label>
                      </li>
                    </ul>
                  </fieldset>
                  <div class="filter__min-square">
                    <label for="square">Минимальная площать, м<sup>2</sup></label>
                    <input type="number" id="square" name="area" min="1" value="0" placeholder="0">
                  </div>
                  <fieldset class="filter__radiobuttons filter__radiobuttons--ram">
                    <legend>Количество комнат</legend>
                    <ul class="filter__ram-list">
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="any" checked id="any_room">
                        <label for="any_room">Любое</label>
                      </li>
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="1" id="one">
                        <label for="one">1</label>
                      </li>
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="2" id="two">
                        <label for="two">2</label>
                      </li>
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="3" id="three">
                        <label for="three">3</label>
                      </li>
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="4" id="four">
                        <label for="four">4</label>
                      </li>
                      <li class="filter__radiobuttons-item">
                        <input class="visually-hidden" type="radio" name="rooms-count" value="5" id="fivemore">
                        <label for="fivemore">5+</label>
                      </li>
                    </ul>
                  </fieldset>
                </div>`;