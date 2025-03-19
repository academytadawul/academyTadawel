import mongoose from "mongoose";

const Schema = mongoose.Schema;


// Define the main schema for the tour
const CourseSchema = new Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

// Export the model
const CourseModel =
  mongoose.models.courses || mongoose.model("courses", CourseSchema);

export { CourseModel };
