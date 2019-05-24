const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

function queryOneLine(question, handler, next) {
    rl.question(`${question}\n`, function(answer) {
        handler(answer);
        if (next) {
            next();
        }
    });
}

function queryMultipleLines(number_of_line, question, handler, next) {
    let count = 0;
    const lines = [];
    const line_handler = (line) => {
        ++count;
        lines.pushTop(line);
        if (count === number_of_line) {
            rl.removeListener('line', line_handler);
            handler(lines);
            if (next) {
                next();
            }
        }
    };
    console.log(question);
    rl.on('line', line_handler);
}

function closeInput() {
    rl.close();
}

module.exports = {queryOneLine, queryMultipleLines, closeInput};