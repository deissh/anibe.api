import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  name: {
    type: String
  },
  annotation: {
    type: String
  },
  description: {
    type: String
  },
  genre: {
    type: String
  },
  type: {
    type: String
  },
  rating: {
    type: String
  },
  status: {
    type: String
  },
  date: {
    type: String
  },
  author: {
    type: String
  },
  cover: {
    type: String
  },
  chapters: {
    type: String
  },
  pages: {
    type: String
  },
  reading: {
    type: String
  },
  episodes: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; }
  }
});

postSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      annotation: this.annotation,
      description: this.description,
      genre: this.genre,
      type: this.type,
      rating: this.rating,
      status: this.status,
      date: this.date,
      author: this.author,
      cover: this.cover,
      chapters: this.chapters,
      pages: this.pages,
      reading: this.reading,
      episodes: this.episodes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full ? {
      ...view
    } : {
      id: this.id,
      name: this.name,
      annotation: this.annotation,
      cover: this.cover,
      author: this.author,
      genre: this.genre,
      type: this.type,
      rating: this.rating
    };
  }
};

const model = mongoose.model('Post', postSchema);

export const schema = model.schema;
export default model;
