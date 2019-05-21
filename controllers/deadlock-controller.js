const {vectorAdd, vectorSubtract, vectorIsLessThanOrEqual} = require('./vector-controller');

function verifySafeState({available, need, allocation}) {
    let safe_sequence = [];
    let work = [...available];
    let finish = Array.of(...need).fill(false);
    let i;
    while (i = finish.findIndex((finish_i, i) => (finish_i === false && vectorIsLessThanOrEqual(need[i], work))), i > -1) {
        work = vectorAdd(work, allocation[i]);
        finish[i] = true;
        safe_sequence.push(i);
    }
    return {safe_sequence, is_safe: finish.every(finish_i => finish_i)};
}

function verifyRequestInCurrentState({available, need, allocation, process_index, request}) {
    if (vectorIsLessThanOrEqual(request, need[process_index])) {
        if (vectorIsLessThanOrEqual(request, available)) {
            const new_available = vectorSubtract(available, request);
            const new_allocation = allocation.map((allocation_i, i) => (
                i === process_index
                    ? vectorAdd(allocation_i, request)
                    : allocation_i
            ));
            const new_need = need.map((need_i, i) => (
                i === process_index
                    ? vectorSubtract(need_i, request)
                    : need_i
            ));
            if (verifySafeState({available: new_available, need: new_need, allocation: new_allocation}).is_safe) {
                return {grantable_now: true, reason: ''};
            } else {
                return {grantable_now: false, reason: 'Process must wait, since the new state is not safe'};
            }
        } else {
            return {grantable_now: false, reason: 'Process must wait, since the resources are not available'};
        }
    } else {
        return {grantable_now: false, reason: 'Process has exceeded its maximum claim'};
    }
}

function detectDeadlock(available, request, allocation) {

}

module.exports = {verifySafeState, verifyRequestInCurrentState};


