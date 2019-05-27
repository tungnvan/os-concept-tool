function queue() {

    const data = [];

    function enqueue(item) {
        data.push(item);
    }

    function dequeue() {
        return data.splice(0, 1)[0];
    }

    function front() {
        return data[0];
    }

    function size() {
        return data.length;
    }

    return {enqueue, dequeue, front, size};
}

module.exports = {queue};