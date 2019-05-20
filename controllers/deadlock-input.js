const readline = require('readline');

let number_of_processes = 0;
let max = [];
let allocation = [];
let available = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

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
    rl.question('Number of processes:\n', function(answer) {
        number_of_processes = parseInt(answer);
        queryAllocation();
    });
}

function queryAllocation() {
    let i = 0;
    let allocation_handler = (line) => {
        ++i;
        const allocation_line = line.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        allocation.push(allocation_line);
        if (i === number_of_processes) {
            rl.removeListener('line', allocation_handler);
            queryMax();
        }
    };
    console.log('Allocation matrix:');
    rl.on('line', allocation_handler);
}

function queryMax() {
    let i = 0;
    let max_handler = (line) => {
        ++i;
        const max_line = line.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        max.push(max_line);
        if (i === number_of_processes) {
            rl.removeListener('line', max_handler);
            queryAvailable();
        }
    }
    console.log('Max matrix:');
    rl.on('line', max_handler);
}

function queryAvailable() {
    let available_handler = (line) => {
        available = line.replace(/\s\s+/g, ' ').split(' ').map(number => parseInt(number));
        rl.close();
        handlers['completed']({allocation, max, available});
    }
    console.log('Available vector:');
    rl.on('line', available_handler);
}

module.exports = {on, start};