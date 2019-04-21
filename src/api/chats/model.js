import mongoose, { Schema } from 'mongoose';
import { Messages } from '../messages';

const chatsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: ''
  },
  users: {
    type: Array,
    default: []
  },
  admin: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
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
    const lastmessage = await Messages.findOne({ chat_id: this.id }, {}, { createdAt: -1 });

    const view = {
      // simple view
      id: this.id,
      name: this.name,
      picture: this.picture,
      users: this.users,
      admin: this.admin,
      lastmessage: lastmessage ? await lastmessage.view() : {},
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return view;
  }
};

const model = mongoose.model('Chats', chatsSchema);

export const schema = model.schema;
export default model;
