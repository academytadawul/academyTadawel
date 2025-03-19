import { connectToDatabase } from "../../lib/db"; // MongoDB connection
import { CustomerModel } from "../../lib/customerModel";

/**
 * API Route to handle customer (affiliate) operations:
 * - GET `/api/customer` → Get all customers
 * - POST `/api/customer` → Create a new customer
 * - GET `/api/customer/:id` → Get a single customer
 * - PUT `/api/customer/:id` → Update a customer
 * - DELETE `/api/customer/:id` → Delete a customer
*/

export default async function handler(req, res) {
  await connectToDatabase(); // Ensure DB connection
  console.log("connected to db");
  const { id } = req.query; // Used for single-customer operations

  /** ------------------------------------------
   * GET Customer by email: `/api/customer?email=value`
   * ----------------------------------------- */
  if (req.method === "GET" && req.query.email) {
    console.log(`trying to get user with email ${req.query.email}`)
    try {
      const customer = await CustomerModel.findOne({
        email: req.query.email,
      });
      if (!customer)
        return res.json({ error: "Customer not found" });
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch customer" });
    }
  }


  /** ------------------------------------------
   * GET All Customers: `/api/customer`
   * ----------------------------------------- */
  if (req.method === "GET" && !id) {
    try {
      const customers = await CustomerModel.find();
      return res.status(200).json(customers);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch customers" });
    }
  }

  /** ------------------------------------------
   * POST Create Customer: `/api/customer`
   * ----------------------------------------- */
  if (req.method === "POST") {
    try {
      const { name, email, phonenumber } =  req.body;
      console.log({email, name})
      if (!name || !email || !phonenumber) {
        return res.json({ error: "name and email and phonenumber are required" });
      }
      const newCustomer = await CustomerModel.create({ name, email, phonenumber });
      return res.status(201).json(newCustomer);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create customer" });
    }
  }

  /** ------------------------------------------
   * GET Single Customer: `/api/customer/:id`
   * ----------------------------------------- */
  if (req.method === "GET" && id) {
    try {
      const customer = await CustomerModel.findById(id);
      if (!customer)
        return res.status(404).json({ error: "Customer not found" });
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch customer" });
    }
  }

  /** ------------------------------------------
   * PUT Update Customer: `/api/customer/:id`
   * ----------------------------------------- */
  if (req.method === "PUT" && id) {
    try {
      const { name, email, phonenumber } = req.body;
      const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        id,
        { name, email, phonenumber },
        { new: true }
      );
      if (!updatedCustomer)
        return res.status(404).json({ error: "Customer not found" });
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update customer" });
    }
  }

  /** ------------------------------------------
   * DELETE Customer: `/api/customer/:id`
   * ----------------------------------------- */
  if (req.method === "DELETE" && id) {
    try {
      const deletedCustomer = await CustomerModel.findByIdAndDelete(id);
      if (!deletedCustomer)
        return res.status(404).json({ error: "Customer not found" });
      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete customer" });
    }
  }

  /** ------------------------------------------
   * METHOD NOT ALLOWED
   * ----------------------------------------- */
  return res.status(405).json({ error: "Method not allowed" });
}
