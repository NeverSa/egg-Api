module.exports = app => {
    app.router.post('/admin/user/login', "admin.user.login");
    app.router.get('/admin/log', app.controller.admin.log);
  };