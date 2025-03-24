const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

// Admin Registration
const registerAdmin = async (req, res) => {
  try {
    const { username, password , email} = req.body;

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const admin = await prisma.admin.create({
      data: { username, password: hashedPassword , email},
    });

    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering admin' });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if admin exists
    const admin = await prisma.admin.findUnique({ where: { username  } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: admin.id, username: admin.username, email:admin.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { registerAdmin, loginAdmin };
