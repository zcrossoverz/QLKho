const sliceArray = (arr,num) => {
    return new Array(Math.ceil(arr.length / num))
    .fill()
    .map(_ => arr.splice(0, num));
};

export default sliceArray;