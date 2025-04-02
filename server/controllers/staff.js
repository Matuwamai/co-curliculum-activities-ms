import prisma from "../config/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Register Staff
export const registerStaff = async (req, res) => {
  try {
    const { fullName, email, password} = req.body;

    // Check if admin already exists
    const existingUser = await prisma.staff.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.staff.create({
      data: { fullName, password: hashedPassword , email},
    });

    res.status(201).json({ message: 'Staff registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering admin' });
  }
};

// Login Staff
export const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const user = await prisma.staff.findUnique({ where: { email  } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.username }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
