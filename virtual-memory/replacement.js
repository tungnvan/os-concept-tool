const replacement_input = require('./views/replacement-input');
const {FIFOReplacement, optimalReplacement, LRUReplacement} = require('./controllers/page-replacement-controller');

replacement_input.on('completed', ({number_of_frames, request_sequence}) => {
    replacement_input.closeInput();

    console.log('\nFIFO Replacement:');
    const fifo_result = FIFOReplacement(number_of_frames, request_sequence);
    console.log('page_fault: ', fifo_result.page_fault);
    console.log('page_fault_trace: ', fifo_result.page_fault_trace);

    console.log('\nOptimal Replacement:');
    const optimal_result = optimalReplacement(number_of_frames, request_sequence);
    console.log('page_fault: ', optimal_result.page_fault);
    console.log('page_fault_trace: ', optimal_result.page_fault_trace);

    console.log('\nLRU Replacement:');
    const lru_result = LRUReplacement(number_of_frames, request_sequence);
    console.log('page_fault: ', lru_result.page_fault);
    console.log('page_fault_trace: ', lru_result.page_fault_trace);

});

replacement_input.start();