import { connectToDatabase } from "../../lib/models/db"; // Your MongoDB connection function
import { CourseModel } from "../../lib/models/courseModel";

/**
 * API Route to handle course operations:
 * - GET `/api/courses` → Get all courses
 * - POST `/api/courses` → Create a new course
 * - GET `/api/courses/:id` → Get a single course
 * - PUT `/api/courses/:id` → Update a course
 * - DELETE `/api/courses/:id` → Delete a course
 */

export default async function handler(req, res) {
  await connectToDatabase(); // Ensuring DB connection
  const { id } = req.query; // Used for single-course operations

  /** ------------------------------------------
   * GET All Courses: `/api/courses`
   * ----------------------------------------- */
  if (req.method === "GET" && !id) {
    try {
      const courses = await CourseModel.find();
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  /** ------------------------------------------
   * POST Create Course: `/api/courses`
   * ----------------------------------------- */
  if (req.method === "POST") {
    try {
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const newCourse = await CourseModel.create({ name, title, description });
      return res.status(201).json(newCourse);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create course" });
    }
  }

  /** ------------------------------------------
   * GET Single Course: `/api/courses/:id`
   * ----------------------------------------- */
  if (req.method === "GET" && id) {
    try {
      const course = await CourseModel.findById(id);
      if (!course) return res.status(404).json({ error: "Course not found" });
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch course" });
    }
  }

  /** ------------------------------------------
   * PUT Update Course: `/api/courses/:id`
   * ----------------------------------------- */
  if (req.method === "PUT" && id) {
    try {
      const { title, description } = req.body;
      const updatedCourse = await CourseModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      if (!updatedCourse)
        return res.status(404).json({ error: "Course not found" });
      return res.status(200).json(updatedCourse);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update course" });
    }
  }

  /** ------------------------------------------
   * DELETE Course: `/api/courses/:id`
   * ----------------------------------------- */
  if (req.method === "DELETE" && id) {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(id);
      if (!deletedCourse)
        return res.status(404).json({ error: "Course not found" });
      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete course" });
    }
  }

  /** ------------------------------------------
   * METHOD NOT ALLOWED
   * ----------------------------------------- */
  return res.status(405).json({ error: "Method not allowed" });
}
