const createRangeFilterTemplate = () => `<div class="filter__range">
  <label for="range">Цена, ₽</label>
  <div class="rs-tooltip-container"><div class="rs-tooltip">от <span class="rs-tooltip__value"></span></div><div class="rs-tooltip">до <span class="rs-tooltip__value"></span></div></div>
  <div class="filter__slider" id="slider" ></div>
</div>`;

export class FilterRangeView {
    constructor(priceRange) {
        this.priceRange = priceRange;
    }

    setPriceRange(priceRange) {
        this.priceRange = priceRange;
    }

    getPriceRange() {
        return this.priceRange;
    }

    getTemplate() {
        return createRangeFilterTemplate();
    }

    removeElement() {
        this.range.destroy();
    }

    renderSlider() {
        const slider = document.getElementById('slider');
        const labels = document.querySelectorAll('.rs-tooltip .rs-tooltip__value');

        this.range = noUiSlider.create(slider, {
            start: this.priceRange,
            connect: true,
            step: 1000,
            range: {
                'min': this.priceRange[0],
                'max': this.priceRange[1]
            }
        });

        slider.noUiSlider.on('update', function (values, handle) {
            labels[handle].innerHTML = (handle == 1) ? `${Math.round(values[handle])}` : `${Math.round(values[handle])}`;
        });
    }
}

