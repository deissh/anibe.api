import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  post_id: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

commentSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(false),
      post_id: this.post_id,
      body: this.body,
      rating: this.rating,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? view : {
      id: this.id,
      body: this.body,
      user: {
        id: this.user.id,
        picture: this.user.picture,
        name: this.user.name,
        role: this.user.role
      }
    };
  }
};

const model = mongoose.model('Comment', commentSchema);

export const schema = model.schema;
export default model;
