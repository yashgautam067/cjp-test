import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name must be under 80 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^\d{10}$/, 'Enter a valid 10-digit phone number'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    memberNumber: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Auto-assign sequential member number before saving
MemberSchema.pre('save', async function () {
  if (this.isNew && !this.memberNumber) {
    const last = await mongoose.model('Member').findOne().sort('-memberNumber').lean();
    this.memberNumber = last ? last.memberNumber + 1 : 1;
  }
});

// Prevent model recompilation in dev hot-reload
export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
