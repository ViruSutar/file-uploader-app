class AuthController {
  static async googleLogin(req, res) {
   return res.send("login with google");
  }

  static async login(req, res) {
    return res.render("login");
  }

  static async logout(req, res) {
   req.logout()
   return res.redirect('/')
  }
}

module.exports = AuthController;
