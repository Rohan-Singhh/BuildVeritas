const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');

// Registration
router.post('/register', async (req, res) => {
  const { email, password, name, role, company_id } = req.body;
  try {
    if (!email || !password || !name || !role)
      return res.status(400).json({ msg: 'Missing required fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      company_id: company_id || null
    });

    const token = jwt.sign(
      { id: user._id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

// Protected: Get your own profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error: ' + err.message });
  }
});

module.exports = router;
