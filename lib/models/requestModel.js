import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the main schema for the course request
const RequestSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "customers", required: true }, // Refers to the user who requested
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: false }, // Refers to the requested course
    affiliate_id: { type: Schema.Types.ObjectId, ref: "creators", required: false }, // Refers to the affiliate (optional)
});

// Export the model
const RequestModel =
  mongoose.models.requests || mongoose.model("requests", RequestSchema);

export { RequestModel };
