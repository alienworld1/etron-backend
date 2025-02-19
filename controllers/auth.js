const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const register = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage(
      'A password should have at least 8 characters, one uppercase, one lowercase, one number, and one special character',
    ),
  body('username')
    .isString()
    .isLength({ min: 3, max: 16 })
    .withMessage('Username should have between 3-16 characters')
    .isAlpha()
    .withMessage('Username should contain only alphabetic characters'),
  body('displayName')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Display name should have at least 3 characters'),
  body('walletAddress')
    .isString()
    .isLength({ min: 42, max: 42 })
    .withMessage('Invalid wallet address'),
  asyncHandler(async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array(),
          success: false,
        });
      }

      const { email, password, username, displayName, walletAddress } =
        req.body;

      const userExists = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }, { walletAddress }],
        },
      });
      if (userExists) {
        return res.status(400).json({
          message: 'User already exists',
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          displayName,
          walletAddress,
        },
      });

      return res.json({
        success: true,
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal server error',
        success: false,
      });
    }
  }),
];

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: 'User not found',
      success: false,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: 'Invalid password',
      success: false,
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      walletAddress: user.walletAddress,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' },
  );

  return res.json({ success: true, token });
});

module.exports = { login, register };
