const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const SALT_ROUNDS = 10;

async function registerUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
}

async function loginUser(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return null;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
}

module.exports = {
  registerUser,
  loginUser
};