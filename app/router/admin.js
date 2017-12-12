module.exports = app => {
    app.router.post('/admin/user/login', "admin.user.login");
    app.router.get('/admin/user/get_user_info', "admin.user.getUserInfo");
  };