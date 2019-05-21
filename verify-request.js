const {verifyRequestInCurrentState} = require('./controllers/deadlock-controller');
const {vectorSubtract} = require('./controllers/vector-controller');
const verify_request_input = require('./views/verify-request-input');

verify_request_input.on('completed', ({allocation, max, available, process_index, request}) => {
    verify_request_input.closeInput();
    const need = max.map((max_i, i) => vectorSubtract(max_i, allocation[i]));

    console.log("\nNeed matrix:");
    console.log(need);

    const {grantable_now, reason} = verifyRequestInCurrentState({available, need, allocation, process_index, request});

    console.log("Is grantable:\t", grantable_now);
    console.log("Reason:\t", reason);
});

verify_request_input.start();