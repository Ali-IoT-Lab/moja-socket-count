/**
 * Created by wangguilin/Ali-IoT-Lab on 2018/10/11.
 *
 * Description: 基本方法
 *
 */

"use strict";

module.exports = {
  /* ------- 常用方法 ------- */
  'bandwidth': function (socket) {
    Object.defineProperty(socket, "sendBandwidth", {
      enumerable: false,
      configurable: false,
      writable: true,
      value: "static"
    });
    Object.defineProperty(socket, "recvBandwidth", {
      enumerable: false,
      configurable: false,
      writable: true,
      value: "static"
    });
    socket.sendBandwidth = 0;
    socket.recvBandwidth = 0;
    var origin = socket.send;
    socket.send = (data) => {
      origin.call(socket, data);
      socket.sendBandwidth += Buffer.byteLength(data);
      console.log(data);
      console.log(socket.sendBandwidth);
    }
    socket.on("message", async message => {
      console.log('-------------------------');
      console.log(message);
      socket.recvBandwidth += Buffer.byteLength(message);
      console.log(socket.recvBandwidth);
    });
  }
};