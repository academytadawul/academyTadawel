import { connectToDatabase } from "../../lib/db"; // MongoDB connection
import { RequestModel } from "../../lib/requestModel";

/**
 * API Route for handling course requests:
 * - POST `/api/requests` → Create a course request
 * - GET `/api/requests` → Get all course requests
 * - GET `/api/requests/:id` → Get a single course request
 * - DELETE `/api/requests/:id` → Delete a request
 */

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure DB connection
  const { id } = req.query; // For single request operations

  /** ------------------------------------------
   * GET All Requests: `/api/requests`
   * ----------------------------------------- */
  if (req.method === "GET" && !id) {
    try {
      const requests = await RequestModel.find()
      return res.status(200).json(requests);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch requests" });
    }
  }

  /** ------------------------------------------
   * POST Create a Course Request: `/api/requests`
   * ----------------------------------------- */
  if (req.method === "POST") {
    try {
      const { user_id, course_id, affiliate_id } = req.body;
      if (!user_id || !course_id) {
        return res.status(400).json({ error: "User id and course id is required" });
      }
      const newRequest = await RequestModel.create({ user_id, course_id, affiliate_id });
      return res.status(201).json(newRequest);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create request" });
    }
  }

  /** ------------------------------------------
   * GET Single Request: `/api/requests/:id`
   * ----------------------------------------- */
  if (req.method === "GET" && id) {
    try {
      const request = await RequestModel.findById(id)
        .populate("user_id", "username email")
        .populate("course_id", "title description")
        .populate("affiliate_id", "username email");
      if (!request) return res.status(404).json({ error: "Request not found" });
      return res.status(200).json(request);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch request" });
    }
  }

  /** ------------------------------------------
   * DELETE Request: `/api/requests/:id`
   * ----------------------------------------- */
  if (req.method === "DELETE" && id) {
    try {
      const deletedRequest = await RequestModel.findByIdAndDelete(id);
      if (!deletedRequest) return res.status(404).json({ error: "Request not found" });
      return res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete request" });
    }
  }

  /** ------------------------------------------
   * METHOD NOT ALLOWED
   * ----------------------------------------- */
  return res.status(405).json({ error: "Method not allowed" });
}
