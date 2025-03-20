import { connectToDatabase } from "../../lib/models/db"; // Your MongoDB connection function
import { CreatorModel } from "../../lib/models/creatorModel";

/**
 * API Route to handle creator operations:
 * - GET `/api/creators` → Get all creators
 * - POST `/api/creators` → Create a new creator
 * - GET `/api/creators/:id` → Get a single creator
 * - PUT `/api/creators/:id` → Update a creator
 * - DELETE `/api/creators/:id` → Delete a creator
 */

export default async function handler(req, res) {
  await connectToDatabase(); // Ensuring DB connection

  /** ------------------------------------------
   * GET Single Creator: `/api/creators?id=id`
   * ----------------------------------------- */
  if (req.method === "GET" && req.query.id) {
    try {
      const id = req.query.id;
      console.log("id is: ");
      console.log(id);
      const creator = await CreatorModel.findById(id);
      if (!creator) return res.json({ error: "Creator not found" });
      return res.status(200).json(creator);
    } catch (error) {
      return res.json({ error: "Failed to fetch creator" });
    }
  }

  /** ------------------------------------------
   * GET All Creators: `/api/creators`
   * ----------------------------------------- */
  if (req.method === "GET") {
    try {
      const creators = await CreatorModel.find();
      return res.status(200).json(creators);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch creators" });
    }
  }

  /** ------------------------------------------
   * POST Create Creator: `/api/creators`
   * ----------------------------------------- */
  if (req.method === "POST") {
    try {
      const { username, email, startDate, endDate } = req.body;
      if (!username || !email || !startDate || !endDate) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const newCreator = await CreatorModel.create({
        username,
        email,
        referred_users: [],
        startDate,
        endDate,
      });
      return res.status(201).json(newCreator);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create creator" });
    }
  }

  /** ------------------------------------------
   * PUT Update Creator: `/api/creators/:id`
   * ----------------------------------------- */
  if (req.method === "PUT" && req.query.id) {
    const id = req.query.id
    try {
      const { username, email, startDate, endDate, customer_id } = req.body;

      let updatedCreator;

      if (customer_id) {
        console.log("adding customer id");
        updatedCreator = await CreatorModel.findByIdAndUpdate(
          id,
          { $addToSet: { referred_users: customer_id } }, // Ensures no duplicates
          { new: true }
        );
      } else {
        // Update other fields
        updatedCreator = await CreatorModel.findByIdAndUpdate(
          id,
          { username, email, startDate, endDate },
          { new: true }
        );
      }
      return res.status(200).json(updatedCreator);
    } catch (error) {
      return res.json({ error: "Failed to update creator" });
    }
  }

  /** ------------------------------------------
   * DELETE Creator: `/api/creators/:id`
   * ----------------------------------------- */
  if (req.method === "DELETE" && req.query.id) {
    const id = req.query.id
    try {
      const deletedCreator = await CreatorModel.findByIdAndDelete(id);
      if (!deletedCreator)
        return res.status(405).json({ error: "Creator not found" });
      return res.status(200).json({ message: "Creator deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete creator" });
    }
  }

  /** ------------------------------------------
   * METHOD NOT ALLOWED
   * ----------------------------------------- */
  return res.status(405).json({ error: "Method not allowed" });
}
