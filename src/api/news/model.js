import mongoose, { Schema } from 'mongoose';

const newsSchema = new Schema({
  title: {
    required: true,
    type: String
  },
  annotation: {
    default: '',
    type: String
  },
  body: {
    required: true,
    type: String
  },
  author_id: {
    default: 'Anon',
    type: String
  },
  preview: {
    required: true,
    type: String
  },
  background: {
    default: '',
    type: String
  },
  type: {
    default: 'Системные',
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

newsSchema.methods = {
  view (full) {
    return full ? {
      // simple view
      id: this.id,
      title: this.title,
      body: this.body,
      author_id: this.author_id,
      preview: this.preview,
      background: this.background,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    } : {
      id: this.id,
      title: this.title,
      annotation: this.annotation,
      author_id: this.author_id,
      preview: this.preview,
      type: this.type
    };
  }
};

const model = mongoose.model('News', newsSchema);

export const schema = model.schema;
export default model;
