var gpio = require('rpi-gpio');
gpio.setup(7, gpio.DIR_OUT);

const socketToken = "Replace with your own socket token";


const io = require('socket.io-client');
const sl = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transport: ['websocket']});

sl.on('connect', ()=> {
    console.log('Connected!');
    
    setTimeout(()=> {
        gpio.write(7, true, (err)=>{
        if (err) throw err;
        console.log('7: off');
        });
    }, 5000);
});

sl.on('event', (e)=>{
    if(e.type === "follow"){
        console.log("new follower!");
        run();
    }
});

function run(){
    gpio.write(7, false, (err)=>{
        if (err) throw err;
        console.log('7: on');
    });

    setTimeout(()=> {
        gpio.write(7, true, (err)=>{
        if (err) throw err;
        console.log('7: off');
        });
    }, 5000);
}
