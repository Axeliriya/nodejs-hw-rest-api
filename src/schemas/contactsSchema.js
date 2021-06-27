const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema, SchemaTypes } = mongoose;

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
    owner: { type: SchemaTypes.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
