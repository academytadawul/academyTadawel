import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the main schema for the tour
const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
});

// Export the model
const CustomerModel =
  mongoose.models.customers || mongoose.model("customers", CustomerSchema);

export { CustomerModel };
