const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newActivity = await prisma.activity.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({ message: 'Activity created successfully', activity: newActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating activity' });
  }
};

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: { members: true }, // Include related members
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activities' });
  }
};

// Get a single activity by ID
const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
      include: { members: true }, // Include members enrolled in this activity
    });

    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching activity' });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedActivity = await prisma.activity.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
      },
    });

    res.status(200).json({ message: 'Activity updated successfully', activity: updatedActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating activity' });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting activity' });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
