import mongoose from "mongoose";

const Schema = mongoose.Schema;


// Define the main schema for the tour

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgUrl: {type: String, required: true},
  duration: {
      type: {
          type: String, 
          required: true
      },
      count: { type: Number, required: true }
  }
});

// Export the model
const CourseModel =
  mongoose.models.courses || mongoose.model("courses", CourseSchema);

export { CourseModel };


