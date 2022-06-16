let currentcyFormat = (num) => {
 return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num*1000);
};

export default currentcyFormat;