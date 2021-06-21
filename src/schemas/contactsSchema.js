const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    user: { nickname: String, email: String },
  },
  { versionKey: false, timestamps: true },
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
