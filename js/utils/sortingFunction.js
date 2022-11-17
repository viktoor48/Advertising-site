const sortingTabList = document.querySelector('.sorting__order-list');

export function byField(field) {
    return (a,b) => a[field] > b[field] ? 1 : -1;
}

export function sorting(valueTab, products) {
    const itemsTabList = sortingTabList.querySelectorAll('.sorting__order-tab');

    itemsTabList.forEach((item) => {
        if (item.firstElementChild.id == valueTab) {
            item.firstElementChild.checked = true;
        } else {
            item.firstElementChild.checked = false;
        }
    });

    let dataSort = [...products];
    if (valueTab == 'sort-cheap') {
        dataSort = dataSort.sort(byField('price')).reverse();
    }
    if (valueTab == 'sort-new') {
        dataSort = dataSort.sort(byField('publish-date'));
    }

    return dataSort;
}