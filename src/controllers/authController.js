const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await authService.registerUser(email, password);

    res.status(201).json({
      id: user.id,
      email: user.email
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const token = await authService.loginUser(email, password);

  if (!token) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ token });
}

module.exports = {
  register,
  login
};