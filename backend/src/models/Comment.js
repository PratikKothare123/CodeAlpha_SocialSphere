import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, maxlength: 500 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true, index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);

