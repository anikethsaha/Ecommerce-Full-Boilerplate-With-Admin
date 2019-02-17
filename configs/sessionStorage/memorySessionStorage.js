var   session = require('express-session')

// for express 4.0+
var MemoryStore = require('session-memory-store')(session);

const options = {
    expires : 60 * 60 * 24
}


module.exports = {
    store :new MemoryStore(options)
}