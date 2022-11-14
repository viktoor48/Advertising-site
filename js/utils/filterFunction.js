const minValueKeys = ['production-year', 'matrix-resolution', 'screen-size', 'ram-value', 'area', 'supporting'];

const resolutionVideoMap = new Map([
    ["HD", 1],
    ["full-hd", 2],
    ["4K",    3],
    ["5K",    4],
]);



export const filterType = (product, filterListType, key) => {
    let conformity = 0;
    for (const value of filterListType[key]) {
        if (value == 'any') {
            return true;
        }
        if (key == 'categories') {
            if (product.category == value) {
                return true;
            }
        } else {
            if (minValueKeys.includes(key) || (key == 'rooms-count' && value == '5')) {
                if (key == 'supporting') {
                    if (resolutionVideoMap.get(product.filters[key]) >= resolutionVideoMap.get(value)) {
                        conformity++;
                    }
                } else if (product.filters[key] >= value) {
                    conformity++;
                }
            } else if (product.filters[key] == value) {
                conformity++;
            }
        }
    }

    return (conformity > 0) ? true : false;
}

