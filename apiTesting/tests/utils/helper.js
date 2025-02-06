const fs = require('fs')

function logToFile(message) {
    const logFilePath = 'testLogs.txt'; 
    // fs.writeFileSync(logFilePath, '', 'utf8');
    fs.appendFileSync(logFilePath, message + '\n', 'utf8');
    console.log(message);
}

module.exports = {
    logToFile
}