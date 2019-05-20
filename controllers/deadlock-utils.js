const {vectorAdd, vectorIsLessThanOrEqual} = require('./vector-utils');

function verifySafeState(available, need, allocation) {
    let safe_sequence = [];
    let work = [...available];
    let finish = Array.of(...need).fill(false);
    let i;
    while (i = finish.findIndex((finish_i, i) => (finish_i === false && vectorIsLessThanOrEqual(need[i], work))), i > -1) {
        work = vectorAdd(work, allocation[i]);
        finish[i] = true;
        safe_sequence.push(i);
    };
    return {safe_sequence, is_safe: finish.every(finish_i => finish_i)};
};

module.exports = {verifySafeState};


