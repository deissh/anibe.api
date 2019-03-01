import mongoose, { Schema } from 'mongoose'

const newsSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  author_id: {
    type: String
  },
  preview: {
    type: String
  },
  background: {
    type: String
  },
  type: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

newsSchema.methods = {
  view (full) {
    const view = {
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
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('News', newsSchema)

export const schema = model.schema
export default model
