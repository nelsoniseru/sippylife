const jwt = require('jsonwebtoken');
const User = require('../models/user');

class AuthService {
  static async register({ username, password, role }) {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('Username already exists');

    const user = new User({ username, password, role });
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET);
    return { user: { id: user._id, username, role }, token };
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.SECRET,
      { expiresIn:process.env.EXPIRE_IN }
    );
    return { user: { id: user._id, username, role:user.role }, token };
  }
}

module.exports = AuthService;