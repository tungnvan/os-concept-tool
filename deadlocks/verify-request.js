const {verifyRequestInCurrentState} = require('./controllers/deadlock-controller');
const {vectorSubtract} = require('../commons/vector');
const verify_request_input = require('./views/verify-request-input');

verify_request_input.on('completed', ({allocation, max, available, process_index, request}) => {
    verify_request_input.closeInput();
    const need = max.map((max_i, i) => vectorSubtract(max_i, allocation[i]));

    console.log("\nNeed matrix:");
    console.log(need);

    const {grantable_now, reason} = verifyRequestInCurrentState({available, need, allocation, process_index, request});

    console.log("Reason:\t\t", reason);
    console.log("Is grantable:\t", grantable_now);
});

verify_request_input.start();