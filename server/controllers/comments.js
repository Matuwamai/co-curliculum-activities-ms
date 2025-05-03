import prisma from "../config/db.js";

export const createComment = async (req, res) => {
  try {
    const { activityId, userId, studentId, comment } = req.body;

    console.log("user id in comments:", userId);

    const trainer = await prisma.trainer.findUnique({
      where: { userId: userId },
      select: { id: true },
    });
    console.log("Trainer ID in ocmments:", trainer);
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Create the comment
    const newComment = await prisma.comment.create({
      data: {
        activityId,
        studentId,
        trainerId: trainer.id,
        comment,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsByStudentId = async (req, res) => {
  console.log("Fetching comments for student ID:", req.params.studentId);
  try {
    const { studentId } = req.params;
    const parsedStudentId = parseInt(studentId, 10);

    const comments = await prisma.comment.findMany({
      where: { studentId: parsedStudentId },
      include: {
        activity: true,
      },
    });
    if (comments.length === 0) {
      console.log("No comments found for student ID:", parsedStudentId);
      return res.status(404).json({ message: "No comments found" });
    }

    console.log("Fetched comments:", comments);
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
