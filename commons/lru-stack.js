function LRUStack() {

    const data = [];

    function pushTop(item) {
        data.push(item);
    }

    function replaceBottom(new_item) {
        data[0] = new_item;
    }

    function moveToTop(item) {
        const i = data.indexOf(item);
        data.splice(i, 1);
        data[size()] = item;
    }

    function bottom() {
        return data[0];
    }

    function size() {
        return data.length;
    }

    return {pushTop, replaceBottom, moveToTop, bottom, size};

}

module.exports = {LRUStack};