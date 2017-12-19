
const Subscription = require('egg').Subscription;
const moment = require('moment');

//定时每晚0点执行获取所有币种开盘价
class GetPrice extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // 获取某个币种的K线图
  async subscribe() {
    //this.ctx.service.pro.loopbtc() 
    //写入所有币种
   // this.ctx.service.pro.getallsymbols()
    //更新开盘价
    //this.ctx.service.pro.getcloseprice()
    console.log("开始定时")
  }
}

module.exports = GetPrice;