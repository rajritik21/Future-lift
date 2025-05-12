import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a category description'],
      trim: true,
    },
    icon: {
      type: String,
      default: '',
    },
    slug: {
      type: String,
      required: [true, 'Please provide a category slug'],
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema); 