const {queryOneLine, queryMultipleLines, closeInput} = require('../../commons/input');

let number_of_processes = 0;
let max = [];
let allocation = [];
let available = [];

const handlers = {
    'completed': () => {},
};

function on(tag, callback) {
    handlers[tag] = callback;
}

function start() {
    queryProcessNumber();
}

function queryProcessNumber() {
    queryOneLine('Number of processes:', (answer) => {
        number_of_processes = parseInt(answer);
    }, queryAllocation);
}

function queryAllocation() {
    queryMultipleLines(number_of_processes, 'Allocation matrix:', (lines) => {
        allocation = lines.map(line => line.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number)));
    }, queryMax);
}

function queryMax() {
    queryMultipleLines(number_of_processes, 'Max matrix:', (lines) => {
        max = lines.map(line => line.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number)));
    }, queryAvailable);
}

function queryAvailable() {
    queryOneLine('Available vector:', (answer) => {
        available = answer.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        handlers['completed']({allocation, max, available});
    });
}

module.exports = {on, start, closeInput};