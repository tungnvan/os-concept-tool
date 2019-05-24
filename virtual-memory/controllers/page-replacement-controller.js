const {queue} = require('../../commons/queue');
const {LRUStack} = require('../../commons/lru-stack');

const frames = 4;
const requests = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];

function furthestUsePageIndex(current_frame_data, rest_request_sequence) {
    let furthest_distance = 0;
    let frame_distances = current_frame_data.map(page => (
        (furthest_distance = rest_request_sequence.lastIndexOf(page), furthest_distance === -1)
            ? Infinity
            : furthest_distance
    ));
    return frame_distances.indexOf(Math.max(...frame_distances));
}

function FIFOReplacement(number_of_frames, request_sequence) {
    let frame_data = new Array(number_of_frames).fill(null);
    let page_fault_trace = Array.from(request_sequence).fill(null);
    let page_fault_count = 0;
    let fifo_queue = queue();
    let null_index;
    request_sequence.forEach((request, i) => {
        if (frame_data.includes(request)) {
            console.log(request, frame_data);
        } else {
            ++page_fault_count;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? frame_data.indexOf(fifo_queue.dequeue())
                : null_index;
            frame_data[replacement_index] = request;
            page_fault_trace[i] = request;
            fifo_queue.enqueue(request);
            console.log(request, frame_data);
        }
    });
    return {page_fault: page_fault_count, page_fault_trace};
}

function optimalReplacement(number_of_frames, request_sequence) {
    let frame_data = new Array(number_of_frames).fill(null);
    let page_fault_trace = Array.from(request_sequence).fill(null);
    let page_fault_count = 0;
    let null_index;
    request_sequence.forEach((request, i) => {
        if (frame_data.includes(request)) {
            console.log(request, frame_data);
        } else {
            ++page_fault_count;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? furthestUsePageIndex(frame_data, request_sequence.slice(i + 1))
                : null_index;
            frame_data[replacement_index] = request;
            page_fault_trace[i] = request;
            console.log(request, frame_data);
        }
    });
    return {page_fault: page_fault_count, page_fault_trace};
}

function LRUReplacement(number_of_frames, request_sequence) {
    let frame_data = new Array(number_of_frames).fill(null);
    let page_fault_trace = Array.from(request_sequence).fill(null);
    let page_fault_count = 0;
    let lru_stack = LRUStack();
    let modify_stack_method = '';
    let null_index;
    request_sequence.forEach((request, i) => {
        if (frame_data.includes(request)) {
            lru_stack.moveToTop(request);
            console.log(request, frame_data);
        } else {
            ++page_fault_count;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? (modify_stack_method = 'replaceBottom', frame_data.indexOf(lru_stack.bottom()))
                : (modify_stack_method = 'pushTop', null_index);
            frame_data[replacement_index] = request;
            page_fault_trace[i] = request;
            lru_stack[modify_stack_method](request);
            console.log(request, frame_data);
        }
    });
    return {page_fault: page_fault_count, page_fault_trace};
}

const {page_fault, page_fault_trace} = LRUReplacement(frames, requests);
console.log("\npage_fault: ", page_fault);
console.log("page_fault_trace: ", page_fault_trace);