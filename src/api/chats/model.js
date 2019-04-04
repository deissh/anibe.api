import mongoose, { Schema } from 'mongoose';
import { Messages } from '../messages';

const chatsSchema = new Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  users: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

chatsSchema.methods = {
  async view (full) {
    const lastmessage = await Messages.findOne({ chat_id: this.id });

    const view = {
      // simple view
      id: this.id,
      name: this.name,
      picture: this.picture,
      users: this.users,
      lastmessage: lastmessage || {},
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return view;
  }
};

const model = mongoose.model('Chats', chatsSchema);

export const schema = model.schema;
export default model;
