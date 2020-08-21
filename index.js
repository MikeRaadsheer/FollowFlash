var gpio = require('rpi-gpio');
gpio.setup(7, gpio.DIR_OUT);

                                                                                                                                                                                        const socketToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjJBQjAzRjI5NUY5MERDNDE5MDM5IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiNjAxNzE0MDkifQ.tFvThd__zt0YdOnI8jaUMt1M4-h9Ga4b1GNw8or5nPs";

var a = true;

const io = require('socket.io-client');
const sl = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transport: ['websocket']});

sl.on('connect', ()=> {
    console.log('Connected!'); 
    TurnOff();
});

sl.on('event', (e)=>{
    if(e.type === "follow"){
        console.log("new follower!");
        run();
    }
});

function run(){

    TurnOn();
    
    wait(5000);

    TurnOff();
}

function TurnOn(){
    gpio.write(7, true, (err)=>{
        if (err) throw err;
        console.log('7: on');
    });
}

function TurnOff(){
    gpio.write(7, false, (err)=>{
        if (err) throw err;
        console.log('7: off');
    });
}

function wait(ms){
    var date = new Date();
    var date2 = null;
    do { date2 = new Date(); }
    while (date2 - date < ms);
}