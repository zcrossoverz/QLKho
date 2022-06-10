let timeNow = () => {
    let now = new Date();
    now.toLocaleString('vn-VI', { timeZone: 'Asia/Ho_Chi_Minh' });
    return now.getDate()+'/'+(now.getMonth()+1)+'/'+now.getFullYear()+' '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
}

module.exports = {
    timeNow
};