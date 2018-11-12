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
    socket.sendBandwidth = 0;
    socket.recvBandwidth = 0;
    var origin = socket.send;
    socket.send = (data) => {
      origin.call(socket, data);
      socket.sendBandwidth += Buffer.byteLength(data);
    }
    var originOn = socket.on;
    socket.on = (event, callback) => {
      originOn.call(socket,event, (data) => {
        callback(data)
        if (event == 'message'){
          socket.recvBandwidth += Buffer.byteLength(data);
        }
      });
    }
  }
}
