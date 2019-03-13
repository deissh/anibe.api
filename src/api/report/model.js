import mongoose, { Schema } from 'mongoose';

const reportSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String
  },
  body: {
    type: String
  },
  post_id: {
    type: String
  },
  user_id: {
    type: String
  },
  authod_id: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

reportSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: {
        id: this.user.id,
        picture: this.user.picture,
        name: this.user.name,
        role: this.user.role
      },
      name: this.name,
      body: this.body,
      post_id: this.post_id,
      user_id: this.user_id,
      authod_id: this.authod_id,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : {
      id: this.id,
      name: this.name,
      body: this.body,
      status: this.status
    };
  }
};

const model = mongoose.model('Report', reportSchema);

export const schema = model.schema;
export default model;
