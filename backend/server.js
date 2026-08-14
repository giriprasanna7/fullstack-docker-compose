const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongodb:27017/contactdb";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.send("Contact Book Backend is running");
});

app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts"
    });
  }
});

app.post("/contacts", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const contact = new Contact({
      name,
      phone,
      email
    });

    const savedContact = await contact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({
      message: "Error adding contact"
    });
  }
});

app.delete("/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Contact deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
