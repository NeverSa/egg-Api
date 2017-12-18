const Subscription = require('egg').Subscription;
const sigin =require("../middleware/sign");
const moment = require('moment');
const option={
  
}
class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // 获取某个币种的K线图
  async subscribe() {
    const option={
      apihost:"/v1s",
      methods:"GET", 
      Timestamp:moment.utc().format('YYYY-MM-DDTHH:mm:ss')||"",
      body:{},
      prams:{},
    }
    this.app.sigin(option)
    const res = await this.ctx.curl('http://www.api.com/cache', {
    });
    this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;