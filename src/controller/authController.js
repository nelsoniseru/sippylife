const AuthService = require('../services/authService');
const { registerSchema, loginSchema } = require('../validation/authValidation');

class AuthController {
  static async register(req, res) {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const result = await AuthService.register(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) return res.status(400).json({ success: false, message: error.details[0].message });

      const result = await AuthService.login(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(error.message === 'Invalid credentials' ? 401 : 400)
        .json({ success: false, message: error.message });
    }
  }
}

module.exports = AuthController;