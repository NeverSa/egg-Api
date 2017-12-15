module.exports = app => {
    app.router.post('/admin/user/login', "admin.user.login");
    app.router.post('/admin/user/get_user_info', "admin.user.getUserInfo");
    app.router.post('/admin/user/get_user_list', "admin.user.getUserList");
  };