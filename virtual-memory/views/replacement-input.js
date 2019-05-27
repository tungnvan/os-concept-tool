const {queryOneLine, closeInput} = require('../../commons/input');

let number_of_frames = 0;
let request_sequence = [];

const handlers = {
    'completed': () => {},
};

function on(tag, callback) {
    handlers[tag] = callback;
}

function start() {
    queryNumberOfFrames();
}

function queryNumberOfFrames() {
    queryOneLine('Number of frames:', (answer) => {
        number_of_frames = parseInt(answer);
    }, queryRequestSequence);
}

function queryRequestSequence() {
    queryOneLine('Reference string:', (answer) => {
        request_sequence = answer.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        handlers['completed']({number_of_frames, request_sequence});
    });
}

module.exports = {on, start, closeInput};