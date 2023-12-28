export const objectify = (arr, n) => {
    let obj = {};
    for (let i = 0; i < n; i++) {
        obj[`c${i + 1}`] = arr[i];
    }
    return obj;
};

export const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

