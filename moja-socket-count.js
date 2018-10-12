/**
 * Created by wangguilin/Ali-IoT-Lab on 2018/10/11.
 *
 * Description: websocket 连接带宽流量统计
 *
 */

"use strict";

var bandwidthApi = require("./lib/bandwidth");

module.exports = {
  "bandwidth" : bandwidthApi.bandwidth,
};
