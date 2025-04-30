import prisma from "../config/db.js";

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { name, description, trainerId: userId } = req.body;

    console.log("User id (passed as trainerId) from client:", userId);

    const trainer = await prisma.trainer.findUnique({
      where: { userId: Number(userId) },
    });

    if (!trainer) {
      return res
        .status(400)
        .json({ message: "Trainer not found for the provided userId" });
    }

    const newActivity = await prisma.activity.create({
      data: {
        name,
        description,
        trainerId: trainer.id,
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
      where: { userId: Number(studentId) },
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
        studentId: studentRecord.userId,
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
        activityId: Number(activityId),
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

export const getActivitiesByStudentId = async (req, res) => {
  const { id } = req.params;
  const studentId = id;
  console.log("Student ID in fetching id by actitivy:", studentId);

  if (!studentId) {
    return res.status(400).json({ message: "StudentId is required" });
  }

  try {
    const studentRecord = await prisma.student.findUnique({
      where: { userId: Number(studentId) },
    });

    if (!studentRecord) {
      return res.status(404).json({ message: "Student not found" });
    }

    const activities = await prisma.studentActivity.findMany({
      where: { studentId: studentRecord.id },
      include: {
        activity: true,
      },
    });

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ message: "No activities found for this student" });
    }
    res.status(200).json({
      studentId: studentRecord.id,
      activities: activities.map((activity) => activity.activity),
    });
  } catch (error) {
    console.error("Error fetching activities for student:", error);
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

// Delete activity for a student
export const deleteActivityFromStudent = async (req, res) => {
  const { studentId, activityId } = req.params;

  if (!studentId || !activityId) {
    return res
      .status(400)
      .json({ message: "studentId and activityId are required" });
  }

  try {
    const studentRecord = await prisma.student.findUnique({
      where: { userId: Number(studentId) },
    });

    if (!studentRecord) {
      return res.status(404).json({ message: "Student not found" });
    }

    await prisma.studentActivity.deleteMany({
      where: {
        studentId: studentRecord.id,
        activityId: Number(activityId),
      },
    });

    res.status(200).json({ message: "Activity removed from student" });
  } catch (error) {
    console.error("Error removing activity from student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const assignActivityToTrainer = async (req, res) => {
  const { trainerId, activityId, nationalIdNo } = req.body;

  if (!trainerId || !activityId) {
    return res
      .status(400)
      .json({ message: "trainerId and activityId are required" });
  }

  try {
    const trainer = await prisma.user.findUnique({
      where: { id: Number(trainerId) },
    });

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const trainerRecord = await prisma.trainer.findUnique({
      where: { userId: Number(trainerId) },
    });

    if (!trainerRecord) {
      return res.status(404).json({ message: "Trainer record not found" });
    }

    const activity = await prisma.activity.findUnique({
      where: { id: Number(activityId) },
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // const existingAssignment = await prisma.activity.findFirst({
    //   where: {
    //     trainerId: trainerRecord.id,
    //     id: Number(activityId),
    //   },
    // });

    if (activity?.trainerId && activity.trainerId !== trainerRecord.id) {
      return res
        .status(409)
        .json({ message: "Activity already assigned to a trainer" });
    }

    if (nationalIdNo && trainerRecord.nationalIdNo !== nationalIdNo) {
      await prisma.trainer.update({
        where: { userId: Number(trainerId) },
        data: { nationalIdNo: nationalIdNo },
      });
    }

    await prisma.activity.update({
      where: { id: Number(activityId) },
      data: {
        trainer: {
          connect: { id: trainerRecord.id },
        },
      },
    });

    res
      .status(201)
      .json({ message: "Activity assigned to trainer successfully" });
  } catch (error) {
    console.error("Error assigning activity to trainer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getActivitiesByTrainerId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "TrainerId is required" });
  }

  try {
    const trainer = await prisma.trainer.findUnique({
      where: { userId: Number(id) },
    });

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const activities = await prisma.activity.findMany({
      where: { trainerId: trainer.id },
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getStudentsByTrainerId = async (req, res) => {
  const { userId } = req.query;
  console.log("Trainer UserID:", userId);

  if (!userId) {
    return res.status(400).json({ message: "trainerId is required" });
  }

  try {
    const trainer = await prisma.trainer.findUnique({
      where: { userId: Number(userId) },
    });

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const activities = await prisma.activity.findMany({
      where: { trainerId: trainer.id },
      include: {
        students: {
          include: {
            student: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const allStudents = activities.flatMap((activity) =>
      activity.students.map((sa) => ({
        ...sa.student,
        activity: activity.name,
        activityDate: activity.date,
      }))
    );

    const uniqueStudentsMap = new Map();
    allStudents.forEach((student) => {
      uniqueStudentsMap.set(student.id, student);
    });

    const uniqueStudents = Array.from(uniqueStudentsMap.values());

    res.json(uniqueStudents);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Delete activity for a trainer
export const deleteActivityFromTrainer = async (req, res) => {
  const { trainerId, activityId } = req.params;

  if (!trainerId || !activityId) {
    return res
      .status(400)
      .json({ message: "trainerId and activityId are required" });
  }

  try {
    const trainerRecord = await prisma.trainer.findUnique({
      where: { userId: Number(trainerId) },
    });

    if (!trainerRecord) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    await prisma.activity.update({
      where: {
        id: Number(activityId),
      },
      data: {
        trainerId: null,
      },
    });

    res.status(200).json({ message: "Activity removed from trainer" });
  } catch (error) {
    console.error("Error removing activity from trainer:", error);
    res.status(500).json({ message: "Server error" });
  }
};
