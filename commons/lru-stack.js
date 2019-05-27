function LRUStack(maximum_size) {

    const data = [];

    function push(item) {
        const referenced_index = data.indexOf(item);
        let eliminated = null;
        if (referenced_index > -1) {
            data.splice(referenced_index, 1);
        } else if (size() === maximum_size) {
            eliminated = data.splice(0, 1)[0];
        }
        data.push(item);
        return eliminated;
    }

    function size() {
        return data.length;
    }

    return {push, size};

}

module.exports = {LRUStack};