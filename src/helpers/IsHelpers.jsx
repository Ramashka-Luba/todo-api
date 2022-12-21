const localStorageGetItem = (value) => {
    return localStorage.getItem(value);
}
// export default localStorageGetItem;

const localStorageSetItem = (key,value) => {
    return localStorage.setItem(key,value);
}
export {localStorageSetItem, localStorageGetItem};