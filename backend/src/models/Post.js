import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true, trim: true, maxlength: 1000 },
    image: { type: String, default: '' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

export default mongoose.model('Post', postSchema);

