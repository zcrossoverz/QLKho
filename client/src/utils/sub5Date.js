let sub5date = () => {
    let day = new Date();
    day.setDate(day.getDate() - 5);
    return day;
};

export default sub5date;