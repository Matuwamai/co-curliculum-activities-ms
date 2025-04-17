import prisma from "../config/db.js";

// Create a new schedule
export const createSchedule = async (req, res) => {
  try {
    const { activityId, day, startTime, endTime } = req.body;

    const schedule = await prisma.schedule.create({
      data: {
        activityId,
        day,
        startTime,
        endTime,
      },
    });
    res.status(201).json(schedule);
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all schedules
export const getSchedules = async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany({
      include: {
        activity: {
          include: {
            trainer: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    const formatted = schedules.map((schedule) => ({
      id: schedule.id,
      activityName: schedule.activity.name,
      trainerName: schedule.activity.trainer?.user?.fullName || "N/A",
      day: schedule.day,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
