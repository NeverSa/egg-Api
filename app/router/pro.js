module.exports = app => {
    app.router.get('/pro/get_all_coin', "pro.index.getallcoin");
    app.router.post('/pro/delete_one_coin', "pro.index.deleteOneCoin");
    app.router.post('/pro/get_one_coin', "pro.index.getOneCoin");
    app.router.post('/pro/edit_one_coin', "pro.index.editOneCoin");
    app.router.post('/pro/add_one_coin', "pro.index.addOneCoin");
   //基础策略币种
   app.router.post('/pro/get_all_tactics', "pro.index.getAllTactics");
   app.router.post('/pro/delete_one_tactics', "pro.index.deleteOneTactics");
   app.router.post('/pro/get_one_tactics', "pro.index.getOneTactics");
   app.router.post('/pro/edit_one_tactics', "pro.index.editOneTactics");
   app.router.post('/pro/add_one_tactics', "pro.index.addOneTactics");
   app.router.post('/pro/updata_able_tactics', "pro.index.updataAbleTactics");
   

  };