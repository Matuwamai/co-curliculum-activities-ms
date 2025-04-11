import prisma from "../config/db.js";

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newActivity = await prisma.activity.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json({
      message: "Activity created successfully",
      activity: newActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating activity" });
  }
};

export const getAllActivities = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: { students: true },
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching activities" });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id: parseInt(id) },
      include: { students: true },
    });

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.status(200).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching activity" });
  }
};

export const updateActivity = async (req, res) => {
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

    res.status(200).json({
      message: "Activity updated successfully",
      activity: updatedActivity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating activity" });
  }
};

// Assign an existing activity to an existing student
export const assignActivityToStudent = async (req, res) => {
  const { studentId, activityId } = req.body;
  if (!studentId || !activityId) {
    return res
      .status(400)
      .json({ message: "studentId and activityId are required" });
  }

  try {
    const student = await prisma.user.findUnique({
      where: { id: Number(studentId) },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentRecord = await prisma.student.findUnique({
      where: { userId: student.id },
    });

    if (!studentRecord) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const activity = await prisma.activity.findUnique({
      where: { id: Number(activityId) },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const existingAssignment = await prisma.studentActivity.findFirst({
      where: {
        studentId: studentRecord.id,
        activityId: activity.id,
      },
    });

    if (existingAssignment) {
      return res
        .status(409)
        .json({ message: "Activity already assigned to this student" });
    }

    await prisma.studentActivity.create({
      data: {
        studentId: studentRecord.id,
        activityId: activity.id,
      },
    });

    res
      .status(201)
      .json({ message: "Activity assigned to student successfully" });
  } catch (error) {
    console.error("Error assigning activity to student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting activity" });
  }
};
