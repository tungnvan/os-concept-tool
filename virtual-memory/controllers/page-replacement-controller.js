const {queue} = require('../../commons/queue');
const {LRUStack} = require('../../commons/lru-stack');

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
            page_fault_trace[i] = request;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? frame_data.indexOf(fifo_queue.dequeue())
                : null_index;
            frame_data[replacement_index] = request;
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
            page_fault_trace[i] = request;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? furthestUsePageIndex(frame_data, request_sequence.slice(i + 1))
                : null_index;
            frame_data[replacement_index] = request;
            console.log(request, frame_data);
        }
    });
    return {page_fault: page_fault_count, page_fault_trace};
}

function LRUReplacement(number_of_frames, request_sequence) {
    let frame_data = new Array(number_of_frames).fill(null);
    let page_fault_trace = Array.from(request_sequence).fill(null);
    let page_fault_count = 0;
    let lru_stack = LRUStack(number_of_frames);
    let null_index;
    request_sequence.forEach((request, i) => {
        if (frame_data.includes(request)) {
            lru_stack.push(request);
            console.log(request, frame_data);
        } else {
            ++page_fault_count;
            page_fault_trace[i] = request;
            const replacement_index = (null_index = frame_data.indexOf(null), null_index === -1)
                ? frame_data.indexOf(lru_stack.push(request))
                : (lru_stack.push(request), null_index);
            if (replacement_index > -1) {
                frame_data[replacement_index] = request;
            }
            console.log(request, frame_data);
        }
    });
    return {page_fault: page_fault_count, page_fault_trace};
}

module.exports = {FIFOReplacement, optimalReplacement, LRUReplacement};