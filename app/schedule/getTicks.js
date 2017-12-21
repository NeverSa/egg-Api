
const Subscription = require('egg').Subscription;
const moment = require('moment');

class GetPrice extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '20s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // 获取某个币种的K线图
  async subscribe() {
    //循环计算
    this.ctx.service.pro.loopbtc() 
    //更新开盘价
    //this.ctx.service.pro.getcloseprice()

   //this.ctx.service.pro.buy()
    console.log("开始定时")
  }
}

module.exports = GetPrice;