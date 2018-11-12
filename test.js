var socketCount = require('./moja-socket-count');
var expect = require("expect.js");
var events = require('events');
var socket = new events.EventEmitter();

socket.send = (data) => {
  socket.emit('message', data); 
}
socketCount.bandwidth(socket);

describe ("receive msg", () => {
  socket.on('message', function(data){
    expect(data).to.be('abc');
  });
  socket.emit('message', 'abc');
  expect(socket.recvBandwidth).to.be(3);
  socket.removeAllListeners('message');
});

describe ("send msg", () => {
  socket.on('message', function(data){
    expect(data).to.be('efg');
  });
  socket.send('efg');
  expect(socket.sendBandwidth).to.be(3);
  expect(socket.recvBandwidth).to.be(6);
  socket.removeAllListeners('message');
});

describe ("chinese mes", () => {
  socket.on('message', function(data){
    expect(data).to.be("中文");
  });
  socket.send('中文');
  expect(socket.recvBandwidth).to.be(12)
  expect(socket.sendBandwidth).to.be(9)
  socket.removeAllListeners('message');
});
