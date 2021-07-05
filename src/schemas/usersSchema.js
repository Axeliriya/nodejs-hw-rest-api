const mongoose = require('mongoose');
const { Subscription, SALT_FACTOR } = require('../helpers/constants');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: {
        values: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
        message:
          'You can choose from three subscriptions: Starter, Pro or Business',
      },
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR),
  );
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
