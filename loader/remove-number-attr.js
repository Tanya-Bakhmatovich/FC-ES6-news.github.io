module.exports = function (source) {
    const parsedJson = JSON.parse(source);

    const removeNumberAttr = (obj) => {
        for (let key in obj) {
            console.log(key);
            if (Number(key)) {
                delete obj[key];
            } else {
                const current = obj[key];
                checkAttr(current);
            }
        }
    }

    const checkAttr = (attr) => {
            if (typeof attr === 'object' && !Array.isArray(attr)) {
                removeNumberAttr(attr);
            }
        }

    removeNumberAttr(parsedJson);

    return parsedJson;
};
