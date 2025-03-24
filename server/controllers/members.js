const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new member
const createMember = async (req, res) => {
  try {
    const { fullName, age, admissionNo, birthday, class: studentClass, profileImage } = req.body;

    const newMember = await prisma.member.create({
      data: {
        fullName,
        age: parseInt(age), // Ensure age is an integer
        admissionNo,
        birthday: new Date(birthday), // Convert birthday to Date type
        class: studentClass,
        profileImage: profileImage || null, // Optional profile image
      },
    });

    res.status(201).json({ message: 'Member created successfully', member: newMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating member' });
  }
};

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: { activities: true }, // Include related activities
    });
    res.status(200).json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching members' });
  }
};

// Get a single member by ID
const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await prisma.member.findUnique({
      where: { id: parseInt(id) },
      include: { activities: true },
    });

    if (!member) return res.status(404).json({ message: 'Member not found' });

    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching member' });
  }
};

// Update a member
const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, age, admissionNo, birthday, class: studentClass, profileImage } = req.body;

    const updatedMember = await prisma.member.update({
      where: { id: parseInt(id) },
      data: {
        fullName,
        age: parseInt(age),
        admissionNo,
        birthday: new Date(birthday),
        class: studentClass,
        profileImage: profileImage || null,
      },
    });

    res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating member' });
  }
};

// Delete a member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.member.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting member' });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
