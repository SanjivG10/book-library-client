
export const getUniqueItemsByKey = (items, key = "id") => {
    const arrayUniqueByKey = [...new Map(items.map(item =>
        [item[key], item])).values()];
    return arrayUniqueByKey;
}