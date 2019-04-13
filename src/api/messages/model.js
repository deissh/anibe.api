import mongoose, { Schema } from 'mongoose';

const messagesSchema = new Schema({
  chat_id: {
    type: String,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String
  },
  attachments: {
    images: {
      type: Array,
      default: []
    },
    links: {
      type: Array,
      default: []
    },
    sticker: {
      type: String,
      default: []
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

messagesSchema.methods = {
  async view (full) {
    const view = {
      // simple view
      id: this.id,
      user: await this.user.view(false),
      body: this.body,
      attachments: this.attachments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
      // add properties for a full view
    } : view;
  }
};

const model = mongoose.model('Messages', messagesSchema);

export const schema = model.schema;
export default model;
