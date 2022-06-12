const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
};

const validatePhone = (sdt) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(sdt);
};

module.exports = {
    validateEmail, validatePhone
};