module.exports = app => {
    app.router.get('/pro/get_all_coin', "pro.index.getallcoin");
    app.router.post('/pro/delete_one_coin', "pro.index.deleteOneCoin");
    app.router.post('/pro/get_one_coin', "pro.index.getOneCoin");
    app.router.post('/pro/edit_one_coin', "pro.index.editOneCoin");
   
  };