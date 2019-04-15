import crypto from 'crypto';
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';
import { env } from '../../config';
import { asyncRedisClient } from '../../services/redis';

const roles = ['user', 'admin', 'moder', 'tester'];

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  desc: {
    type: String,
    default: ''
  },
  badges: {
    type: Array,
    default: []
  },
  refreshTokens: {
    type: Array,
    default: []
  },
  // любимые
  favorite: {
    type: Array,
    default: []
  },
  // брошено
  thrown: {
    type: Array,
    default: []
  },
  inprogress: {
    type: Array,
    default: []
  },
  readed: {
    type: Array,
    default: []
  },
  willread: {
    type: Array,
    default: []
  },
  fcm: {
    type: Array,
    default: []
  },
  enablefcm: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex');
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1');
  }

  return email;
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9;

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash;
    next();
  }).catch(next);
});

userSchema.methods = {
  async view (full) {
    const isOnline = await asyncRedisClient.get(this.id);
    let view = {
      id: this.id,
      online: isOnline || false,
      name: this.name,
      picture: this.picture,
      desc: this.desc,
      badges: this.badges,
      email: this.email,
      role: this.role,
      refreshTokens: this.refreshTokens,
      enablefcm: this.enablefcm,
      favorite: this.favorite,
      thrown: this.thrown,
      inprogress: this.inprogress,
      readed: this.readed,
      willread: this.willread,
      createdAt: this.createdAt

    };
    // let fields = ['id', 'name', 'picture', 'desc', 'badges'];

    // if (full) {
    //   fields = [...fields, 'email', 'role', 'createdAt', 'favorite', 'thrown', 'inprogress', 'readed', 'willread'];
    // }

    return full ? {
      ...view
    } : {
      id: this.id,
      online: isOnline || false,
      name: this.name,
      picture: this.picture,
      role: this.role,
      badges: this.badges,
      refreshTokens: this.refreshTokens
    };
  },

  tokens () {
    return this.fcm;
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false);
  }
};

userSchema.statics = {
  roles
};

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] });

const model = mongoose.model('User', userSchema);

export const schema = model.schema;
export default model;
