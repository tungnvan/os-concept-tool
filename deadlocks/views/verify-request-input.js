const verify_safe_state_input = require('./verify-safe-state-input');
const {queryOneLine, closeInput} = require('../../commons/input');

let process_index = 0;
let request = [];

const handlers = {
    'completed': () => {},
};

function on(tag, callback) {
    handlers[tag] = callback;
}

function start() {
    verify_safe_state_input.start();
}

function queryProcessIndex() {
    queryOneLine('Process index (i):', (answer) => {
        process_index = parseInt(answer);
    }, queryRequest);
}

function queryRequest() {
    queryOneLine('Request of process i:', (answer) => {
        request = answer.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        handlers.completed({process_index, request});
    });
}

verify_safe_state_input.on('completed', ({allocation, max, available}) => {
    const old_handler_completed = handlers.completed;
    handlers.completed = ({process_index, request}) => old_handler_completed({allocation, max, available, process_index, request});
    queryProcessIndex();
});

module.exports = {on, start, closeInput};
