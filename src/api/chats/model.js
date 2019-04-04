import mongoose, { Schema } from 'mongoose';

const chatsSchema = new Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  lastmessage: {
    type: Schema.ObjectId,
    ref: 'Messages'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

chatsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      picture: this.picture,
      users: this.users,
      lastmessage: this.lastmessage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view;
  }
};

const model = mongoose.model('Chats', chatsSchema);

export const schema = model.schema;
export default model;
