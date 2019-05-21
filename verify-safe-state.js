const {vectorSubtract} = require('./controllers/vector-controller');
const {verifySafeState} = require('./controllers/deadlock-controller');
const verify_safe_state_input = require('./views/verify-safe-state-input');

verify_safe_state_input.on('completed', ({allocation, max, available}) => {
    verify_safe_state_input.closeInput();
    const need = max.map((max_i, i) => vectorSubtract(max_i, allocation[i]));

    console.log("\nNeed matrix:"); 
    console.log(need);

    const {is_safe, safe_sequence} = verifySafeState({available, need, allocation});

    console.log("Safe sequence:\t", safe_sequence);
    console.log("Is safe state:\t", is_safe);
});

verify_safe_state_input.start();