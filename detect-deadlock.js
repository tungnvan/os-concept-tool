const detect_deadlock_input = require('./views/detect-deadlock-input');
const {detectDeadlock} = require('./controllers/deadlock-controller');

detect_deadlock_input.on('completed', ({allocation, request, available}) => {
    detect_deadlock_input.closeInput();
    const {is_deadlock, deadlocked_processes} = detectDeadlock({allocation, request, available});
    console.log('\nDeadlocked processes:\t', deadlocked_processes);
    console.log('Is deadlock:\t\t', is_deadlock);
});

detect_deadlock_input.start();