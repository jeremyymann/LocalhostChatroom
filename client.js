var socket = require('socket.io-client')('http://IPADDRESS');
const repl = require('repl')
const chalk = require('chalk');
var username = null

socket.on('disconnect', function() {
    socket.send({username})
    socket.emit('disconnect')
});

socket.on('connect', () => {
    console.log(chalk.red('=== start chatting ==='))
    username = process.argv[2]
    socket.send({username})
})

socket.on('message', (data) => {
    const { cmd, username } = data
    if (cmd != null) {
        console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
    } else {
        console.log(chalk.blue(username + " has connected"))
    }
})

repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send({ cmd, username })
    }
})
