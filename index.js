const {vectorSubtract} = require('./controllers/vector-utils');
const {verifySafeState} = require('./controllers/deadlock-utils');
const deadlock_input = require('./controllers/deadlock-input');

deadlock_input.on('completed', ({allocation, max, available}) => {
    const need = max.map((max_i, i) => vectorSubtract(max_i, allocation[i]))
    console.log("\nNeed matrix:\t", need);
    const {is_safe, safe_sequence} = verifySafeState(available, need, allocation);
    console.log("Safe sequence:\t", safe_sequence);
    console.log("Is safe state:\t", is_safe);
});

deadlock_input.start();