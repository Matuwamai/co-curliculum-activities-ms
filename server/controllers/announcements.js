import prisma from "../config/db.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { activityId, userId, title, announcement } = req.body;

    console.log("user id in comments:", userId);

    const trainer = await prisma.trainer.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    console.log("Trainer ID in ocmments:", trainer);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const newAnnouncement = await prisma.announcement.create({
      data: {
        activityId: parseInt(activityId, 10),

        trainerId: trainer.id,
        announcement,
        title,
      },
    });

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnnouncementsByActivityId = async (req, res) => {
  try {
    const { activityId } = req.params;
    const parsedActivityId = parseInt(activityId, 10);

    const announcements = await prisma.announcement.findMany({
      where: { activityId: parsedActivityId },
      include: {
        activity: true,
        trainer: {
          select: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
    if (announcements.length === 0) {
      return res.status(404).json({ message: "No announcement found" });
    }
    const fullName = announcements[0].trainer.user.fullName;
    console.log(
      "Fetched fullname in announcement:",
      announcements[0].trainer.user.fullName
    );

    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id, 10);

    const deletedComment = await prisma.comment.delete({
      where: { id: parsedId },
    });

    res.status(200).json(deletedComment);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
