import mongoose from "mongoose";

const Schema = mongoose.Schema;


// Define the main schema for the tour
const CreatorSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    referred_users: [{ type: Schema.Types.ObjectId }],
    password: { type: String, required: true }, 
    startDate: { type: Date, required: true }, 
    endDate:  { type: Date, required: true },
});

// Export the model
const CreatorModel =
  mongoose.models.creators || mongoose.model("creators", CreatorSchema);

export { CreatorModel };
