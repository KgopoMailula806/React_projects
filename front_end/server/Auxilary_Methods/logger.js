
const EventEmitter = require('events');
// instantiations into memory

var url = 'http://someUrls.domain/log';

class Logger extends EventEmitter{

    //define the methods/ properties
    print( ){
        // handles variable amount of arguments
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
          }
          //Raise signal
        this.emit('messageLogged', {id: 1, url:'http://somename.domain'})
    }
}



//export access of methods or properties to which ever file
module.exports = Logger;
