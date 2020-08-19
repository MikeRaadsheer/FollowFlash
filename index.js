var wpi = require('wiring-pi');
wpi.setup('wpi');
wpi.pinMode(7, wpi.OUTPUT);
                                                                                                                                                                                        const socketToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjJBQjAzRjI5NUY5MERDNDE5MDM5IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiNjAxNzE0MDkifQ.tFvThd__zt0YdOnI8jaUMt1M4-h9Ga4b1GNw8or5nPs";

const io = require('socket.io-client');
const sl = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transport: ['websocket']});

sl.on('connect', ()=> console.log('Connected!'));

sl.on('event', (e)=>{
    if(e.type === "follow"){
        console.log("new follower!");
        run();
    }
});

function run(){
    console.log('7: on');
    wpi.digitalWrite(7, 1);
    wait(5000);
    console.log('7: off');
    wpi.digitalWrite(7, 0);
}

function wait(ms){
    var date = new Date();
    var date2 = null;
    do { date2 = new Date(); }
    while (date2 - date < ms);
}